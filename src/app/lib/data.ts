import postgres from "postgres";

import { Seller, Item, Category, Rating } from "./definitions";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredItems(
	query: string,
	seller_id: string,
	category_id: string,
	rating: string,
  price_range: string,
	currentPage: number
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const filters = [];

		if (query) {
			filters.push(sql`
        (
          sellers.first_name ILIKE ${`%${query}%`} OR
          sellers.last_name ILIKE ${`%${query}%`} OR
          categories.name ILIKE ${`%${query}%`} OR
          items.title ILIKE ${`%${query}%`} OR
          items.description ILIKE ${`%${query}%`} OR
          items.price::text ILIKE ${`%${query}%`} OR
          items.id::text ILIKE ${`%${query}%`}
        )
      `);
		}

		if (seller_id) {
			filters.push(sql`items.seller_id = ${seller_id}`);
		}

		if (category_id) {
			filters.push(sql`items.category_id = ${category_id}`);
		}

		if (rating) {
			filters.push(sql`
        (
          SELECT COALESCE(ROUND(AVG(r.rating)), 0)
          FROM ratings r
          WHERE r.item_id = items.id
        ) = ${rating}
      `);
		}

    if (price_range) {
      if (price_range === '500+') {
        filters.push(sql`items.price >= 500`);
      } else {
        const [minPrice, maxPrice] = price_range.split('-').map(Number);
        filters.push(sql`items.price BETWEEN ${minPrice} AND ${maxPrice}`);
      }
    }

		let whereClause = sql``;
		if (filters.length > 0) {
			const first = filters[0];
			const rest = filters.slice(1);
			whereClause = rest.reduce(
				(acc, filter) => sql`${acc} AND ${filter}`,
				sql`WHERE ${first}`
			);
		}

		const items = await sql`
      SELECT
        items.id,
        items.seller_id,
        items.category_id,
        items.price,
        items.description,
        items.title,
        items.created,
        items.modified,
        items.image_name,
        categories.name,
        sellers.first_name,
        sellers.last_name,
        (
          SELECT COALESCE(AVG(r.rating), 0)
          FROM ratings r
          WHERE r.item_id = items.id
        ) AS average_rating
      FROM items
      JOIN sellers ON items.seller_id = sellers.id
      JOIN categories ON items.category_id = categories.id
      ${whereClause}
      ORDER BY items.created DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

		return items;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch items.');
	}
}

export async function fetchItemsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM items
    JOIN sellers ON items.seller_id = sellers.id
    JOIN categories ON items.category_id = categories.id
    WHERE
        sellers.first_name ILIKE ${`%${query}%`} OR
        sellers.last_name ILIKE ${`%${query}%`} OR
        categories.name ILIKE ${`%${query}%`} OR
        items.title ILIKE ${`%${query}%`} OR
        items.description ILIKE ${`%${query}%`} OR
        items.price::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of items.");
  }

}

export async function fetchItemDetails(id: string) {
  try {
    const items = await sql<Item[]>`SELECT
    items.id,
    items.seller_id,
    items.category_id,
    items.price,
    items.description,
    items.title,
    items.created,
    items.modified,
    items.image_name
    FROM items
JOIN sellers ON items.seller_id = sellers.id
    WHERE items.id = ${id}`;
    return items[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item details.");
  }
}

export async function fetchRatings(id: string) {
  try {
console.log("Fetching ratings for item ID:", id);
    const ratings = await sql<Rating[]>`SELECT
    ratings.id,
    ratings.item_id,
    ratings.rating,
    ratings.review,
    ratings.created
    FROM ratings
    WHERE ratings.item_id = ${id}
    `;
    console.log("Ratings fetched:", ratings);
    return ratings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ratings.");
  }
}

export async function fetchSellers() {
  try {
    const sellers = await sql<Seller[]>`SELECT
      id,
      first_name,
      last_name
      from sellers
      ORDER BY last_name ASC`;

      
    return [...sellers];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sellers.");
  }
}

export async function fetchCategories() {
  try {
    const categories = await sql<Category[]>`SELECT
      id,
      name
      FROM categories
      ORDER BY name ASC`;
    return [...categories];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sellers.");

  }
}

export async function fetchSellerByEmail(email: string) {
	const data = await sql<Seller[]>`SELECT * FROM sellers WHERE email = ${email}`;
	return data[0]
}

export async function fetchSellerById(id: string) {
	const data = await sql<Seller[]>`SELECT * FROM sellers WHERE id = ${id}`;
	return data[0]
}

export async function fetchRandomSeller() {
	const data = await sql<Seller[]>`SELECT * FROM sellers ORDER BY RANDOM() LIMIT 1`;
	return data[0]
}

export async function fetchRandomItems() {
  const data = await sql`
    SELECT
      items.id,
      items.seller_id,
      items.category_id,
      items.price,
      items.description,
      items.title,
      items.created,
      items.modified,
      items.image_name,
      categories.name,
      sellers.first_name,
      sellers.last_name,
      (
        SELECT COALESCE(AVG(r.rating), 0)
        FROM ratings r
        WHERE r.item_id = items.id
      ) AS average_rating
    FROM items
    JOIN sellers ON items.seller_id = sellers.id
    JOIN categories ON items.category_id = categories.id
    ORDER BY RANDOM()
    LIMIT 3;
  `;
  return [...data];
}

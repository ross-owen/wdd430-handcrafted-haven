import postgres from 'postgres';

import {
    Seller,
    Item,
    Category
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredItems(
	query: string,
	currentPage: number
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
        const items = await sql`
        SELECT
            items.id,
            items.seller_id,
            sellers.first_name,
            sellers.last_name,
            items.category_id,
            categories.name AS category_name,
            items.price,
            items.description,
            items.title,
            items.created,
            items.modified,
            items.image_name,
            (
            SELECT COALESCE(AVG(r.rating), 0)
            FROM ratings r
            WHERE r.item_id = items.id
            ) AS average_rating
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
        ORDER BY items.created DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
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
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of items.');
	}
}

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listItems() {
	const categoryId = 'fa8e1a4d-0e8d-4b20-935d-92cb768e71fa';
	const data = await sql`
    SELECT items.id, items.title, sellers.first_name
    FROM items
    JOIN sellers ON items.seller_id = sellers.id
    WHERE items.category_id = ${categoryId};
  `;

	return data;
}

async function getSellerItems() {
	const seller_id = '410544b2-4001-4271-9855-fec4b6a6442a';
	const data = await sql`
	SELECT items.title, sellers.first_name FROM ITEMS
	JOIN sellers on items.seller_id = sellers.id
	WHERE items.seller_id = ${seller_id}`;
	return data
}

async function getItemRatings() {
	const item_id = '7c85a8b0-08da-48ef-8a9a-4e087f14f9c9';
	const data = await sql`
	SELECT ratings.rating, ratings.review
	FROM ratings
	JOIN items ON items.id = ratings.item_id
	WHERE ratings.item_id = ${item_id}`;
	return data
}

async function getAllRatings() {
	const data = await sql`SELECT * FROM ratings`;
	return data
}


async function getAllItems() {
	const data = await sql`SELECT * FROM items`;
	return data
}

async function getAllSellers() {
	const data = await sql`SELECT * FROM sellers`;
	return data
}

export async function GET() {
	try {
		return Response.json(await getSellerItems());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}

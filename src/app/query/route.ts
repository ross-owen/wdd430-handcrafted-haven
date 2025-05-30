import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listItems() {
	const categoryId = 'fa8e1a4d-0e8d-4b20-935d-92cb768e71fa';
	const data = await sql`
    SELECT items.title, sellers.first_name
    FROM items
    JOIN sellers ON items.seller_id = sellers.id
    WHERE items.category_id = ${categoryId};
  `;

	return data;
}

export async function GET() {
	try {
		return Response.json(await listItems());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}

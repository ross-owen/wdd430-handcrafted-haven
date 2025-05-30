import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listItems() {
	const data = await sql`
    SELECT items.name, sellers.first_name
    FROM items
    JOIN sellers ON items.seller_id = sellers.id
    WHERE items.category_id = fa8e1a4d-0e8d-4b20-935d-92cb768e71fa;
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

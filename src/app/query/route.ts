import postgres from 'postgres';

import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

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

async function updateColumnsToBytea() {
	await sql`ALTER TABLE sellers ALTER COLUMN profile_pic TYPE BYTEA USING decode('', 'hex')`;
	await sql`ALTER TABLE items ALTER COLUMN image_name TYPE BYTEA USING decode('', 'hex')`;
}

async function migrateImagesToBytea() {
	const imagesDir = path.join(process.cwd(), "public", "images");
	const files = await fs.readdir(imagesDir);

	for (const filename of files) {
		const fullPath = path.join(imagesDir, filename);
		const stat = await fs.stat(fullPath);
		if (!stat.isFile()) continue;

		const raw = await fs.readFile(fullPath);
		const buffer = await sharp(raw).toBuffer();

		const baseName = path.parse(filename).name.toLowerCase();

		// Try matching seller first_name
		const sellerMatch = await sql`
			SELECT id FROM sellers WHERE LOWER(first_name) = ${baseName} LIMIT 1
		`;
		if (sellerMatch.length > 0) {
			await sql`
				UPDATE sellers SET profile_pic = ${buffer} WHERE id = ${sellerMatch[0].id}
			`;
			console.log(`Updated seller: ${baseName}`);
			continue;
		}

		// Try matching item title
		const itemMatch = await sql`
			SELECT id FROM items WHERE LOWER(title) = ${baseName} LIMIT 1
		`;
		if (itemMatch.length > 0) {
			await sql`
				UPDATE items SET image_name = ${buffer} WHERE id = ${itemMatch[0].id}
			`;
			console.log(`Updated item: ${baseName}`);
			continue;
		}

		console.warn(`No match found for image file: ${filename}`);
	}

	console.log("Migration complete – images stored as BYTEA.");
}

// export async function GET() {
// 	try {
// 		await migrateImagesToBytea();
// 		return Response.json({ message: 'Migration complete.' });
// 	} catch (error) {
// 		console.error('Migration error:', error);
// 		return Response.json({ error }, { status: 500 });
// 	}
// }
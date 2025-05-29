import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { sellers, items, categories, ratings } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedSellers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
    CREATE TABLE IF NOT EXISTS sellers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "fName" VARCHAR(50) NOT NULL,
        "lName" VARCHAR(50) NOT NULL,
        description TEXT,
        location VARCHAR(100),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created TIMESTAMP,
        modified TIMESTAMP,
        "profilePic" VARCHAR(255)
    );
    `;

	const insertedSellers = await Promise.all(
		sellers.map(async (seller) => {
			const hashedPassword = await bcrypt.hash(seller.password, 10);
			return sql`
        INSERT INTO users (id, fName, lName, description, location, email, password, created, modified, profilePic)
        VALUES (${seller.id}, ${seller.fName}, ${seller.lName}, ${seller.description}, ${seller.location}, ${seller.email}, ${hashedPassword}, ${seller.created}, ${seller.modified}, ${seller.profilePic})
        ON CONFLICT (id) DO NOTHING;
      `;
		})
	);

	return insertedSellers;
}

async function seedItems() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      "sellerId" UUID NOT NULL,
      "categoryId" UUID NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      description TEXT,
      title VARCHAR(255) NOT NULL,
      created TIMESTAMP,
      modified TIMESTAMP,
      "imageName" VARCHAR(255)
    );
  `;

	const insertedItems = await Promise.all(
		items.map(
			(item) => sql`
        INSERT INTO items ("sellerId", "categoryId", price, description, title, created, modified, "imagName")
        VALUES (
          ${item.sellerId},
          ${item.categoryId},
          ${item.price},
          ${item.description},
          ${item.title},
          ${item.created},
          ${item.modified},
          ${item.imageName}
        )
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedItems;
}

async function seedCategories() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created TIMESTAMP
    );
  `;

	const insertedCategories = await Promise.all(
		categories.map(
			(category) => sql`
        INSERT INTO categories (id, name, created)
        VALUES (${category.id}, ${category.name}, ${category.created})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedCategories;
}

async function seedRatings() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS ratings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      "itemId" UUID NOT NULL,
      rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      review TEXT,
      created TIMESTAMP,
      name VARCHAR(100)
    );
  `;

	const insertedRatings = await Promise.all(
		ratings.map(
			(rating) => sql`
        INSERT INTO ratings (id, "itemId", rating, review, created, name)
        VALUES (
          ${rating.id},
          ${rating.itemId},
          ${rating.rating},
          ${rating.review},
          ${rating.created},
          ${rating.name}
        )
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedRatings;
}

export async function GET() {
	try {
		const result = await sql.begin((sql) => [
			seedSellers(),
            seedCategories(),
			seedItems(),
			seedRatings(),
		]);

		return Response.json({ message: 'Database seeded successfully' });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}

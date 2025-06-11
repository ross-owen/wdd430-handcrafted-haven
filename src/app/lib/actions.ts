'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { writeFile } from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const CreateItemFormSchema = z.object({
	id: z.string(),
	seller_id: z.string(),
	category_id: z.string(),
	price: z.coerce
		.number()
		.gt(0, { message: 'Please enter an amount greater than $0.' }),
	description: z.string(),
	title: z.string(),
	image_name: z.string(),
});

const CreateItem = CreateItemFormSchema.omit({ id: true });

export type ItemState = {
	errors?: {
		seller_id?: string[];
		category_id?: string[];
		price?: string[];
		description?: string[];
		title?: string[];
		image_name?: string[];
	};
	message?: string | null;
};

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
}

export async function createItem(prevState: ItemState, formData: FormData) {
	const validatedFields = CreateItem.safeParse({
		seller_id: formData.get('seller-id'),
		category_id: formData.get('category-id'),
		price: formData.get('price'),
		description: formData.get('description'),
		title: formData.get('title'),
		image_name: formData.get('image-name'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Item.',
		};
	}

	const { seller_id, category_id, price, description, title, image_name } =
		validatedFields.data;
	const priceInCents = price * 100;
	const created = new Date().toISOString().split('T')[0];

	try {
		await sql`
      INSERT INTO items (seller_id, category_id, price, description, title, created, image_name)
      VALUES (${seller_id}, ${category_id}, ${priceInCents}, ${description}, ${title}, ${created}, ${image_name})
    `;
	} catch (error) {
		// We'll log the error to the console for now
		console.error(error);
	}

	revalidatePath('/seller-profile');
	redirect('/seller-profile');
}

const CreateSellerFormSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	description: z.string(),
	location: z.string(),
	email: z.string(),
	password: z.string(),
	created: z.date(),
	modified: z.date(),
	profile_pic: z.string(),
});

const CreateSeller = CreateSellerFormSchema.omit({});

export type SellerState = {
	errors?: {
		first_name?: string[];
		last_name?: string[];
		description?: string[];
		location?: string[];
		email?: string[];
		password?: string[];
        profile_pic?: string[];
	};
	message?: string | null;
};

export async function createSeller(
	prevState: SellerState,
	formData: FormData
): Promise<SellerState> {
	const validatedFields = CreateSeller.safeParse({
		first_name: formData.get('first_name'),
		last_name: formData.get('last_name'),
		description: formData.get('description'),
		location: formData.get('location'),
		email: formData.get('email'),
		password: formData.get('password'),
		created: new Date(),
		modified: new Date(),
		profile_pic: '', // we'll add the filename after saving
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Validation failed. Please fix the errors above.',
		};
	}

	const profilePicFile = formData.get('profile_pic') as File;
	if (!profilePicFile || !(profilePicFile instanceof File)) {
		return {
			errors: { profile_pic: ['Invalid file.'] },
			message: 'Missing or invalid profile picture.',
		};
	}

	const MAX_SIZE = 10 * 1024 * 1024; // Check if file is under the 10 MB maximum
	if (profilePicFile.size > MAX_SIZE) {
		return {
			errors: { profile_pic: ['File too large. Maximum size is 10MB.'] },
			message: 'File upload failed: image exceeds 10MB limit.',
		};
	}

	const buffer = Buffer.from(await profilePicFile.arrayBuffer());
	const fileName = `${Date.now()}_${profilePicFile.name}`;
	const filePath = path.join(process.cwd(), 'public/images', fileName);

	try {
		await writeFile(filePath, buffer);

		const { first_name, last_name, description, location, email, password } =
			validatedFields.data;
		const created = new Date().toISOString().split('T')[0];
		const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
		await sql`
			INSERT INTO sellers (first_name, last_name, description, location, email, password, created, modified, profile_pic)
			VALUES (${first_name}, ${last_name}, ${description}, ${location}, ${email}, ${hashedPassword}, ${created}, ${created}, ${fileName})
		`;

		return { message: 'Account created successfully!' };
	} catch (error) {
		console.error(error);
		return { message: 'Failed to create account. Please try again.' };
	}
}

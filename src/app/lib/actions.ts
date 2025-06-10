'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
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

const CreateItem = FormSchema.omit({ id: true });

export type State = {
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
    formData: FormData,
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

export async function createItem(prevState: State, formData: FormData) {
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

  const { seller_id, category_id, price, description, title, image_name } = validatedFields.data;
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
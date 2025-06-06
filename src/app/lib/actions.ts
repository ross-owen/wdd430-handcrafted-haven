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
    itemName: z.string(),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    itemDescription: z.string(),
});

const CreateItem = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    itemName?: string[];
    amount?: string[];
    itemDescription?: string[];
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
    itemName: formData.get('itemName'),
    amount: formData.get('amount'),
    itemDescription: formData.get('itemDescription'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Item.',
    };
  }

  const { itemName, amount, itemDescription } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      INSERT INTO seller_items (item_id, amount, item_description)
      VALUES (${itemName}, ${amountInCents}, ${itemDescription})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath('/seller-profile');
  redirect('/seller-profile');
}
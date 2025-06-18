"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { writeFile } from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import sharp from "sharp";
import { file } from "zod/v4";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const CreateItemFormSchema = z.object({
  id: z.string(),
  seller_id: z.string(),
  category_id: z.string({
    invalid_type_error: "Please select a category",
  }),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  description: z.string().min(1, "Please enter a description for the item"),
  title: z.string().min(1, "Please enter item title"),
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
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createItem(prevState: ItemState, formData: FormData) {
  const validatedFields = CreateItem.safeParse({
    seller_id: formData.get("seller-id"),
    category_id: formData.get("category-id"),
    price: formData.get("price"),
    description: formData.get("description"),
    title: formData.get("title"),
    image_name: "", //formData.get('image-name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Item.",
    };
  }

  const imageName = formData.get("image-name") as File;
  if (!imageName || !(imageName instanceof File)) {
    return {
      errors: { image_name: ["Invalid file."] },
      message: "Missing or invalid profile picture.",
    };
  }

  const MAX_SIZE = 10 * 1024 * 1024; // Check if file is under the 10 MB maximum
  if (imageName.size > MAX_SIZE) {
    return {
      errors: { image_name: ["File too large. Maximum size is 10MB."] },
      message: "File upload failed: image exceeds 10MB limit.",
    };
  }

  const fileBuffer = Buffer.from(await imageName.arrayBuffer());
  const imageFile = `${Date.now()}_${imageName.name.split(".")[0]}.webp`;
  const filePath = path.join(process.cwd(), "public/images", imageFile);

  // Optimize with sharp
  await sharp(fileBuffer)
    .resize({ width: 600, height: 600, fit: "inside" }) // Maintain aspect ratio
    .webp({ quality: 75 })
    .toFile(filePath);

  const { seller_id, category_id, price, description, title } =
    validatedFields.data;
  const created = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO items (seller_id, category_id, price, description, title, created, image_name)
      VALUES (${seller_id}, ${category_id}, ${price}, ${description}, ${title}, ${created}, ${imageFile})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/seller-profile");
  redirect("/seller-profile");
}

const CreateSellerFormSchema = z.object({
  first_name: z.string().max(50),
  last_name: z.string().max(50),
  description: z.string(),
  location: z.string().max(256),
  email: z.string().email(),
  password: z.string().min(6),
  created: z.date(),
  modified: z.date(),
  profile_pic: z.string(),
  redirectTo: z.string(),
});

const UpdateSellerFormSchema = z.object({
  id: z.string(),
  first_name: z.string().max(50),
  last_name: z.string().max(50),
  description: z.string(),
  location: z.string().max(256),
  modified: z.date(),
});

const CreateSeller = CreateSellerFormSchema.omit({});
const UpdateSeller = UpdateSellerFormSchema.omit({ id: true, modified: true });

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

export type UpdateSellerState = {
  errors?: {
    first_name?: string[];
    last_name?: string[];
    description?: string[];
    location?: string[];
  };
  message?: string | null;
};

export async function createSeller(prevState: SellerState, formData: FormData) {
  const validatedFields = CreateSeller.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    description: formData.get("description"),
    location: formData.get("location"),
    email: formData.get("email"),
    password: formData.get("password"),
    created: new Date(),
    modified: new Date(),
    profile_pic: "", // to be added after saving the file
    redirectTo: formData.get("redirectTo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please fix the errors above.",
    };
  }

  const profilePicFile = formData.get("profile_pic") as File;
  if (!profilePicFile || !(profilePicFile instanceof File)) {
    return {
      errors: { profile_pic: ["Invalid file."] },
      message: "Missing or invalid profile picture.",
    };
  }

  const MAX_SIZE = 10 * 1024 * 1024; // Check if file is under the 10 MB maximum
  if (profilePicFile.size > MAX_SIZE) {
    return {
      errors: { profile_pic: ["File too large. Maximum size is 10MB."] },
      message: "File upload failed: image exceeds 10MB limit.",
    };
  }

  const fileBuffer = Buffer.from(await profilePicFile.arrayBuffer());
  const fileName = `${Date.now()}_${profilePicFile.name.split(".")[0]}.webp`;
  const filePath = path.join(process.cwd(), "public/images", fileName);

  // Optimize with sharp
  await sharp(fileBuffer)
    .resize({ width: 600, height: 600, fit: "inside" }) // Maintain aspect ratio
    .webp({ quality: 75 })
    .toFile(filePath);

  const { first_name, last_name, description, location, email, password } =
    validatedFields.data;
  const created = new Date().toISOString().split("T")[0];
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  await sql`
		INSERT INTO sellers (first_name, last_name, description, location, email, password, created, modified, profile_pic)
		VALUES (${first_name}, ${last_name}, ${description}, ${location}, ${email}, ${hashedPassword}, ${created}, ${created}, ${fileName})
	`;
  const redirectTo = validatedFields.data.redirectTo as string;

  const loginForm = new FormData();
  loginForm.set("email", email);
  loginForm.set("password", password);
  loginForm.set("redirectTo", redirectTo);
  await signIn("credentials", loginForm, { redirectTo });
  return { message: null };
}

export async function updateSeller(
  id: string,
  prevState: UpdateSellerState,
  formData: FormData
) {
  const validatedFields = UpdateSeller.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    description: formData.get("description"),
    location: formData.get("location"),
  });

  console.log("Parse success?", validatedFields.success);
  if (!validatedFields.success) {
    console.log("Zod error:", validatedFields.error.flatten().fieldErrors);
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please fix the errors above.",
    };
  }
  const { first_name, last_name, description, location } = validatedFields.data;
  const modified = new Date().toISOString();

  await sql`
		UPDATE sellers SET 
			 first_name = ${first_name}, 
			 last_name = ${last_name}, 
			 description = ${description}, 
			 location = ${location},
			 modified = ${modified}
		WHERE id = ${id}
	`;

  revalidatePath(`/seller-profile/${id}`);
  redirect(`/seller-profile/${id}`);
}

const ReviewSchema = z.object({
  item_id: z.string(),
  rating: z.coerce.number().min(1).max(5),
  review: z
    .string()
    .min(1, "Please enter a comment.")
    .max(500, "Comment must be less than 500 characters long."),
  created: z.date(),
  name: z.string().min(1, "Please enter your name."),
});

export type ReviewState = {
  errors?: {
    item_id?: string[];
    rating?: string[];
    review?: string[];
    name?: string[];
    created?: string[];
  };
  message: string;
};

export async function createReview(prevState: ReviewState, formData: FormData) {
  const validatedFields = ReviewSchema.safeParse({
    item_id: formData.get("item_id"),
    rating: formData.get("rating"),
    review: formData.get("review"),
    created: new Date(),
    name: formData.get("name"),
  });

  console.log("Raw rating value:", formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please fix the errors above.",
    };
  }

  console.log("createReview called");

  const { item_id, rating, review, name } = validatedFields.data;
  const created = new Date().toISOString().split("T")[0];

  try {


    let response = await sql`
		INSERT INTO ratings (item_id, rating, review, created, name)
		VALUES (${item_id}, ${rating}, ${review}, ${created}, ${name})`;

    return { message: "Review created successfully.", errors: {} };

  } catch (error) {
    console.error("Error creating review:", error);
    return {
      message: "Database error. Failed to create review.",
    };
  }
  revalidatePath(`/products/${item_id}`);
  return { message: "" };
}

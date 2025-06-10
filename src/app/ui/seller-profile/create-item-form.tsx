'use client'

import { Category } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createItem, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import styles from './create.module.css';

export default function Form({ categories }: { categories: Category[] }) {
    
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createItem, initialState);

  return (
    <form action={formAction} className={styles['create-item-form']}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Seller id */}
        <div className="mb-4">
          <label htmlFor="seller-id" className="mb-2 block text-sm font-medium">
            Your seller id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="seller-id"
                name="seller-id"
                type="text"
                step="0.01"
                value="123ABC456DEF"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='seller-id-error'
                readOnly
              />
            </div>
          </div>
          <div id="seller-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.seller_id &&
              state.errors.seller_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Category name */}
        <div className="mb-4">
          <label htmlFor="category-id" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <div className="relative">
            <select
              id="category-id"
              name="category-id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="category-id-error"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div id="category-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category_id &&
              state.errors.category_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item Image */}
        <div className="mb-4">
          <label htmlFor="image-name" className="mb-2 block text-sm font-medium">
            Upload item image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image-name"
                name="image-name"
                type="file"
                step="0.01"
                placeholder="Upload item image"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Item name/title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Item title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                step="0.01"
                placeholder="Enter item title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='title-error'
              />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Item price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='price-error'
              />
            </div>
          </div>
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Item description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                step="0.01"
                placeholder="Enter item description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='description-error'
              />
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className={styles['create-item-form-buttons']}>
        <Button type="submit">Create Item</Button>
        <Link
          href="/seller-profile"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

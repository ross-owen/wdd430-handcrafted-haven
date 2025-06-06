'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createItem, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import styles from './create.module.css';

export default function Form() {
    
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createItem, initialState);

  return (
    <form action={formAction} className={styles['create-item-form']}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Seller name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose seller
          </label>
          <div className="relative">
            <select
              id="seller"
              name="seller-id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="seller-error"
            >
              <option value="" disabled>
                Select a seller
              </option>
              <option key="seller-id-1" value="seller-id-1">
                Seller 1
              </option>
              <option key="seller-id-2" value="seller-id-2">
                Seller 2
              </option>
              <option key="seller-id-3" value="seller-id-3">
                Seller 3
              </option>
            </select>
          </div>
          <div id="seller-error" aria-live="polite" aria-atomic="true">
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
              <option key="categ-id-1" value="categ-id-1">
                Category 1
              </option>
              <option key="categ-id-2" value="categ-id-2">
                Category 2
              </option>
              <option key="categ-id-3" value="categ-id-3">
                Category 3
              </option>
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

        {/* Item created date */}
        <div className="mb-4">
          <label htmlFor="created" className="mb-2 block text-sm font-medium">
            Created Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="created"
                name="created"
                type="text"
                step="0.01"
                placeholder="Enter created date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='created-error'
              />
            </div>
          </div>
          <div id="created-error" aria-live="polite" aria-atomic="true">
            {state.errors?.created &&
              state.errors.created.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item modified date */}
        <div className="mb-4">
          <label htmlFor="modified" className="mb-2 block text-sm font-medium">
            Modified date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="modified"
                name="modified"
                type="text"
                step="0.01"
                placeholder="Enter modified date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='modified-error'
              />
            </div>
          </div>
          <div id="modified-error" aria-live="polite" aria-atomic="true">
            {state.errors?.modified &&
              state.errors.modified.map((error: string) => (
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

'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createItem, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
    
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createItem, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Item Name */}
        <div className="mb-4">
          <label htmlFor="itemName" className="mb-2 block text-sm font-medium">
            Choose an Item name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="itemName"
                name="itemName"
                type="text"
                step="0.01"
                placeholder="Enter item name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='item-name-error'
              />
            </div>
          </div>
          <div id="item-name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.itemName &&
              state.errors.itemName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='amount-error'
              />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item Description */}
        <div className="mb-4">
          <label htmlFor="itemDescription" className="mb-2 block text-sm font-medium">
            Describe the item briefly
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="itemDescription"
                name="itemDescription"
                type="text"
                step="0.01"
                placeholder="Enter item description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='item-name-error'
              />
            </div>
          </div>
          <div id="item-name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.itemDescription &&
              state.errors.itemDescription.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Item</Button>
      </div>
    </form>
  );
}

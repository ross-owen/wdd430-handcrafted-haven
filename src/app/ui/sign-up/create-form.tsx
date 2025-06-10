'use client';

import { Seller } from '@/app/lib/definitions';
import Link from 'next/link';

import { Button } from '@/app/ui/button';
import { createSeller, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(createSeller, initialState);
	return (
		<form action={formAction}>

			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/invoices"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Invoice</Button>
			</div>
		</form>
	);
}

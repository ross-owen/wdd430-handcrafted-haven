'use client';

import { useSearchParams } from 'next/navigation';

import { createSeller, SellerState } from '@/app/lib/actions';
import { useActionState } from 'react';
import styles from './sign-up-form.module.css';


export default function Form() {

	const initialState: SellerState = { message: null, errors: {} };
	const searchParams = useSearchParams();
	
  	const callbackUrl = searchParams.get('callbackUrl') || '/seller-profile';
	const [state, formAction] = useActionState(createSeller, initialState);

	return (
		<form className={styles['sign-up-form']} action={formAction}>
			<div className={styles['personal-details']}>
				<label htmlFor="first_name">First Name</label>
				<input type="text" id="first_name" name="first_name" required />

				<label htmlFor="last_name">Last Name</label>
				<input type="text" id="last_name" name="last_name" required />

				<label htmlFor="description">Biography</label>
				<input type="textarea" id="description" name="description" required />

				<label htmlFor="location">Location</label>
				<input type="text" id="location" name="location" required />
			</div>

			<div className={styles['profile-pic-upload']}>
				<label htmlFor="profile_pic">Profile Picture</label>
				<input
					type="file"
					name="profile_pic"
					id="profile_pic"
					required
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file && file.size > 10 * 1024 * 1024) {
							alert('File too large. Maximum size is 10MB.');
							e.target.value = '';
						}
					}}
				/>
			</div>

			<div className={styles['personal-details']}>
				<label htmlFor="email">Email Address</label>
				<input type="email" id="email" name="email" required />

				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" required />
			</div>
			<input type="hidden" name="redirectTo" value={callbackUrl} />
			<div>
				<button type="submit">Register Account</button>
				<div>
					{state?.message && <p className="error-message">{state.message}</p>}
				</div>
			</div>
		</form>
	);
}

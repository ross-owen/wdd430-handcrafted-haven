import { Suspense, lazy } from 'react';
import {Metadata} from 'next';

const LoginForm = lazy(() => import('@/app/ui/login-form'));

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
		<main>
			<div>
				<Suspense fallback={<div>Loading...</div>}>
					<LoginForm />
				</Suspense>
			</div>
		</main>
	);
}
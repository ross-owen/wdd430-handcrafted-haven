import Link from 'next/link';
import styles from './create.module.css';

export function CreateItem() {
  return (
    <Link
      href="/item/create"
      className={styles['create-item-button']}
    >
      <span>Create</span>
    </Link>
  );
}
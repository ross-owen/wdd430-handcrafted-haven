import Image from "next/image";
import Link from "next/link";
// import styles from '@/app/ui/browse.item-details.css';
import ReviewForm from "@/app/ui/products/review-form";
import ReviewHistory from "@/app/ui/products/review-history";
import { Item, Rating } from "@/app/lib/definitions";
import styles from "@/app/ui/product.module.css";

type ItemDetailsProps = {
  item: Item;
  ratings: Rating[];
};

export default function ItemDetails({ item, ratings }: ItemDetailsProps) {
  return (
    <>
      <section className={styles.itemDetails}>
        <div>
          <div>
            <Image
              src={`/images/${item.image_name}`}
              width={250}
              height={300}
              alt={item.image_name || "Product Image"}
            />
          </div>
          <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <div>
              <span>Price: </span>
              {item.price}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <ReviewForm ratings={ratings}  />
          <ReviewHistory ratings={ratings} />
        </div>
      </section>
    </>
  );
}

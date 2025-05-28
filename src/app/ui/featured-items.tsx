import { inter } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";

export default function FeaturedItems() {
  return (
    <section className={`${inter.className} ${styles["featured-items"]}`}>
      <h2>Featured Items</h2>
      <ul className={`${styles["featured-items-container"]}`}>
        {
          <>
            <li className={`${styles["featured_items__card_wrapper"]}`}>
              <Link href="/items/handcrafted-mug">
                <div className={`${styles["featured_items__card"]}`}>
                  <Image
                    src="/images/featured-essentric.png"
                    alt="Featured item 2: Eccentric Clay Sculpture"
                    width={250}
                    height={300}
                  />
                  <div className={`${styles["featured-items__title"]}`}>
                    Eccentric Clay Sculpture
                  </div>
                  <div>
                    <span>Price:</span>
                    {"$10.99"}
                  </div>
                </div>
              </Link>
            </li>
            <li className={`${styles["featured_items__card_wrapper"]}`}>
              <Link href="/items/handcrafted-purse">
                <div className={`${styles["featured_items__card"]}`}>
                  <Image
                    src="/images/featured-purse.png"
                    alt="Featured item 1:"
                    width={250}
                    height={300}
                  />
                  <div className={`${styles["featured-items__title"]}`}>
                    Handcrafted Toggle Pouch
                  </div>
                  <div>
                    <span>Price: </span> {"$80.00"}
                  </div>
                </div>
              </Link>
            </li>
            <li className={`${styles["featured_items__card_wrapper"]}`}>
              <Link href="/items/handcrafted-mug">
                <div className={`${styles["featured_items__card"]}`}>
                  <Image
                    src="/images/featured-mug.png"
                    alt="Featured item 1:"
                    width={250}
                    height={250}
                  />
                  <div className={`${styles["featured-items__title"]}`}>
                    Handcrafted Ceramic Mug
                  </div>
                  <div>
                    <span>Price:</span>
                    {"$15.99"}
                  </div>
                </div>
              </Link>
            </li>
            <li className={`${styles["featured_items__card_wrapper"]}`}>
              <Link href="/items/handcrafted-plate">
                <div className={`${styles["featured_items__card"]}`}>
                  <Image
                    src="/images/featured-plate.png"
                    alt="Featured item 1:"
                    width={250}
                    height={300}
                  />
                  <div className={`${styles["featured-items__title"]}`}>
                    Handcrafted Ceramic Plate
                  </div>
                  <div>
                    <span>Price:</span>
                    {"$21.99"}
                  </div>
                </div>
              </Link>
            </li>
          </>
        }
      </ul>
    </section>
  );
}

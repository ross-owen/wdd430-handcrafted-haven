import Image from "next/image";
import ReviewForm from "@/app/ui/item-details/review-form";
import ReviewHistory from "@/app/ui/item-details/review-history";

export default function ItemDetails() {
  return (
    <>
    <section>
      <div>
        <div>
          <Image
            src="/images/featured-essentric.png"
            alt="Featured item 2: Eccentric Clay Sculpture"
            width={250}
            height={300}
          />
        </div>
        <div>
          <h1>Eccentric Clay Sculpture</h1>
          <p>
            This unique clay sculpture is a bizzare addition of eccentricity to
            any space. Handcrafted for trinket-eers, it features intricate
            details and a soft glaze.
          </p>
          <div>
            <span>Price: </span>$10.99
          </div>
        </div>
      </div>
      </section>
      <section>
   <div>
<ReviewForm />
<ReviewHistory />
    </div>     
      </section>
    </>
  );
}

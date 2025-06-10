import { Metadata } from "next";
import ItemDetails from "@/app/ui/item-details/item-details";
import { fetchItemDetails,fetchRatings } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Item Details",
};


export default async function itemDetails( {params}: {
  params: {itemId: string};
})
{

  let item, ratings;
   
  try {
    item = await fetchItemDetails(params.itemId.toString());
  } catch (error) {
    console.error("Error fetching item details:", error);
  }

  try {
    ratings = await fetchRatings(params.itemId.toString());
  } catch (error) {
    console.error("Error fetching ratings:", error);
  }

  if (!item) {
    return <p>Item not found.</p>;
  }
  return (
    <main>
      <ItemDetails item={ item } ratings={ratings ?? []} />
    </main>
  );
}

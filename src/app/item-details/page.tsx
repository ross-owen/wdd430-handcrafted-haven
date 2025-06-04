import { Metadata } from "next";
import ItemDetails from "@/app/ui/item-details/item-details";

export const metadata: Metadata = {
  title: "Item Details",
};

export default function itemDetails() {
  return (
    <main>
      <ItemDetails />
    </main>
  );
}

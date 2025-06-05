import { Metadata } from "next";
import Browse from "@/app/ui/browse/browse";
import Catalog from "@/app/ui/browse/browse";

export const metadata: Metadata = {
  title: "Catalog Search",
};

export default function itemDetails() {
  return (
    <main>
      <Browse />
    </main>
  );
}

import { Metadata } from "next";
import { Suspense, lazy } from 'react';

import React from "react";
import { fetchItemDetails, fetchRatings } from "@/app/lib/data";

const ItemDetails = lazy(() => import('@/app/ui/products/product-details'));

export const metadata: Metadata = {
  title: "Item Details",
};

interface PageProps {
  params: Promise<{
    itemId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  let item, ratings;

  try {
    item = await fetchItemDetails(resolvedParams.itemId.toString());
  } catch (error) {
    console.error("Error fetching item details:", error);
  }

  try {
    ratings = await fetchRatings(resolvedParams.itemId.toString());
  } catch (error) {
    console.error("Error fetching ratings:", error);
  }

  if (!item) {
    return <p>Item not found.</p>;
  }
  return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<ItemDetails item={item} ratings={ratings ?? []} />
			</Suspense>
		</main>
	);
}

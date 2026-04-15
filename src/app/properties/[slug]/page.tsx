import { notFound } from "next/navigation";
import PropertyDetailView from "@/components/PropertyDetailView";
import { getProjectDetailBySlug } from "@/lib/propertyData";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await getProjectDetailBySlug(slug);
  if (!data) return { title: "Property | ARK Vision" };
  return {
    title: `${data.listing.title} | ARK Vision`,
    description: data.listing.excerpt || data.listing.location,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const data = await getProjectDetailBySlug(slug);
  if (!data) notFound();
  return <PropertyDetailView data={data} />;
}

import ProductHunt from "@/components/shared/product-hunt";
import Footer from "./components/footer";
import SiteHeader from "./components/site-header";
import { generateSEO } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = generateSEO({
  template: "Nucelo"
});

export default async function MarketingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-[700px] pt-4 max-md:px-4 max-md:w-full">
      <SiteHeader />
      <main className="pb-10">{children}</main>
      <Footer />
      <ProductHunt />
    </div>
  );
}

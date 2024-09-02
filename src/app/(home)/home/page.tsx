import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import Features from "../components/features";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Preview from "../components/preview";
import Pricing from "../components/pricing";

export const metadata = generateSEO({
  title: `${siteConfig.name} - Open source minimal blogging platform`,
});

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col items-center gap-20">
        <div className="w-[1300px] max-xl:w-full">
          <Preview />
        </div>
        <hr />
        <Features />
        <hr />
        <Pricing />
        <hr />
        <Footer />
      </div>
    </>
  );
}

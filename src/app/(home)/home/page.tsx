import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import About from "../components/about";
import Cta from "../components/cta";
import Features from "../components/features";
import Hero from "../components/hero";
import Pricing from "../components/pricing";
import Preview from "../components/preview";

export const metadata = generateSEO({
  title: `${siteConfig.name} - Open source minimal blogging platform`,
});

export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      <Hero />
      <About />
      <Preview />
      <Features />
      <Pricing />
      <Cta />
    </div>
  );
}

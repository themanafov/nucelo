import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Image from "next/image";

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={cn(
        "w-full hidden border border-gray-2 rounded-md",
        src.includes("light") ? "dark:hidden block" : "dark:block",
      )}
      quality={100}
      priority
    />
  );
};
export default function Preview() {
  return (
    <section className="section-container">
      <div className="section-content grid grid-cols-2 max-xl:grid-cols-1 gap-3 rounded-md">
        {marketingConfig.previews.map((preview) => (
          <div key={preview.title}>
            <CustomImage src={`${preview.image}.png`} alt={preview.title} />
            <CustomImage
              src={`${preview.image}-light.png`}
              alt={preview.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

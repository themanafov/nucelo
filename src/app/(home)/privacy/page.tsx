import NavButton from "@/components/layout/nav-button";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import Link from "next/link";

export const metadata = generateSEO({
  title: "Privacy",
});

export default function Privacy() {
  return (
    <div className="pt-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <NavButton
          href="/home"
          icon="arrowLeft"
          size="icon"
          aria-label="Back to home"
        />
        <h1 className="text-xl font-medium">Privacy Policy</h1>
      </div>
      <div className="flex flex-col gap-2">
        {siteConfig.privacy.sections.map((s, i) => (
          <section className="section-container" key={i}>
            {s.title && (
              <h3 className="section-title text-lg font-medium">{s.title}</h3>
            )}
            <div className="section-content text-gray-4 text-base">
              {s.content}
            </div>
          </section>
        ))}
        <section className="section-container">
          <h3 className="section-title text-lg font-medium">
            How To Contact Us
          </h3>
          <div className="section-content text-gray-4 text-base inline pb-0">
            For privacy-related questions, please contact us at{" "}
            <Link
              href={siteConfig.links.privacy}
              className="text-gray-4 hover:text-secondary transition-colors underline"
            >
              {siteConfig.links.privacy.split("mailto:")}
            </Link>
            .
          </div>
        </section>
      </div>
      <p className="text-gray-4 mt-2 text-sm">
        Last updated: {siteConfig.privacy.lastUpdated}
      </p>
    </div>
  );
}

import ThemeToggle from "@/components/layout/theme-toggle";
import { generateSEO } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = generateSEO({
  template: "Nucelo",
});

export default async function MarketingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-[700px] pt-4 max-md:px-4 max-md:w-full">
      <main className="pb-10">{children}</main>
      <ThemeToggle
        compact
        iconSize={20}
        className="fixed right-5 top-5 size-5"
      />
    </div>
  );
}

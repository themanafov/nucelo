import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { readMarkdownFile } from "@/lib/md";
import { generateSEO } from "@/lib/utils";

const title = "Terms of Service";

export const metadata = generateSEO({
  title,
});

export default function TOS() {
  const source = readMarkdownFile("docs/legal/terms.md");
  return (
    <div className="pt-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <NavButton
          href="/home"
          icon="arrowLeft"
          size="icon"
          aria-label="Back to home"
        />
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <MDX source={source} />
      </div>
    </div>
  );
}

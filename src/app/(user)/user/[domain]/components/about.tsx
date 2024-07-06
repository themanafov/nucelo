import MDX from "@/components/markdown/mdx";

export default function About({ content }: { content?: string }) {
  if (!content?.trim()?.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <dt className="section-title">
        <h3>About</h3>
      </dt>
      <dd className="section-content">
        <MDX source={content} className="!text-gray-4 !leading-6 text-sm" />
      </dd>
    </dl>
  );
}

import DeleteForm from "@/components/forms/delete-form";
import Form from "@/components/forms/form";
import UploadImage from "@/components/forms/upload-image";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { getArticleById } from "@/lib/fetchers/articles";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ArticleSettingsProps {
  params: {
    articleId: string;
  };
}

export const metadata: Metadata = {
  title: "Settings",
};

export default async function ArticleSettings({
  params,
}: ArticleSettingsProps) {
  const article = await getArticleById(params.articleId);

  if (!article) {
    return notFound();
  }
  const endpoint = `articles/${article.id}`;
  return (
    <AppShell>
      <AppHeader className="justify-start">
        <NavButton
          href={`/${endpoint}`}
          icon="arrowLeft"
          className="mr-2"
          size="icon"
          aria-label="Back to Article"
        />
        Article settings
      </AppHeader>
      <div className="flex flex-col gap-2">
        <Form
          title="Article slug"
          description="This is the URL slug for this article."
          endpoint={endpoint}
          inputData={{
            name: "slug",
            placeholder: "my-article",
            defaultValue: article.slug,
          }}
        />
        <Form
          title="Publish time"
          endpoint={endpoint}
          inputData={{
            name: "publishedAt",
            type: "date",
            "aria-label": "Article published time",
            defaultValue: article.publishedAt.toISOString().slice(0, 10),
          }}
        />
        <Form
          title="SEO title"
          description="This title will be used for SEO. It's best to keep it between 50-60 characters."
          helpText="Please use 60 characters at maximum."
          endpoint={endpoint}
          inputData={{
            name: "seoTitle",
            placeholder: "My new article",
            defaultValue: article.seoTitle || "",
            maxLength: 60,
          }}
          required={false}
        />
        <Form
          type="textarea"
          title="SEO description"
          description="This description will be used for SEO. It's best to keep it between 150-160 characters."
          helpText="Please use 160 characters at maximum."
          endpoint={endpoint}
          textareaData={{
            name: "seoDescription",
            placeholder: "Short description",
            defaultValue: article.seoDescription || "",
            maxLength: 160,
          }}
          required={false}
        />
        <UploadImage
          title="Open graph image"
          description="This image will be used for SEO. It's best to keep it 1200x630."
          helpText="Up to 4MB"
          endpoint={endpoint}
          defaultValue={article.ogImage}
          name="ogImage"
          folder="og-images"
        />
        <DeleteForm
          title="Delete article"
          description="Enter your article slug"
          keyword={article.slug}
          endpoint={`/${endpoint}`}
          redirectPath="/articles"
        />
      </div>
    </AppShell>
  );
}
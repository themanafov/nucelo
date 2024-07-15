"use server";
import Newsletter from "@/emails/newsletter";
import { NewsletterProps } from "@/types";
import { Article, User } from "@prisma/client";
import * as z from "zod";
import { db } from "../db";
import { getSubscribersByUserId } from "../fetchers/subscribers";
import { resend } from "../resend";
import { formatDate, slugify } from "../utils";
import {
  articleCreateSchema,
  articlePatchSchema,
} from "../validations/article";

type ArticleCreateSchema = z.infer<typeof articleCreateSchema>;
type ArticlePatchSchema = z.infer<typeof articlePatchSchema>;

export async function createArticle(
  authorId: string,
  data: ArticleCreateSchema,
) {
  return await db.article.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function updateArticle(
  articleId: string,
  user: Pick<User, "id" | "name" | "username" | "newsletter" | "domain">,
  data: ArticlePatchSchema,
) {
  await db.article.update({
    where: {
      id: articleId,
      authorId: user.id,
    },
    data: {
      slug: data.slug || slugify(data.title),
      publishedAt: data.publishedAt
      ? new Date(data.publishedAt).toISOString()
      : undefined,
      ...data,
    },
  });
}

export async function deleteArticle(articleId: string, authorId: string) {
  const article = await db.article.delete({
    where: {
      id: articleId,
      authorId,
    },
  });

  return article.id;
}

export async function verifyArticleAccess(articleId: string, authorId: string) {
  const isExist = await db.article.count({
    where: {
      id: articleId,
      authorId,
    },
  });

  return isExist > 0;
}

export async function sendNewsletter(
  article: Article,
  user: Pick<User, "id" | "username" | "domain" | "name" | "newsletter">,
) {
  const emails = await getSubscribersByUserId(user.id);
  if (emails.length) {
    await Promise.all([
      ...emails.map((e) => {
        sendNewsletterEmail({
          from: `${user?.name} from Nucelo <notify@nucelo.com>`,
          to: e.email,
          subject: `I shared a new article.`,
          newsletter: {
            title: article.title,
            author: user.name || user.username,
            articleURL: user.domain
              ? `https://${user.domain}/articles/${article.slug}`
              : `https://${user.username}.nucelo.co/articles/${article.slug}`,
            published: formatDate(article.publishedAt),
            subId: e.id,
          },
        });
      }),
      db.article.update({
        where: {
          id: article.id,
        },
        data: {
          lastNewsletterSentAt: new Date(),
        },
      }),
    ]);

    return new Response(null, { status: 200 });
  } else {
    return new Response("You don't have any subscribers", { status: 400 });
  }
}

export async function sendNewsletterEmail({
  from,
  to,
  subject,
  newsletter,
}: {
  from: string;
  to: string;
  subject: string;
  newsletter: NewsletterProps;
}) {
  return await resend.emails.send({
    from,
    to,
    subject,
    react: Newsletter(newsletter),
  });
}

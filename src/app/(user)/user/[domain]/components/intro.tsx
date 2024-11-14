import type { User } from "@prisma/client";
import Subscribe from "../articles/components/subscribe";
import CommandMenuToggle from "./toggle";

export default function Intro({
  user,
}: {
  user: Pick<
    User,
    | "about"
    | "name"
    | "title"
    | "image"
    | "github"
    | "twitter"
    | "dribbble"
    | "contactEmail"
    | "linkedin"
    | "username"
    | "newsletter"
  >;
}) {
  return (
    <dl className="section-container flex-row justify-between items-center">
      <dt className="section-title flex-col items-start">
        <h1 className="text-lg">{user.name}</h1>
        <h2 className="text-gray-4 text-sm">{user.title}</h2>
      </dt>
      <dd className="section-content flex-row gap-2  py-0">
        <CommandMenuToggle />
        <Subscribe
          username={user.username}
          newsletter={user.newsletter}
          compact
        />
      </dd>
    </dl>
  );
}

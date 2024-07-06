import { User } from "@prisma/client";
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
  >;
}) {
  return (
    <dl className="section-container flex-row justify-between items-center">
      <dt className="section-title flex-col items-start">
        <h1 className="text-lg">{user.name}</h1>
        <h2 className="text-gray-4 text-sm">{user.title}</h2>
      </dt>
      <dd className="section-content  py-0">
        <CommandMenuToggle />
      </dd>
    </dl>
  );
}
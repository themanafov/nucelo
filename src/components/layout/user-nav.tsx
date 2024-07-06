"use client";

import { siteConfig } from "@/config/site";
import { getInitials } from "@/lib/utils";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "../layout/theme-toggle";
import { Icons } from "../shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  user: Pick<User, "name" | "email" | "image" | "username" | "domain"> | null;
  segment?: string;
}

export default function UserNav({ user, segment }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="size-4.5 rounded-lg border-2 border-transparent bg-gray-2   outline-none data-[state=open]:border-gray-2"
        aria-label={user?.name as string}
      >
        <Avatar>
          <AvatarImage
            src={user?.image as string}
            alt={`${user?.name as string} Profile Picture`}
          />
          <AvatarFallback>
            {user?.name && getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem asChild>
          <Link
            href={
              user?.domain
                ? `https://${user.domain}`
                : `https://${user?.username}.nucelo.co`
            }
            target="_blank"
          >
            <Icons.arrowUpRight size={15} /> Your page
          </Link>
        </DropdownMenuItem>
        <ThemeToggle />

        <DropdownMenuItem asChild>
          <Link
            href={"/settings"}
            className={segment === "settings" ? "bg-gray-2 text-secondary" : ""}
          >
            <Icons.settings size={15} /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={siteConfig.links.home}>
            <Icons.logo size={15} /> Home page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-danger"
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <Icons.logout size={15} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-3 items-center">
          <div className="text-7xl flex items-center gap-2">
            <span>4</span>
            <Icons.logo size={50} />
            <span>4</span>
          </div>
          <p className="text-gray-4 text-lg">Page not found</p>
        </div>
        <NavButton
          href={siteConfig.links.home}
          icon="arrowLeft"
          direction="ltr"
          aria-label="Back to home"
        >
          Back to home
        </NavButton>
      </div>
    </div>
  );
}

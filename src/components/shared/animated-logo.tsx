"use client";
import { type Variants, motion } from "framer-motion";
import type { IconProps } from "./icons";

const logo: Variants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "var(--gray-3)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "var(--foreground)",
  },
};

export default function AnimatedLogo({
  size = 24,
}: {
  size: IconProps["size"];
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-secondary stroke-1"
      style={{
        strokeLinejoin: "round",
        strokeLinecap: "round",
      }}
    >
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 100C77.6142 100 100 77.6142 100 50C100 40.4639 97.3304 31.5514 92.6978 23.9689L58.3334 58.3333H41.6667V41.6666L76.0311 7.30222C68.4487 2.6696 59.5361 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
        initial="hidden"
        animate="visible"
        variants={logo}
        transition={{
          default: { duration: 0.5, ease: "easeInOut" },
          fill: { duration: 1, ease: [1, 0, 0.8, 1] },
        }}
      />
    </svg>
  );
}

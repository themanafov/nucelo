import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-screen w-[420px] flex-col justify-center  max-[350px]:w-full max-[350px]:p-2">
      {children}
    </div>
  );
}

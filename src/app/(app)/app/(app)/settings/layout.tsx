import AppShell from "@/components/layout/app-shell";
import SettingsNav from "@/components/layout/settings-nav";
import type * as React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <SettingsNav />
      {children}
    </AppShell>
  );
}

import type { Metadata } from "next";
import { StudioApp } from "@/components/studio/studio-app";
import { SiteNav } from "@/components/site/site-nav";

export const metadata: Metadata = {
  title: "Studio",
  description: "KAIRA studio dashboard for designs and journal updates.",
};

export default function StudioPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-20">
        <StudioApp />
      </main>
    </>
  );
}

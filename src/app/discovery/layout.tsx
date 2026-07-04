import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MittiMiles | AI Destination Discovery & Cultural Experiences",
  description: "Input your target destination and interest tags to generate an authentic local storytelling experience and slow travel guide.",
};

export default function DiscoveryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-brand-bg dark:bg-zinc-950">
      {children}
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Only You Know",
    description: "A secret page.",
};

export default function SjzLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

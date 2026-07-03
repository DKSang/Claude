import { LearnHeader } from "@/components/learn/LearnHeader";
import { Footer } from "@/components/Footer";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LearnHeader />
      <div className="flex" style={{ paddingTop: 56, minHeight: "calc(100vh - 56px)" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

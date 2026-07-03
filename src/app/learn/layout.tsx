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
      <div className="flex" style={{ paddingTop: 84, minHeight: "calc(100vh - 84px)" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

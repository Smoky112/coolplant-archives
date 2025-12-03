import { ReactNode } from "react";
import RetroHeader from "@/components/RetroHeader";
import RetroFooter from "@/components/RetroFooter";

interface RetroLayoutProps {
  children: ReactNode;
}

const RetroLayout = ({ children }: RetroLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RetroHeader />
      <main className="flex-1 container mx-auto px-4 py-4 max-w-5xl">
        {children}
      </main>
      <RetroFooter />
    </div>
  );
};

export default RetroLayout;

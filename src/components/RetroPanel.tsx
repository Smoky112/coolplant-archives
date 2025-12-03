import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface RetroPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "inset" | "flat";
  header?: string;
}

const RetroPanel = forwardRef<HTMLDivElement, RetroPanelProps>(
  ({ className, variant = "raised", header, children, ...props }, ref) => {
    const variants = {
      raised: "retro-panel",
      inset: "retro-panel-inset",
      flat: "bg-card border border-border p-2",
    };

    return (
      <div ref={ref} className={cn(variants[variant], className)} {...props}>
        {header && (
          <div className="retro-header -m-2 mb-2">{header}</div>
        )}
        {children}
      </div>
    );
  }
);

RetroPanel.displayName = "RetroPanel";

export default RetroPanel;

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
}

const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "retro-button font-bold transition-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      default: "",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizes = {
      sm: "px-2 py-1 text-[10px]",
      md: "px-4 py-1 text-[11px]",
      lg: "px-6 py-2 text-[12px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RetroButton.displayName = "RetroButton";

export default RetroButton;

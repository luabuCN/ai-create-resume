import type { FC } from "react";
import { Button, type ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ILoadingButton extends ButtonProps {
  loading: boolean;
}

const LoadingButton: FC<ILoadingButton> = ({
  loading,
  disabled,
  className,
  ...props
}) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;

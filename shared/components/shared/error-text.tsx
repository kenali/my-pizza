import { cn } from "../../lib/utils";

interface Props {
  text: string;
  className?: string;
}

export const ErrorText = ({ className, text }: Props) => {
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};

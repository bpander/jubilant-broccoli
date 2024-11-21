import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...props}
    className={twMerge("rounded bg-zinc-700 border border-zinc-700 px-2 py-1 text-white disabled:opacity-50", props.className)}
  />
);

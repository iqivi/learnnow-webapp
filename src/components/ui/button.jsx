import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 cursor-pointer",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 w-3/4 cursor-pointer",
				outline_border:
					"border-2 border-[var(--main-green)] bg-background shadow-xs cursor-pointer dark:bg-input/30 dark:border-input w-3/4",
				outline_border_active:
					"border-2 border-[var(--main-green)] bg-[var(--main-green)] text-white shadow-xs cursor-pointer dark:bg-input/30 dark:border-input w-3/4",
				outline_icon:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 overflow-hidden p-0 cursor-pointer",
				outline_primary:
					"border bg-[var(--main-green)] text-white shadow-xs hover:bg-[var(--main-green)]/70 hover:text-primary hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 w-3/4 cursor-pointer",
				outline_filter:
					"border bg-[var(--filter-bg)] text-white shadow-xs hover:bg-[var(--filter-bg-active)]/70 hover:text-primary hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 w-3/4 cursor-pointer",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer",
				link: "text-primary underline-offset-4 hover:underline cursor-pointer",
				pill: "bg-[var(--main-green)] text-primary-foreground hover:bg-[var(--main-green)]/70 hover:text-muted-foreground w-full cursor-pointer",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				md: "h-9 w-50 rounded-md px-4 has-[>svg]:px-3",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				icon_sm: "size-8",
				icon_lg: "size-10",
				icon_rect: "size-15",
				pill: "h-60 px-5 ",
				avatar: "size-20 rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({ className, variant, size, asChild = false, ...props }) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}
export { Button, buttonVariants };

import { LoaderPinwheel } from "lucide-react";
import type React from "react";

interface LoaderProps {
	svgProps?: React.SVGProps<SVGSVGElement>;
	parentProps?: React.HTMLAttributes<HTMLElement>;
}

export default function Loader({ svgProps, parentProps }: LoaderProps) {
	return (
		<section
			className="flex min-h-[calc(100vh-64px)] flex-row items-center justify-center"
			{...parentProps}
		>
			<LoaderPinwheel className="animate-spin" {...svgProps} />
		</section>
	);
}

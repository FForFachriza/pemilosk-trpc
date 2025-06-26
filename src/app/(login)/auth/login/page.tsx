import LoginComponents from "@/app/(login)/auth/login/_components/login";
import InfoComponents from "@/app/(login)/auth/login/_components/info";

export default function Login() {
	return (
		<section className="flex h-screen w-full flex-col md:flex-row">
			<div className="order-last h-full md:order-first md:w-1/2">
				<LoginComponents />
			</div>
			<div className="h-full bg-[#1A56DB] md:w-1/2">
				<InfoComponents />
			</div>
		</section>
	);
}

import Link from "next/link";

import { auth } from "@/server/auth";
import { HydrateClient, api } from "@/trpc/server";
import { Calendar1Icon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import UserContainer from "@/components/user-container";
import type React from "react";

export default async function Home() {
	// TODO: IMPLEMENT AMBIL PERIODE AKTIF
	// TODO: IMPLEMENT FIRST GREETINGS
	// const hello = await api.post.hello({ text: "Haloooooooooooooooo" });
	const session = await auth();

	console.log(session?.user);

	// if (session?.user) {
	//     void api.post.getLatest.prefetch();
	// }

	return (
		<HydrateClient>
			<UserContainer className="mb-12 gap-x-4 gap-y-8">
				{/* Menu Kiri */}
				<section className="order-2 flex w-full flex-col gap-y-4 lg:order-1 lg:w-1/2">
					<h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
						Ayo Segera Gunakan Hak Pilih Kamu!
					</h1>
					<h2 className="mt-2 text-sm opacity-50 sm:text-base">
						Saatnya kita bersatu dan berpartisipasi dalam pemilihan ketua OSIS
						dan MPK sekolah kita. Mari kita jadikan suara kita didengar dan
						memilih pemimpin yang tepat untuk mewakili dan memajukan kepentingan
						kita.
					</h2>

					<CardSection />
				</section>

				{/* Menu Kanan */}
				<section className="order-1 flex w-full flex-col gap-y-4 lg:order-2 lg:w-1/2">
					<div className="relative h-48 w-full sm:h-64 lg:h-96">
						<Image
							src={"/hero.jpg"}
							alt={"Hero Image"}
							fill
							className="rounded-md object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
						/>
					</div>
				</section>
			</UserContainer>
		</HydrateClient>
	);
}

function CardSection() {
	return (
		<section className="mt-4 flex flex-col gap-6 lg:flex-row lg:justify-center lg:gap-0">
			{/* Card 1 */}
			<div className="flex flex-col space-y-3 lg:w-1/2 lg:space-y-4 lg:pr-4">
				<Calendar1Icon size={25} className="text-primary" />
				<h1 className="font-bold text-lg sm:text-xl">24 November 2023</h1>
				<h2 className="flex items-start text-sm text-opacity-50 sm:text-base lg:h-20">
					Tandai kalendermu dan jangan lewatkan kesempatan ini untuk
					berpartisipasi dalam pemilihan Ketua OSIS dan Ketua MPK.
				</h2>
				<Link href="/dashboard/pemilihan">
					<Button className="mt-2 w-full sm:w-48">Pilih Sekarang</Button>
				</Link>
			</div>

			<Separator
				orientation="vertical"
				className="mx-4 hidden data-[orientation=vertical]:h-60 lg:block"
			/>

			<Separator className="block lg:hidden" />

			{/* Card 2 */}
			<div className="flex flex-col space-y-3 lg:w-1/2 lg:space-y-4 lg:pl-4">
				<InfoIcon size={25} className="text-primary" />
				<h1 className="font-bold text-lg sm:text-xl">Informasi Kandidat</h1>
				<h2 className="flex items-start text-sm text-opacity-50 sm:text-base lg:h-20">
					Cek informasi mengenai kandidat dan wakil kandidat dari Ketua OSIS dan
					Ketua MPK di sini. Jangan sampai salah pilih!
				</h2>
				<Button variant={"outline"} className="mt-2 w-full sm:w-48">
					Informasi
				</Button>
			</div>
		</section>
	);
}

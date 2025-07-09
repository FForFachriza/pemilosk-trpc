import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Image from "next/image";
import UserContainer from "@/components/user-container";
import type React from "react";
import CardSection from "@/app/_components/card-section";

export default async function Home() {
	const session = await auth();

	if (session?.user) {
		void api.periode.getActivePeriode.prefetch();
	}

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

					<CardSection user={session} />
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

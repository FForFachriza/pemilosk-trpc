"use client";

import React, { useEffect } from "react";
import { Calendar1Icon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { api } from "@/trpc/react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { toast } from "sonner";
import type { Session } from "next-auth";

export default function CardSection({ user }: { user: Session | null }) {
	const [activePeriodes] = api.periode.getActivePeriode.useSuspenseQuery();
	const [firstGreet] = useQueryState("first", parseAsBoolean);

	useEffect(() => {
		if (firstGreet && user) {
			toast.success(`Halo ${user.user.nis}! Selamat Datang Di Pemilosk!`);
		}
	}, [firstGreet, user]);

	return (
		<section className="mt-4 flex flex-col gap-6 lg:flex-row lg:justify-center lg:gap-0">
			{/* Card 1 */}
			<div className="flex flex-col space-y-3 lg:w-1/2 lg:space-y-4 lg:pr-4">
				<Calendar1Icon size={25} className="text-primary" />
				<h1 className="font-bold text-lg sm:text-xl">{activePeriodes?.nama}</h1>
				<h2 className="flex items-start text-sm text-opacity-50 sm:text-base lg:h-20">
					Tandai kalendermu dan jangan lewatkan kesempatan ini untuk
					berpartisipasi dalam pemilihan Ketua OSIS dan Ketua MPK.
				</h2>
				<Link href={"/pemilihan"}>
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

import React from "react";
import { HydrateClient } from "@/trpc/server";
import UserContainer from "@/components/user-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PemilihanPage() {
	return (
		<HydrateClient>
			<UserContainer className={"mt-4 mb-12 flex lg:mt-0 lg:mb-0 lg:flex-col"}>
				<section
					className={"flex flex-col items-center justify-center gap-y-4"}
				>
					<h1 className={"font-bold text-4xl"}>Pilih Kandidatmu!</h1>
					<p className={"text-center opacity-50"}>
						Ayo kita tunjukkan betapa pentingnya partisipasi aktif dalam
						pemilihan Ketua OSIS dan MPK dengan memilih dengan benar. Dalam
						pemilihan ini, mari kita berpikir secara cermat, teliti, dan
						obyektif. Kenali calon-calonnya, dengarkan visi dan program
						kerjanya, dan pertimbangkanlah dengan bijak.
					</p>
				</section>

				<section
					className={"mt-8 flex flex-col gap-y-8 lg:flex-row lg:gap-x-8"}
				>
					<div className={"flex flex-col gap-y-4"}>
						<div className={"h-96 w-full rounded-lg bg-gray-700"} />
						<Badge variant={"outline"}>OSIS</Badge>
						<h1 className={"font-bold text-2xl"}>Pemilihan Ketua OSIS</h1>
						<p className={"text-justify opacity-50"}>
							Gunakan hak pilih mu dengan baik dan benar untuk memilih Ketua
							OSIS. Kanidat Calon Ketua OSIS diantaranya : Ahmad Budi, Wawan,
							Kipli Mas.
						</p>
						<div className="flex flex-row justify-between gap-x-2">
							<Button className="min-w-0 flex-1">Masuk</Button>
							<Button className="min-w-0 flex-1" variant={"outline"}>
								Konfirmasi
							</Button>
						</div>
					</div>
					<div className={"flex flex-col gap-y-4"}>
						<div className={"h-96 w-full rounded-lg bg-gray-700"} />
						<Badge variant={"outline"}>MPK</Badge>
						<h1 className={"font-bold text-2xl"}>Pemilihan Ketua MPK</h1>
						<p className={"text-justify opacity-50"}>
							Gunakan hak pilih mu dengan baik dan benar untuk memilih Ketua
							OSIS. Kanidat Calon Ketua OSIS diantaranya : Ahmad Budi, Wawan,
							Kipli Mas.
						</p>
						<div className="flex flex-row justify-between gap-x-2">
							<Button className="min-w-0 flex-1">Masuk</Button>
							<Button className="min-w-0 flex-1" variant={"outline"}>
								Konfirmasi
							</Button>
						</div>
					</div>
				</section>
			</UserContainer>
		</HydrateClient>
	);
}

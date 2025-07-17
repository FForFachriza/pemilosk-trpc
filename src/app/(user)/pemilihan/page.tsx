import React from "react";
import { HydrateClient } from "@/trpc/server";
import UserContainer from "@/components/user-container";
import CardCandidates from "@/app/(user)/pemilihan/_components/card-kandidates";

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
					<CardCandidates type={"OSIS"} />
					<CardCandidates type={"MPK"} />
				</section>
			</UserContainer>
		</HydrateClient>
	);
}

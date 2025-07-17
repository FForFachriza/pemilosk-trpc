import React from "react";
import { Badge } from "@/components/ui/badge";
import { BoxesIcon, BoxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardCandidatesProps {
	type: "OSIS" | "MPK";
}

export default function CardCandidates(props: CardCandidatesProps) {
	const { type } = props;

	return (
		<div className={"flex flex-col gap-y-4"}>
			<div className={"h-96 w-full rounded-lg bg-gray-700"} />
			<Badge
				className={` ${type === "MPK" ? "bg-[#C3DDFD] text-primary" : "bg-[#BCF0DA] text-[#046C4E] "} text-lg`}
				variant={"outline"}
			>
				{type === "MPK" ? <BoxesIcon /> : <BoxIcon />}
				{type === "MPK" ? "MPK" : "OSIS"}
			</Badge>
			<h1 className={"font-bold text-2xl"}>
				Pemilihan Ketua {type === "MPK" ? "MPK" : "OSIS"}
			</h1>
			<p className={"text-justify opacity-50"}>
				Gunakan hak pilih mu dengan baik dan benar untuk memilih Ketua{" "}
				{type === "MPK" ? "MPK" : "OSIS"}. Kandidat Calon Ketua
				{type === "MPK" ? "MPK" : "OSIS"} diantaranya : Ahmad Budi, Wawan, Kipli
				Mas.
			</p>
			<div className="flex flex-row justify-between gap-x-2">
				<Button className="min-w-0 flex-1">Masuk</Button>
				<Button className="min-w-0 flex-1" variant={"outline"}>
					Konfirmasi
				</Button>
			</div>
		</div>
	);
}
//TODO: IMPLEMENT BACKEND

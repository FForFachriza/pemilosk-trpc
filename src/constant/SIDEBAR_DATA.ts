// TODO: IDK, MAYBE FIX LATER
interface sidebarProps {
	navMain: {
		title: string;
		url: string;
		items: Array<{ title: string; url: string }>;
	}[];
}

export const sidebar_data: sidebarProps = {
	navMain: [
		{
			title: "Manajemen Pengguna",
			url: "#",
			items: [
				{
					title: "Daftar User",
					url: "/dashboard/users",
				},
				{
					title: "Hak Voting",
					url: "/dashboard/voting-chances",
				},
			],
		},
		{
			title: "Kandidat OSIS",
			url: "#",
			items: [
				{
					title: "Daftar Kandidat",
					url: "/dashboard/osis",
				},
				{
					title: "Pasangan OSIS",
					url: "/dashboard/osis/pasangan",
				},
			],
		},
		{
			title: "Kandidat MPK",
			url: "#",
			items: [
				{
					title: "Daftar Kandidat",
					url: "/dashboard/mpk",
				},
				{
					title: "Pasangan MPK",
					url: "/dashboard/mpk/pasangan",
				},
			],
		},
		{
			title: "Periode & Pemilihan",
			url: "#",
			items: [
				{
					title: "Manajemen Periode",
					url: "/dashboard/periode",
				},
				{
					title: "Aktifkan Voting",
					url: "/dashboard/periode/aktifkan",
				},
			],
		},
		{
			title: "Laporan",
			url: "#",
			items: [
				{
					title: "Statistik Voting",
					url: "/dashboard/laporan/statistik",
				},
				{
					title: "Export Data",
					url: "/dashboard/laporan/export",
				},
			],
		},
	],
};

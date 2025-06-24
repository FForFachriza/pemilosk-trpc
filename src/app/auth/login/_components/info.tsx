export default function InfoComponents() {
	return (
		<div className="flex h-full flex-col justify-center space-y-4 p-14 text-white md:p-24">
			<p className="font-bold text-3xl">Pemilosk</p>
			<h1 className="font-bold text-4xl">
				{" "}
				Website Pemilihan Ketua Osis & Ketua MPK
			</h1>
			<p className="text-lg text-white text-opacity-50">
				Ayo, gunakan hak pilihmu sebaik mungkin untuk memilih pemimpin terbaik!
				Ciptakan lingkungan berpolitik yang sehat dan positif di sekolah kita.
			</p>
			<p className="text-white text-opacity-50">
				Made By&nbsp;
				{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
				<a href="#" className="text-white text-opacity-70">
					Lokalin
				</a>
			</p>
		</div>
	);
}

"use client";
import type React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useQueryState } from "nuqs";

export default function LoginComponents() {
	const [nis, setNis] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [urlError] = useQueryState("error");

	useEffect(() => {
		if (urlError) {
			toast.error("Nis Dan Password Salah!");
		}
	}, [urlError]);

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!nis || !password) return;

		try {
			setIsLoading(true);

			await signIn("credentials", {
				username: nis,
				password,
				redirectTo: `${window.location.origin.replace(/\/$/, "")}?first=true`,
			});
		} catch (err) {
			toast.error("Error Yang Tidak Diketahui Terjadi, Dimohon Coba Kembali");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto flex flex-col items-center justify-center p-8 md:h-screen">
			<div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
				<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
					<h1 className="font-bold text-xl leading-tight tracking-tight md:text-2xl">
						Sign in to your account
					</h1>
					<form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
						<div>
							<Label htmlFor="nis" className={"mb-2"}>
								NIS
							</Label>
							<Input
								onChange={(e) => setNis(e.target.value)}
								id={"nis"}
								placeholder="10075"
								required
								type={"number"}
							/>
						</div>
						<div>
							<Label htmlFor="password" className={"mb-2"}>
								Password
							</Label>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								id={"password"}
								required
								type={"password"}
								placeholder="●●●●●●●"
							/>
						</div>
						<Button disabled={isLoading} className="w-full hover:bg-[#1441a3]">
							Sign in
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

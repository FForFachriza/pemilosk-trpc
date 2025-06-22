"use client";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { signIn } from "next-auth/react";

export default function LoginComponents() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-8 md:h-screen">
      <div className="w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="font-bold text-black text-xl leading-tight tracking-tight md:text-2xl">
            Sign in to your account
          </h1>
          <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="username" className="mb-2 block font-medium text-gray-900 text-sm">
                Username
              </label>
              <input
                id="username"
                type="number"
                ref={usernameRef}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                placeholder="dimasavrianfachriza"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block font-medium text-gray-900 text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                required
              />
            </div>
            {error === "CredentialsSignin" && (
              <div className="text-center font-medium text-red-500 text-sm">Invalid username or password</div>
            )}
            <button
              type="submit"
              className="btn w-full rounded-lg border-none bg-[#1A56DB] px-5 py-2.5 text-center font-medium text-sm text-white hover:bg-[#1441a3]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

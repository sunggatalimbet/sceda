"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";

const authSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthSchema = z.infer<typeof authSchema>;

export const AuthForm = ({
	onSubmitAction,
}: {
	onSubmitAction: (data: AuthSchema) => void;
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
	});

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-[460px] relative">
				<div className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-20 h-20 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10 relative z-10 border border-gray-100">
					<div className="text-center mb-6">
						{/* <div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
								<Image
									src="/logo.png"
									alt="Sceda Logo"
									width={40}
									height={40}
									className="-rotate-12 hover:rotate-0 transition-transform duration-300"
								/>
							</div>
						</div> */}
						<h1 className="text-[28px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-1">
							Welcome to Sceda
						</h1>
						<p className="text-gray-400 text-[14px]">
							View your class schedule and download it to set it as your wallpaper
						</p>
					</div>

					<div className="mb-6">
						<div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg">
							<AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
							<p className="text-indigo-700 text-sm">
								Enter your NU registrar credentials
							</p>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmitAction)} className="space-y-5">
						<div className="space-y-1.5">
							<label
								htmlFor="username"
								className="block text-gray-700 text-sm font-medium"
							>
								Username
							</label>
							<input
								id="username"
								type="text"
								placeholder="Enter your username"
								className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all duration-200 placeholder:text-gray-400"
								{...register("username")}
							/>
							{errors.username && (
								<p className="text-red-500 text-sm flex items-center gap-1">
									<AlertCircle className="w-4 h-4" />
									{errors.username.message}
								</p>
							)}
						</div>

						<div className="space-y-1.5">
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-medium"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all duration-200 pr-12 placeholder:text-gray-400"
									{...register("password")}
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
									<span className="sr-only">
										{showPassword ? "Hide password" : "Show password"}
									</span>
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm flex items-center gap-1 mb-1">
									<AlertCircle className="w-4 h-4" />
									{errors.password.message}
								</p>
							)}
							<p className="text-gray-400 text-[14px] text-center">
								We don&apos;t store any information about you, including registrar password :)
							</p>
						</div>

						<button
							type="submit"
							className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg py-3 px-4 text-base font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40"
						>
							<LogIn className="w-5 h-5" />
							Sign In
						</button>
					</form>

					<div className="mt-8 text-center">
						<Link
							href="https://github.com/sunggatalimbet/sceda"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors gap-2 text-sm group"
						>
							<Image
								alt="Github Icon"
								src="/github-mark.svg"
								width={20}
								height={20}
								className="group-hover:scale-110 transition-transform"
							/>
							<span className="group-hover:underline">View our open-source code</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

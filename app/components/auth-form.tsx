"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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
		<div className="min-h-screen flex items-center justify-center bg-white px-4">
			<div className="w-full max-w-[460px]">
				<div className="text-center mb-8">
					<h1 className="text-[24px] font-bold text-[#0F172A] mb-3">
						Welcome to Sceda
					</h1>
					<p className="text-[#475569] text-base">
						View your class schedule and download it to set it as
						your wallpaper
					</p>
				</div>

				<div>
					<p className="text-[#475569] text-sm mb-2">
						Enter your NU registrar credentials
					</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmitAction)}
					className="space-y-6"
				>
					<div className="space-y-1.5">
						<label
							htmlFor="username"
							className="block text-[#0F172A] text-base font-medium"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Enter your username"
							className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-base"
							{...register("username")}
						/>
						{errors.username && (
							<p className="text-red-500 text-sm">
								{errors.username.message}
							</p>
						)}
					</div>

					<div className="space-y-1.5">
						<label
							htmlFor="password"
							className="block text-[#0F172A] text-base font-medium"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-base pr-12"
								{...register("password")}
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
								<span className="sr-only">
									{showPassword
										? "Hide password"
										: "Show password"}
								</span>
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm">
								{errors.password.message}
							</p>
						)}
						<p className="text-[#64748B] text-sm">
							We don&apos;t store any information about you,
							including registrar password.
						</p>
					</div>

					<button
						type="submit"
						className="w-full bg-[#4F46E5] text-white rounded-lg py-2.5 px-4 text-base font-semibold hover:bg-[#4338CA] transition-colors"
					>
						Sign In
					</button>
				</form>

				<div className="mt-8 text-center">
					<Link
						href="https://github.com/yourusername/sceda"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center text-[#475569] hover:text-[#4F46E5] transition-colors gap-2 text-sm"
					>
						<Image
							alt={"Github Icon"}
							src={"/github-mark.svg"}
							width={20}
							height={20}
						/>
						View our open-source code
					</Link>
				</div>
			</div>
		</div>
	);
};

"use client";

import { useRef, useState } from "react";
import { useGetSchedule } from "./hooks/useGetSchedule";

import { Schedule } from "./components/schedule";
import { ButtonGroup } from "./components/button-group";
import { AuthForm, type AuthSchema } from "./components/auth-form";
import { LoadingSpinner } from "./components/loading-skeleton";
import { ErrorMessage } from "./components/error-message";
import type { IThemesNames } from "./types";

export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentTheme, setCurrentTheme] = useState<IThemesNames>("default");
	const pageRef = useRef<HTMLDivElement>(null);
	const buttonGroupRef = useRef<HTMLDivElement>(null);

	const {
		mutate: getSchedule,
		data,
		isLoading,
		isError,
		error,
	} = useGetSchedule();

	const onSubmit = (data: AuthSchema) => {
		getSchedule({ username: data.username, password: data.password });
		setIsAuthenticated(true);
	};

	if (isLoading) return <LoadingSpinner />;
	if (isError) return <ErrorMessage error={error} />;

	return (
		<main className="w-full">
			{isAuthenticated && data && (
				<div
					ref={pageRef}
					data-page-container
					className="flex flex-col justify-end min-h-screen px-6 py-20 w-full bg-white relative"
					style={{
						minWidth: "100%",
						width: "100%",
					}}
				>
					<ButtonGroup
						pageRef={pageRef}
						buttonGroupRef={buttonGroupRef}
						setCurrentTheme={setCurrentTheme}
					/>
					<Schedule courses={data} currentTheme={currentTheme} />
				</div>
			)}

			{!isAuthenticated && <AuthForm onSubmitAction={onSubmit} />}
		</main>
	);
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Schedule } from "./components/schedule";
import { ButtonGroup } from "./components/button-group";
import { useGetSchedule } from "./hooks/useGetSchedule";
import { AuthForm, AuthSchema } from "./components/auth-form";

export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const pageRef = useRef<HTMLDivElement>(null);
	const buttonGroupRef = useRef<HTMLDivElement>(null);

	const {
		mutate: getSchedule,
		data,
		isLoading,
		isError,
		error,
	} = useGetSchedule();

	useEffect(() => {
		console.log(isError, error);
	}, [isError, error]);

	const onSubmit = (data: AuthSchema) => {
		getSchedule({ username: data.username, password: data.password });
		setIsAuthenticated(true);
	};

	if (isLoading) return <>Here should be loading state...</>;
	if (isError) return <>Sorry. Unexpected error happened.</>;
	// if (!data) return <>We received incorrect data</>;

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
					/>
					<Schedule courses={data} />
				</div>
			)}

			{!isAuthenticated && <AuthForm onSubmitAction={onSubmit} />}
		</main>
	);
}

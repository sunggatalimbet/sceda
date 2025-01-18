import { ApiError } from "../utils/api-error";

type Props = {
	error: ApiError;
};

export const ErrorMessage = (error: Props) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md w-full">
				<h2 className="text-red-800 font-semibold mb-2">Error</h2>
				<p className="text-red-600">
					{error instanceof ApiError
						? error.message
						: "An unexpected error occurred"}
				</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
				>
					Try Again
				</button>
			</div>
		</div>
	);
};

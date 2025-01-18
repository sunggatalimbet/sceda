export const LoadingSpinner = () => {
	return (
		<div className="min-h-screen flex justify-center items-center">
			<div
				className={`border-4 border-t-[#4F46E5] border-r-[#4F46E5] border-b-[#4F46E5]/30 border-l-[#4F46E5]/30 rounded-full animate-spin w-12 h-12`}
				role="status"
				aria-label="loading"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

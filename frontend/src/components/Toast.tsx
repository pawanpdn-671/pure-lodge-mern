import { useEffect } from "react";

type ToastProps = {
	message: string;
	type: "SUCCESS" | "ERROR";
	onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className="fixed flex min-h-12 top-4 right-0 z-[999] rounded-l-md bg-white shadow-sm shadow-zinc-200 w-[300px] sm:w-[350px]">
			<div
				className={`w-2 h-full absolute rounded-s-md ${type === "SUCCESS" ? "bg-green-400" : "bg-red-400"}`}></div>
			<div className="text-left px-4 pl-6 flex items-center">
				<span className="text-base font-semibold text-black">{message}</span>
			</div>
		</div>
	);
};

export default Toast;

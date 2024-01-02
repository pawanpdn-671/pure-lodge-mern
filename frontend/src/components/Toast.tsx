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

	const styles =
		type === "SUCCESS"
			? "fixed top-4 right-0 z-50 p-4 rounded-l-md bg-green-600 text-white w-[300px] sm:w-[350px]"
			: "fixed top-4 right-4 z-50 p-4 rounded-l-md bg-red-600 text-white w-[300px] sm:w-[500px]";

	return (
		<div className={styles}>
			<div className="text-left">
				<span className="text-base font-semibold">{message}</span>
			</div>
		</div>
	);
};

export default Toast;

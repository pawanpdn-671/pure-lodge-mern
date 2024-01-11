import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { SetStateAction } from "react";

const SignoutButton = ({ setMenuOpen }: { setMenuOpen?: React.Dispatch<SetStateAction<boolean>> }) => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("validateToken");
			showToast({
				type: "SUCCESS",
				message: "Logout Successful!",
			});
			if (setMenuOpen) {
				setMenuOpen(false);
			}
		},
		onError: (error: Error) => {
			showToast({
				type: "ERROR",
				message: error.message,
			});
			if (setMenuOpen) {
				setMenuOpen(false);
			}
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button onClick={handleClick} className="text-red-500 px-3 font-bold bg-white hover:bg-gray-100" type="button">
			Logout
		</button>
	);
};

export default SignoutButton;

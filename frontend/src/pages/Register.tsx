import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const { showToast } = useAppContext();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({
				type: "SUCCESS",
				message: "Registration Successful!",
			});
			await queryClient.invalidateQueries("validateToken");
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({
				type: "ERROR",
				message: error.message,
			});
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5 max-w-full sm:max-w-xl mx-auto">
			<h2 className="text-3xl font-bold">Create an Account</h2>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-700 text-base font-bold flex-1">
					First Name
					<input
						type="text"
						className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
						{...register("firstName", { required: "This field is required" })}
					/>
					{errors.firstName && (
						<span className="text-red-400 text-sm font-medium">{errors.firstName.message}</span>
					)}
				</label>
				<label className="text-gray-700 text-base font-bold flex-1">
					Last Name
					<input
						type="text"
						className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
						{...register("lastName", { required: "This field is required" })}
					/>
					{errors.lastName && <span className="text-red-400 text-sm font-medium">{errors.lastName.message}</span>}
				</label>
			</div>
			<label className="text-gray-700 text-base font-bold flex-1">
				Email
				<input
					type="email"
					className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
					{...register("email", { required: "This field is required" })}
				/>
				{errors.email && <span className="text-red-400 text-sm font-medium">{errors.email.message}</span>}
			</label>
			<label className="text-gray-700 text-base font-bold flex-1">
				Password
				<input
					type="password"
					className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
					{...register("password", {
						required: "This field is required.",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters.",
						},
					})}
				/>
				{errors.password && <span className="text-red-400 text-sm font-medium">{errors.password.message}</span>}
			</label>
			<label className="text-gray-700 text-base font-bold flex-1">
				Confirm Password
				<input
					type="password"
					className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
					{...register("confirmPassword", {
						validate: (val) => {
							if (!val) return "This field is required";
							else if (watch("password") !== val) {
								return "Your password does not match";
							}
						},
					})}
				/>
				{errors.confirmPassword && (
					<span className="text-red-400 text-sm font-medium">{errors.confirmPassword.message}</span>
				)}
			</label>
			<div className="flex justify-end mt-5">
				<button
					type="submit"
					className="outline-none bg-indigo-600 text-white py-2 px-4 font-bold hover:bg-indigo-500 text-xl">
					Create Account
				</button>
			</div>
		</form>
	);
};

export default Register;

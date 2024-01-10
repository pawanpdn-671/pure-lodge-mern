import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type LoginFormData = {
	email: string;
	password: string;
};

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const { showToast } = useAppContext();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const mutation = useMutation(apiClient.login, {
		onSuccess: async () => {
			showToast({
				type: "SUCCESS",
				message: "Login Successful!",
			});
			await queryClient.invalidateQueries("validateToken");
			navigate(location.state?.from?.pathname || "/");
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
		<div>
			<form className="flex flex-col gap-5 max-w-full sm:max-w-xl mx-auto" onSubmit={onSubmit}>
				<h2 className="text-3xl my-5 text-center font-bold">Login</h2>
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
				<div className="flex items-center justify-between mt-8">
					<span className="text-sm">
						Not Registered?{" "}
						<Link to="/register" className="underline text-indigo-600">
							Create account
						</Link>
					</span>
					<button
						type="submit"
						className="outline-none bg-indigo-600 text-white py-2 px-5 font-bold hover:bg-indigo-500 text-xl">
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;

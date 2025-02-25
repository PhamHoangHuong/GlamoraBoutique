import { useLoginMutation } from "@/queries/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Email không hợp lệ")
		.required("Vui lòng nhập email"),
	password: yup.string().required("Vui lòng nhập mật khẩu"),
});

type FormData = {
	email: string;
	password: string;
};

export default function Login() {
	const loginMutation = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		if (loginMutation.isPending) return;
		try {
			const result = await loginMutation.mutateAsync(data);
			if (result.data.status === "success") {
				window.location.href = "/admin";
			}
		} catch (error) {
			console.log(error);
			setError("root", {
				type: "manual",
				message: "Đăng nhập thất bại, vui lòng thử lại!",
			});
		}
	};

	return (
		<section className="tw-bg-gray-50 dark:tw-bg-gray-900">
			<div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-6 tw-py-8 tw-mx-auto md:tw-h-screen lg:tw-py-0">
				<div className="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
					<div className="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
						<h1 className="tw-text-xl tw-font-bold tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
							Sign in to your account
						</h1>
						<form
							className="tw-space-y-4 md:tw-space-y-6"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<label className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">
									Your email
								</label>
								<input
									type="email"
									{...register("email")}
									className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600"
									placeholder="name@company.com"
								/>
								{errors.email && (
									<p className="tw-text-red-500 tw-text-sm">
										{errors.email.message}
									</p>
								)}
							</div>
							<div>
								<label className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">
									Password
								</label>
								<input
									type="password"
									{...register("password")}
									className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600"
									placeholder="••••••••"
								/>
								{errors.password && (
									<p className="tw-text-red-500 tw-text-sm">
										{errors.password.message}
									</p>
								)}
							</div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="tw-w-full tw-text-white tw-bg-primary-600 hover:tw-bg-primary-700 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5"
							>
								{isSubmitting ? "Logging in..." : "Sign in"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

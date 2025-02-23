import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useLoginMutation } from "@/queries/useAuth";

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

export default function LoginForm() {
	const { openRegister, closeModal } = useAuthModal();
	const loginMutation = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
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
				closeModal();
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
		<div>
			<div className="tw-text-center tw-mb-8">
				<h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">Đăng nhập</h2>
				<p className="tw-text-gray-600 tw-mt-2">
					Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-6">
				<div>
					<label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
						Email
					</label>
					<input
						type="text"
						{...register("email")}
						className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-border-primary-500 focus:tw-ring-2 focus:tw-ring-primary-200 tw-transition-all"
						placeholder="Nhập email của bạn"
					/>
					{errors.email && (
						<p className="tw-text-red-500 tw-text-sm">{errors.email.message}</p>
					)}
				</div>

				<div>
					<label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
						Mật khẩu
					</label>
					<input
						type="password"
						{...register("password")}
						className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-border-primary-500 focus:tw-ring-2 focus:tw-ring-primary-200 tw-transition-all"
						placeholder="Nhập mật khẩu"
					/>
					{errors.password && (
						<p className="tw-text-red-500 tw-text-sm">
							{errors.password.message}
						</p>
					)}
				</div>
				{errors.root && (
					<p className="tw-text-red-500 tw-text-sm tw-text-center">
						{errors.root.message}
					</p>
				)}

				<div className="tw-flex tw-items-center tw-justify-between">
					<label className="tw-flex tw-items-center">
						<input
							type="checkbox"
							{...register("remember")}
							className="tw-rounded tw-border-gray-300 tw-text-primary-600 focus:tw-ring-primary-500"
						/>
						<span className="tw-ml-2 tw-text-sm tw-text-gray-600">
							Ghi nhớ đăng nhập
						</span>
					</label>
				</div>

				<button
					type="submit"
					className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-3 tw-rounded-lg tw-font-semibold hover:tw-bg-primary-700 tw-transition-all tw-shadow-lg hover:tw-shadow-xl hover:tw-transform hover:tw-scale-[1.02]"
				>
					Đăng nhập
				</button>

				<div className="tw-text-center tw-text-sm tw-text-gray-600">
					Chưa có tài khoản?{" "}
					<button
						type="button"
						onClick={openRegister}
						className="tw-text-primary-600 hover:tw-text-primary-700 tw-font-medium"
					>
						Đăng ký ngay
					</button>
				</div>

				<div className="tw-relative tw-mt-6">
					<div className="tw-absolute tw-inset-0 tw-flex tw-items-center">
						<div className="tw-w-full tw-border-t tw-border-gray-300"></div>
					</div>
					<div className="tw-relative tw-flex tw-justify-center tw-text-sm">
						<span className="tw-px-2 tw-bg-white tw-text-gray-500">
							Hoặc đăng nhập với
						</span>
					</div>
				</div>

				<div className="tw-grid tw-grid-cols-2 tw-gap-4">
					<button
						type="button"
						className="tw-flex tw-justify-center tw-items-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-bg-white hover:tw-bg-gray-50 tw-transition-all"
					>
						<i className="fab fa-google tw-text-red-500 tw-mr-2"></i>
						Google
					</button>
					<button
						type="button"
						className="tw-flex tw-justify-center tw-items-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-bg-white hover:tw-bg-gray-50 tw-transition-all"
					>
						<i className="fab fa-facebook tw-text-blue-600 tw-mr-2"></i>
						Facebook
					</button>
				</div>
			</form>
		</div>
	);
}

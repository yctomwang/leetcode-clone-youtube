import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch("YOUR_FLASK_API_URL/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email
				})
			});

			const data = await response.json();

			if (response.status === 200) {
				toast.success("Password reset email sent", { position: "top-center", autoClose: 3000, theme: "dark" });
			} else {
				toast.error(data.message, { position: "top-center", autoClose: 3000, theme: "dark" });
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: 3000, theme: "dark" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handleReset}>
			<h3 className='text-xl font-medium  text-white'>Reset Password</h3>
			<p className='text-sm text-white '>
				Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.
			</p>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your email
				</label>
				<input
					type='email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='name@company.com'
				/>
			</div>

			<button
				type='submit'
				className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-brand-orange hover:bg-brand-orange-s ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Reset Password"}
			</button>
		</form>
	);
};

export default ResetPassword;

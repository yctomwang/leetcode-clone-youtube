import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { authModalState } from "@/atoms/authModalAtom";


type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
	const router = useRouter();
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");
		toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
		try {
			const response = await fetch("YOUR_FLASK_API_URL/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(inputs)
			});

			const data = await response.json();

			if (response.status === 200) {
				router.push("/");
			} else {
				toast.error(data.message, { position: "top-center" });
			}
		} catch (error) {
			toast.error("An error occurred while registering. Please try again.", { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	return (
		<form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
			<h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email
				</label>
				<input
					onChange={handleChangeInput}
					type='email'
					name='email'
					id='email'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
					Display Name
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='displayName'
					id='displayName'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='John Doe'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Password
				</label>
				<input
					onChange={handleChangeInput}
					type='password'
					name='password'
					id='password'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        '
			>
				Register
			</button>

			<div className='text-sm font-medium text-gray-300'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
					Log In
				</a>
			</div>
		</form>
	);
};

export default Signup;


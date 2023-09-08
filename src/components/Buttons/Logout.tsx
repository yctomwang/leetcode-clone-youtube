import React from "react";
import { FiLogOut } from "react-icons/fi";

const Logout: React.FC = () => {
	//todo: change the base url
	const handleLogout = async () => {
		try {
			const response = await fetch('/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();

			if (response.ok) {
				console.log(data.message);
				// Handle any post-logout logic here
			} else {
				console.error("Failed to log out:", data.message);
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
			<FiLogOut />
		</button>
	);
};

export default Logout;

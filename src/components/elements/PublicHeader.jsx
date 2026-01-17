import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import logoText from "@/assets/logo_text.svg";

export function PublicHeader() {
	const navigate = useNavigate();

	return (
		<div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm'>
			<div className='header w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 mx-auto gap-3 sm:gap-0'>
				<img
					src={logoText}
					alt='LearNow'
					className='h-7 sm:h-8 lg:h-10 w-auto'
				/>
				<nav className='flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto'>
					<Button
						variant='outline'
						onClick={() => navigate("/login")}
						className='text-xs sm:text-sm px-3 sm:px-4'>
						Zaloguj
					</Button>
					<Button
						variant='outline_primary'
						onClick={() => navigate("/register")}
						className='text-xs sm:text-sm px-3 sm:px-4'>
						Rejestracja
					</Button>
				</nav>
			</div>
		</div>
	);
}

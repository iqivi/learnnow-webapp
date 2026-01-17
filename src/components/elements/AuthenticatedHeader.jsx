import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import { ButtonGroup } from "../ui/button-group";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import logoText from "@/assets/logo_text.svg";
import avatar from "@/assets/avatar.jfif";

export function AuthenticatedHeader() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const goToMyCourses = () => {
		navigate("/dashboard");
	};

	const goToLibrary = () => {
		navigate("/library");
	};

	const goToAdmin = () => {
		navigate("/admin");
	};

	const goToAuthor = () => {
		navigate("/author");
	};

	const openModal = modalName => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("modal", modalName);
		navigate(`${location.pathname}?${newSearchParams.toString()}`);
	};

	const openProfileModal = () => openModal("profile");
	// const openSettingsModal = () => openModal("settings");
	const openSupportModal = () => openModal("support");
	// const openCourseModal = () => openModal("course");

	return (
		<div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm'>
			<div className='header max-w-7xl flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mx-auto gap-4 lg:gap-0 w-full'>
				<img
					className='logo cursor-pointer h-8 sm:h-10 w-auto flex-shrink-0'
					src={logoText}
					onClick={goToMyCourses}
					alt='LearNow'
				/>
				<div className='menu flex flex-row items-center justify-center sm:justify-between w-full lg:w-auto gap-3 sm:gap-4 lg:gap-30'>
					<div className='hidden sm:flex'>
						<ButtonGroup>
							<Button
								variant={`${
									location.pathname === "/dashboard"
										? "outline_border_active"
										: "outline_border"
								}`}
								onClick={goToMyCourses}
								className='text-xs sm:text-sm'>
								moje kursy
							</Button>
							<Button
								variant={`${
									location.pathname === "/library"
										? "outline_border_active"
										: "outline_border"
								}`}
								onClick={goToLibrary}
								className='text-xs sm:text-sm'>
								biblioteka
							</Button>
						</ButtonGroup>
					</div>

					<div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className='w-full flex items-center justify-center'>
									<Button variant='outline_primary' size='avatar'>
										<img
											className='h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full cursor-pointer object-cover'
											src={avatar}
											alt={user?.email}
										/>
									</Button>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-56' align='start'>
								<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
								<DropdownMenuGroup>
									<DropdownMenuItem onClick={openProfileModal}>
										Profil
									</DropdownMenuItem>
									<DropdownMenuItem onClick={goToAdmin}>
										Panel administratora
									</DropdownMenuItem>{" "}
									<DropdownMenuItem onClick={goToAuthor}>
										Panel autora
									</DropdownMenuItem>
									{/* <DropdownMenuItem onClick={openSettingsModal}>
									Ustawienia
								</DropdownMenuItem> */}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem onClick={() => navigate("/library")}>
										Biblioteka kursów
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => navigate("/dashboard")}>
										Moje kursy
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={openSupportModal}>
									Pomoc
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout}>
									Wyloguj
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	);
}

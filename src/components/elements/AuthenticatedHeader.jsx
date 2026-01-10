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
			<div className='header w-6/7 flex flex-col lg:flex-row justify-between items-center px-8 py-8 mx-auto'>
				<img
					className='logo cursor-pointer'
					src='src\assets\logo_text.svg'
					onClick={goToMyCourses}
					alt=''
				/>
				{/* w-50 flex justify-end items-center gap-4 */}
				<div className='menu flex items-center justify-center lg:justify-end w-1/3 gap-30'>
					<div>
						<ButtonGroup>
							<Button
								variant={`${
									location.pathname === "/dashboard"
										? "outline_border_active"
										: "outline_border"
								}`}
								onClick={goToMyCourses}>
								moje kursy
							</Button>
							<Button
								variant={`${
									location.pathname === "/library"
										? "outline_border_active"
										: "outline_border"
								}`}
								onClick={goToLibrary}>
								biblioteka
							</Button>
						</ButtonGroup>
					</div>
					<div className=''>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className='w-full flex items-center justify-center'>
									<Button variant='outline_primary' size='avatar'>
										<img
											className='size-16 rounded-full cursor-pointer'
											src='src\assets\avatar.jfif'
											alt=''
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

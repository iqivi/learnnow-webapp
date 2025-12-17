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
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";

function AuthenticatedHeader() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className='header w-6/7 flex flex-row justify-between items-center px-8 py-8 mx-auto'>
			<img className='logo' src='src\assets\logo_text.svg' alt='' />
			{/* w-50 flex justify-end items-center gap-4 */}
			<div className='menu flex items-center justify-end w-1/3 gap-30'>
				<div>
					<ButtonGroup>
						<Button
							variant='outline_border'
							onClick={() => navigate("/dashboard")}>
							moje kursy
						</Button>
						<Button
							variant='outline_border'
							onClick={() => navigate("/library")}>
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
										className='size-16 rounded-full'
										src='src\assets\avatar.jfif'
										alt=''
									/>
								</Button>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='start'>
							<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => navigate("/profile")}>
									Profil
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate("/settings")}>
									Ustawienia
								</DropdownMenuItem>
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
							<DropdownMenuItem onClick={() => navigate("/support")}>
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
	);
}

export default AuthenticatedHeader;

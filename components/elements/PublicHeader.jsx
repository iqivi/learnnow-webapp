import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";

function PublicHeader() {
	const navigate = useNavigate();

	return (
		<div className='header w-5/7 flex flex-row justify-between items-center px-8 py-8 mx-auto'>
			<img src='src\assets\logo_text.svg' alt='' />
			<nav className='w-50 flex justify-between gap-4'>
				<Button variant='outline' onClick={() => navigate("/login")}>
					Login
				</Button>
				<Button variant='outline_primary' onClick={() => navigate("/register")}>
					Register
				</Button>
			</nav>
		</div>
	);
}

export default PublicHeader;

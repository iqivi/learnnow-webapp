// components/layouts/PublicLayout.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../ui/dialog";
import { Toaster } from "../ui/sonner";
import PublicHeader from "../elements/PublicHeader";
import Footer from "../elements/Footer";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

function PublicLayout() {
	const location = useLocation();
	const navigate = useNavigate();

	const showLogin = location.pathname === "/login";
	const showRegister = location.pathname === "/register";

	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-[var(--main-green)] flex flex-col'>
			<Toaster position='top-center' />
			<PublicHeader />

			{/* Tu renderują się strony (Menu, etc) */}
			<main className='flex-1'>
				<Outlet />
			</main>

			<Footer />

			{/* Modalne Login/Register */}
			<Dialog open={showLogin} onOpenChange={open => !open && navigate("/")}>
				<DialogContent>
					<Login />
				</DialogContent>
			</Dialog>

			<Dialog open={showRegister} onOpenChange={open => !open && navigate("/")}>
				<DialogContent>
					<Register />
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default PublicLayout;

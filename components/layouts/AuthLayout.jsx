// components/layouts/AuthLayout.jsx
import { Outlet} from "react-router-dom";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import AuthenticatedHeader from "../elements/AuthenticatedHeader";
// import { Dialog, DialogContent } from "../ui/dialog";
import Footer from "../elements/Footer";
// import Profile from "../../pages/Profile";
// import Settings from "../../pages/Settings";
// import Support from "../../pages/Support";

function AuthLayout() {
	// const location = useLocation();
	// const navigate = useNavigate();
	// const showProfile = location.pathname === "/profile";
	// const showSettings = location.pathname === "/settings";
	// const showSupport = location.pathname === "/support";
	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-[var(--main-green)] flex flex-col'>
			<Toaster position='top-center' />
			<AuthenticatedHeader />

			{/* Tu renderują się strony (Dashboard, MyCourses, etc) */}
			<main className='flex-1'>
				<Outlet />
			</main>

			{/* <Dialog
				open={showProfile}
				onOpenChange={open => !open && navigate("/dashboard")}>
				<DialogContent>
					<Profile />
				</DialogContent>
			</Dialog>

			<Dialog
				open={showSettings}
				onOpenChange={open => !open && navigate("/dashboard")}>
				<DialogContent>
					<Settings />
				</DialogContent>
			</Dialog>

			<Dialog
				open={showSupport}
				onOpenChange={open => !open && navigate("/dashboard")}>
				<DialogContent>
					<Support />
				</DialogContent>
			</Dialog> */}

			<Footer />
		</div>
	);
}

export default AuthLayout;

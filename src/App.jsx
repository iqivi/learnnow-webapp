// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useAuth } from "../hooks/useAuth";

import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layouts
import PublicLayout from "../components/layouts/PublicLayout";
import AuthLayout from "../components/layouts/AuthLayout";

// Pages
import PublicMenu from "../pages/PublicMenu";
import Dashboard from "../pages/Dashboard";
import CourseLibrary from "../pages/CourseLibrary";
import CourseView from "../pages/DashboardCourseCard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Support from "../pages/Support";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Publiczne strony - z PublicLayout */}
				<Route element={<PublicRoute />}>
					<Route element={<PublicLayout />}>
						<Route path='/' element={<PublicMenu />} />
						<Route path='/login' element={<PublicMenu />} />{" "}
						{/* Modal nad Menu */}
						<Route path='/register' element={<PublicMenu />} />{" "}
						{/* Modal nad Menu */}
					</Route>
				</Route>

				{/* Chronione strony - z AuthLayout */}
				<Route element={<ProtectedRoute />}>
					<Route element={<AuthLayout />}>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/library' element={<CourseLibrary />} />
						<Route path='/course/:id' element={<CourseView />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/support' element={<Support />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
// Chronione ścieżki - tylko dla zalogowanych
function ProtectedRoute() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				Ładowanie...
			</div>
		);
	}

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}

// Publiczne ścieżki - przekieruj zalogowanych na dashboard
function PublicRoute() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				Ładowanie...
			</div>
		);
	}

	// Jeśli zalogowany, przekieruj na dashboard
	return !isAuthenticated ? <Outlet /> : <Navigate to='/dashboard' replace />;
}

export default App;

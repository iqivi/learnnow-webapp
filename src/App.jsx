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
import { useAuth } from "./context/AuthContext";
import { CourseProgressProvider } from "./context/CourseProgressContext";

// Layouts
import { PublicLayout, AuthLayout } from "@/components/layouts";

// Pages
import {
	PublicMenu,
	Dashboard,
	CourseLibrary,
	AdminPanel,
	AuthorPanel,
	CourseEditor,
	CoursePreviewPage,
	CoursePlayerPage,
} from "@/pages";

function App() {
	return (
		<CourseProgressProvider>
			<BrowserRouter>
				<Routes>
					{/* public pages */}
					<Route element={<PublicRoute />}>
						<Route element={<PublicLayout />}>
							<Route path='/' element={<PublicMenu />} />
							<Route path='/login' element={<PublicMenu />} />{" "}
							{/* Modal nad Menu */}
							<Route path='/register' element={<PublicMenu />} />{" "}
							{/* Modal nad Menu */}
						</Route>
					</Route>

					{/* protected pages */}
					<Route element={<ProtectedRoute />}>
						<Route element={<AuthLayout />}>
							<Route path='/dashboard' element={<Dashboard />} />
							<Route path='/library' element={<CourseLibrary />} />
							<Route path='/admin' element={<AdminPanel />} />
							<Route path='/author' element={<AuthorPanel />} />
							<Route
								path='/author/courses/:courseId/edit'
								element={<CourseEditor />}
							/>
							<Route path='/author/courses/new' element={<CourseEditor />} />
							<Route
								path='/author/courses/:courseId/preview'
								element={<CoursePreviewPage />}
							/>
							<Route
								path='/course/:courseId/watch'
								element={<CoursePlayerPage />}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</CourseProgressProvider>
	);
}
// protected paths
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

// public paths
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

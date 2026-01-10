import {
	Outlet,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { Toaster } from "@/components/ui";
import { toast } from "sonner";
import { AuthenticatedHeader, Footer } from "@/components/elements";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Profile, Settings, Support } from "@/pages";
import { CourseDetailsModal } from "../elements/CourseDetailsModal";
import { useState, useEffect } from "react";

export function AuthLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const modalType = searchParams.get("modal");
	const courseId = searchParams.get("courseId");

	const showProfile = modalType === "profile";
	const showSettings = modalType === "settings";
	const showSupport = modalType === "support";
	const showCourse = modalType === "course";

	const isModalOpen = showProfile || showSettings || showSupport || showCourse;

	// Stan dla wybranego kursu
	const [selectedCourse, setSelectedCourse] = useState(null);

	// Pobierz dane kursu gdy courseId się zmieni
	useEffect(() => {
		if (courseId && showCourse) {
			// OPCJA 1: Pobierz z API
			// fetch(`/api/courses/${courseId}`)
			//     .then(res => res.json())
			//     .then(data => setSelectedCourse(data));

			// OPCJA 2: Pobierz z location.state (jeśli przekazaliśmy)
			if (location.state?.course) {
				setSelectedCourse(location.state.course);
			}
		} else {
			setSelectedCourse(null);
		}
	}, [courseId, showCourse, location.state]);

	const closeModal = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete("modal");
		newSearchParams.delete("courseId");
		const newSearch = newSearchParams.toString();
		navigate(
			`${location.pathname}${newSearch ? `?${newSearch}` : ""}`,
			{ replace: true, state: {} } // Wyczyść też state
		);
		setSelectedCourse(null);
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-[var(--main-green)] flex flex-col'>
			<Toaster position='top-center' />
			<AuthenticatedHeader />

			<main
				className={`flex-1 transition-opacity duration-200 ${
					isModalOpen ? "opacity-50 pointer-events-none" : ""
				}`}>
				<Outlet />
			</main>

			{/* Profile Modal */}
			<Dialog open={showProfile} onOpenChange={open => !open && closeModal()}>
				<DialogContent className='max-w-2xl'>
					<Profile />
				</DialogContent>
			</Dialog>

			{/* Settings Modal */}
			<Dialog open={showSettings} onOpenChange={open => !open && closeModal()}>
				<DialogContent className='max-w-3xl'>
					<Settings />
				</DialogContent>
			</Dialog>

			{/* Support Modal */}
			<Dialog open={showSupport} onOpenChange={open => !open && closeModal()}>
				<DialogContent className='max-w-xl'>
					<Support />
				</DialogContent>
			</Dialog>

			{/* Course Details Modal */}
			<Dialog open={showCourse} onOpenChange={open => !open && closeModal()}>
				<DialogContent className='max-w-4xl max-h-[100vh] overflow-y-auto dialog-subtle-scrollbar'>
					<DialogHeader>
						<DialogTitle className='sr-only'>Szczegóły kursu</DialogTitle>
					</DialogHeader>
					{selectedCourse ? (
						<CourseDetailsModal course={selectedCourse} />
					) : (
						<div className='flex items-center justify-center py-12'>
							<div className='text-center'>
								<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
								<p className='text-gray-600'>Ładowanie kursu...</p>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>

			<Footer />
		</div>
	);
}

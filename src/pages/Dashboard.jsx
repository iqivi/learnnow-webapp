// import { useAuth } from "../context/AuthContext";
import { CoursePreview, CourseCard, FilterBar } from "@/components/elements";
import { Button } from "@/components/ui";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export function Dashboard() {
	// const { user } = useAuth();

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const activeTab = searchParams.get("view") || "my-courses";
	// "my-courses" lub "library"
	const courses = [
		{
			id: 1,
			title: "Kompletny kurs JavaScript od podstaw do zaawansowanych",
			description:
				"Naucz się JavaScript od zera. Obejmuje ES6+, asynchroniczność, DOM manipulation i wiele więcej.",
			thumbnail:
				"https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=450&fit=crop",
			instructor: "Jan Kowalski",
			instructorAvatar: "https://i.pravatar.cc/150?img=12",
			duration: 720,
			studentsCount: 15420,
			rating: 4.8,
			reviewsCount: 3241,
			price: 199,
			level: "Średniozaawansowany",
			category: "Programowanie",
			lessonsCount: 156,
			isEnrolled: false,
		},
		{
			id: 2,
			title: "React.js - Tworzenie nowoczesnych aplikacji webowych",
			description:
				"Kompletny przewodnik po React.js. Hooks, Context API, React Router i najlepsze praktyki.",
			thumbnail:
				"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
			instructor: "Anna Nowak",
			instructorAvatar: "https://i.pravatar.cc/150?img=5",
			duration: 540,
			studentsCount: 8932,
			rating: 4.9,
			reviewsCount: 1876,
			price: 249,
			level: "Zaawansowany",
			category: "Frontend",
			lessonsCount: 98,
			isEnrolled: true,
			progress: 65,
		},
		{
			id: 3,
			title: "Wprowadzenie do Python - Programowanie dla początkujących",
			description:
				"Najlepszy kurs Python dla początkujących. Podstawy, struktury danych i programowanie obiektowe.",
			thumbnail:
				"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
			instructor: "Piotr Wiśniewski",
			duration: 480,
			studentsCount: 23451,
			rating: 4.7,
			reviewsCount: 5621,
			price: 0,
			level: "Początkujący",
			category: "Programowanie",
			lessonsCount: 124,
			isEnrolled: false,
		},
		{
			id: 4,
			title: "Node.js i Express - Backend Development",
			description:
				"Buduj potężne aplikacje backendowe z Node.js i Express. REST API, bazy danych i autentykacja.",
			thumbnail:
				"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
			instructor: "Tomasz Zieliński",
			duration: 600,
			studentsCount: 11234,
			rating: 4.8,
			reviewsCount: 2456,
			price: 229,
			level: "Średniozaawansowany",
			category: "Backend",
			lessonsCount: 89,
			isEnrolled: true,
			progress: 30,
		},
		{
			id: 5,
			title: "UI/UX Design - Projektowanie interfejsów użytkownika",
			description:
				"Poznaj zasady projektowania UX/UI. Figma, prototypowanie i testowanie użyteczności.",
			thumbnail:
				"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
			instructor: "Maria Lewandowska",
			instructorAvatar: "https://i.pravatar.cc/150?img=9",
			duration: 360,
			studentsCount: 6789,
			rating: 4.6,
			reviewsCount: 1234,
			price: 179,
			level: "Początkujący",
			category: "Design",
			lessonsCount: 67,
			isEnrolled: false,
		},
	];

	// Dane dla CoursePreview (ostatnio oglądany kurs)
	const lastCourse = {
		id: 2,
		title: "React.js - Tworzenie nowoczesnych aplikacji webowych",
		description:
			"Kompletny przewodnik po React.js. Hooks, Context API, React Router i najlepsze praktyki.",
		thumbnail:
			"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
		progress: 65,
		totalLessons: 98,
		completedLessons: 64,
		duration: 540,
		lastWatched: "Lekcja 64: useCallback i useMemo",
	};

	const filteredCourses = courses.filter(course => {
		if (activeTab === "my-courses") {
			return course.isEnrolled === true;
		} else {
			return course.isEnrolled === false;
		}
	});
	const enrolledCourses = courses.filter(c => c.isEnrolled);

	const handleTabChange = tab => {
		setSearchParams({ view: tab });
	};

	// Otwórz modal z detalami kursu
	const handleCourseClick = courseId => {
		console.log("Kliknięto kurs:", courseId);

		const course = courses.find(c => c.id === courseId);

		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("modal", "course");
		newSearchParams.set("courseId", courseId);

		navigate(`${location.pathname}?${newSearchParams.toString()}`, {
			state: { course },
		});
	};

	const handleContinue = courseId => {
		navigate(`/course/${courseId}/watch`);
		console.log("Kontynuuj kurs:", courseId);
	};

	return (
		<div className='container mx-auto p-8'>
			<h1 className='text-2xl font-sm pb-5 uppercase'>Kontynuuj naukę</h1>
			<div className='lastCourse'>
				<CoursePreview />
			</div>
			<h2 className='text-xl font-sm py-5 uppercase'>Filtruj</h2>
			<FilterBar />
			<div className=' courseCard grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3 '>
				{" "}
				{courses.map(course => (
					<CourseCard
						key={course.id}
						{...course}
						onCardClick={handleCourseClick} // Modal
						onContinue={handleContinue} // Kontynuuj (tylko dla zapisanych)
					/>
				))}{" "}
			</div>
			<div className='courseCard'></div>
		</div>
	);
}

// export default Dashboard;

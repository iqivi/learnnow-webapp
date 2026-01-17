// import { useAuth } from "../context/AuthContext";
import { CoursePreview, CourseCard, FilterBar } from "@/components/elements";
import { Button } from "@/components/ui";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useCourseProgress } from "@/hooks";

export function Dashboard() {
	// const { user } = useAuth();

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { getCourseProgress } = useCourseProgress();
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
			level: "Średni",
			category: "Frontend",
			lessonsCount: 156,
			isEnrolled: true,
			progress: 45,
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
			level: "Ekspert",
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
			level: "Początkujący",
			category: "Frontend",
			lessonsCount: 124,
			isEnrolled: true,
			progress: 20,
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
			level: "Średni",
			category: "Bazy danych",
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
			level: "Początkujący",
			category: "Frontend",
			lessonsCount: 67,
			isEnrolled: true,
			progress: 85,
		},
		{
			id: 6,
			title: "Cyberbezpieczeństwo - Zagrożenia i ochrona",
			description:
				"Poznaj fundamenty cyberbezpieczeństwa. Jak chronić swoje systemy przed zagrożeniami.",
			thumbnail:
				"https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Krzysztof Nowak",
			instructorAvatar: "https://i.pravatar.cc/150?img=33",
			duration: 420,
			studentsCount: 5234,
			rating: 4.7,
			reviewsCount: 892,
			level: "Średni",
			category: "Cyberbezpieczeństwo",
			lessonsCount: 76,
			isEnrolled: true,
			progress: 50,
		},
		{
			id: 7,
			title: "SQL i relacyjne bazy danych",
			description:
				"Kompletny kurs SQL. Zapytania, indeksy, optymalizacja i wiele praktycznych przykładów.",
			thumbnail:
				"https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Magdalena Kowalska",
			instructorAvatar: "https://i.pravatar.cc/150?img=47",
			duration: 550,
			studentsCount: 12890,
			rating: 4.8,
			reviewsCount: 2134,
			level: "Początkujący",
			category: "Bazy danych",
			lessonsCount: 105,
			isEnrolled: true,
			progress: 100,
		},
		{
			id: 8,
			title: "Zaawansowane bezpieczeństwo sieciowe",
			description:
				"Zaawansowany kurs o bezpieczeństwie sieci, firewallach i atakach sieciowych.",
			thumbnail:
				"https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Andrzej Lewandowski",
			instructorAvatar: "https://i.pravatar.cc/150?img=15",
			duration: 780,
			studentsCount: 3456,
			rating: 4.9,
			reviewsCount: 621,
			level: "Ekspert",
			category: "Cyberbezpieczeństwo",
			lessonsCount: 142,
			isEnrolled: true,
			progress: 0,
		},
		{
			id: 9,
			title: "Vue.js - Progressive Framework",
			description:
				"Nauczym Cię pracować z Vue.js. Komponenty, reactive data, routing i state management.",
			thumbnail:
				"https://images.unsplash.com/photo-1653387141060-9a9834f47777?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Katarzyna Szymańska",
			instructorAvatar: "https://i.pravatar.cc/150?img=22",
			duration: 480,
			studentsCount: 7123,
			rating: 4.6,
			reviewsCount: 1245,
			level: "Średni",
			category: "Frontend",
			lessonsCount: 92,
			isEnrolled: true,
			progress: 15,
		},
		{
			id: 10,
			title: "MongoDB - NoSQL bazy danych",
			description:
				"Naucz się pracować z bazami danych NoSQL. MongoDB, dokumenty, agregacje i wiele więcej.",
			thumbnail:
				"https://images.unsplash.com/photo-1658204238967-3a81a063d162?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Paweł Dabrowski",
			instructorAvatar: "https://i.pravatar.cc/150?img=28",
			duration: 420,
			studentsCount: 9876,
			rating: 4.7,
			reviewsCount: 1834,
			level: "Początkujący",
			category: "Bazy danych",
			lessonsCount: 81,
			isEnrolled: true,
			progress: 35,
		},
		{
			id: 11,
			title: "Penetration Testing - Praktyczne podejście",
			description:
				"Zaawansowany kurs o testach penetracyjnych i etycznym hackowaniu.",
			thumbnail:
				"https://images.unsplash.com/photo-1761497723235-568a796506cf?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Marcin Sikora",
			instructorAvatar: "https://i.pravatar.cc/150?img=41",
			duration: 900,
			studentsCount: 2345,
			rating: 4.9,
			reviewsCount: 456,
			level: "Ekspert",
			category: "Cyberbezpieczeństwo",
			lessonsCount: 167,
			isEnrolled: true,
			progress: 42,
		},
		{
			id: 12,
			title: "TypeScript - Programowanie typowane",
			description:
				"Przejdź z JavaScript na TypeScript. Typy, interfejsy, generyki i zaawansowane koncepty.",
			thumbnail:
				"https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			instructor: "Zofia Nowak",
			instructorAvatar: "https://i.pravatar.cc/150?img=18",
			duration: 520,
			studentsCount: 11234,
			rating: 4.8,
			reviewsCount: 2098,
			level: "Średni",
			category: "Frontend",
			lessonsCount: 97,
			isEnrolled: true,
			progress: 72,
		},
	];

	// Zaktualizuj progress dla każdego kursu na podstawie danych z contextu
	const enrolledCourses = courses
		.filter(c => c.isEnrolled)
		.map(course => ({
			...course,
			progress: getCourseProgress(course.id, course.lessonsCount),
		}));

	// Przygotuj dane dla CoursePreview (pierwszy kurs z tablicy)
	const coursePreviewData =
		enrolledCourses.length > 0
			? {
					...enrolledCourses[0],
					totalLessons: enrolledCourses[0].lessonsCount,
					completedLessons: Math.round(
						((enrolledCourses[0].progress || 0) *
							enrolledCourses[0].lessonsCount) /
							100
					),
					lastWatched: `Lekcja ${Math.round(
						((enrolledCourses[0].progress || 0) *
							enrolledCourses[0].lessonsCount) /
							100
					)}: Kontynuuj naukę`,
			  }
			: null;

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

	// Funkcja do filtrowania kursów
	const getFilteredCourses = () => {
		return enrolledCourses.filter(course => {
			const selectedCategory = searchParams.get("category");
			const selectedProgress = searchParams.get("progress");
			const selectedLevel = searchParams.get("level");

			// Filtr kategorii
			if (selectedCategory && course.category !== selectedCategory) {
				return false;
			}

			// Filtr trudności
			if (selectedLevel && course.level !== selectedLevel) {
				return false;
			}

			// Filtr postępu
			if (selectedProgress) {
				if (selectedProgress === "Nierozpoczęte" && course.progress !== 0) {
					return false;
				}
				if (
					selectedProgress === "W trakcie" &&
					(course.progress === 0 || course.progress === 100)
				) {
					return false;
				}
				if (selectedProgress === "Ukończone" && course.progress !== 100) {
					return false;
				}
			}

			return true;
		});
	};

	const filteredCourses = getFilteredCourses();

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 text-left'>
			<h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold pb-4 sm:pb-5 uppercase'>
				Kontynuuj
			</h1>
			<div className='lastCourse mb-8 sm:mb-10'>
				{coursePreviewData && (
					<CoursePreview {...coursePreviewData} onContinue={handleContinue} />
				)}
			</div>
			<h2 className='text-lg sm:text-xl lg:text-2xl font-semibold py-4 sm:py-5 uppercase'>
				Filtruj
			</h2>
			<FilterBar
				searchParams={searchParams}
				setSearchParams={setSearchParams}
			/>
			<div className='courseCard grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{filteredCourses.length > 0 ? (
					filteredCourses.map(course => (
						<CourseCard
							key={course.id}
							{...course}
							onCardClick={handleCourseClick} // Modal
							onContinue={handleContinue} // Kontynuuj (tylko dla zapisanych)
						/>
					))
				) : (
					<div className='col-span-full mt-8 text-center'>
						<p className='text-gray-500 text-lg'>
							Brak kursów spełniających wybrane kryteria.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

// export default Dashboard;

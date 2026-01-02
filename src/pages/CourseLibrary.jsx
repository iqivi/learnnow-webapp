import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CourseCard, FilterBar } from "@/components/elements";

export function CourseLibrary() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

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
			isEnrolled: false, // NIE kupiony
		},
		{
			id: 3,
			title: "Wprowadzenie do Python - Programowanie dla początkujących",
			description:
				"Najlepszy kurs Python dla początkujących. Podstawy, struktury danych i programowanie obiektowe.",
			thumbnail:
				"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
			instructor: "Piotr Wiśniewski",
			instructorAvatar: "https://i.pravatar.cc/150?img=13",
			duration: 480,
			studentsCount: 23451,
			rating: 4.7,
			reviewsCount: 5621,
			price: 0, // DARMOWY
			level: "Początkujący",
			category: "Programowanie",
			lessonsCount: 124,
			isEnrolled: false,
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
		{
			id: 6,
			title: "Cyberbezpieczeństwo - Ethical Hacking",
			description:
				"Dowiedz się jak chronić systemy i aplikacje. Testy penetracyjne i zabezpieczenia sieciowe.",
			thumbnail:
				"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
			instructor: "Marcin Kamiński",
			instructorAvatar: "https://i.pravatar.cc/150?img=15",
			duration: 840,
			studentsCount: 4521,
			rating: 4.9,
			reviewsCount: 987,
			price: 349,
			level: "Zaawansowany",
			category: "Bezpieczeństwo",
			lessonsCount: 142,
			isEnrolled: false,
		},
		{
			id: 7,
			title: "Docker i Kubernetes - DevOps w praktyce",
			description:
				"Konteneryzacja aplikacji, orkiestracja, CI/CD pipelines i automatyzacja deploymentów.",
			thumbnail:
				"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=450&fit=crop",
			instructor: "Tomasz Nowicki",
			instructorAvatar: "https://i.pravatar.cc/150?img=18",
			duration: 660,
			studentsCount: 8234,
			rating: 4.8,
			reviewsCount: 1543,
			price: 279,
			level: "Zaawansowany",
			category: "DevOps",
			lessonsCount: 112,
			isEnrolled: false,
		},
		{
			id: 8,
			title: "SQL i Bazy Danych - Od podstaw do optymalizacji",
			description:
				"PostgreSQL, MySQL, projektowanie schematów, zapytania, indeksy, transakcje i optymalizacja.",
			thumbnail:
				"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop",
			instructor: "Katarzyna Zielińska",
			instructorAvatar: "https://i.pravatar.cc/150?img=20",
			duration: 540,
			studentsCount: 12450,
			rating: 4.7,
			reviewsCount: 2341,
			price: 199,
			level: "Średniozaawansowany",
			category: "Bazy Danych",
			lessonsCount: 95,
			isEnrolled: false,
		},
		{
			id: 9,
			title: "Machine Learning z Python",
			description:
				"Scikit-learn, TensorFlow, sieci neuronowe, klasyfikacja, regresja i deep learning.",
			thumbnail:
				"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
			instructor: "Dr Adam Kowalczyk",
			instructorAvatar: "https://i.pravatar.cc/150?img=22",
			duration: 900,
			studentsCount: 6789,
			rating: 4.9,
			reviewsCount: 1876,
			price: 399,
			level: "Zaawansowany",
			category: "AI & ML",
			lessonsCount: 156,
			isEnrolled: false,
		},
		{
			id: 10,
			title: "WordPress - Tworzenie stron i sklepów",
			description:
				"WooCommerce, motywy, wtyczki, SEO, bezpieczeństwo i optymalizacja WordPressa.",
			thumbnail:
				"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop",
			instructor: "Monika Wiśniewska",
			instructorAvatar: "https://i.pravatar.cc/150?img=25",
			duration: 420,
			studentsCount: 9876,
			rating: 4.5,
			reviewsCount: 1234,
			price: 149,
			level: "Początkujący",
			category: "CMS",
			lessonsCount: 78,
			isEnrolled: false,
		},
	];

	return (
		<div className='container mx-auto p-8'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-4xl font-bold text-gray-900 mb-2'>
					Biblioteka kursów
				</h1>
				<p className='text-lg text-gray-600'>
					Odkryj ponad {courses.length} kursów i rozwijaj swoje umiejętności
				</p>
			</div>

			{/* Filtry */}
			<div className='mb-8'>
				<h2 className='text-xl font-sm py-5 uppercase'>Filtruj kursy</h2>
				<FilterBar />
			</div>

			{/* Grid kursów */}
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{courses.map(course => (
					<CourseCard
						key={course.id}
						{...course}
						onCardClick={handleCourseClick}
					/>
				))}
			</div>

			{/* Empty state (na wypadek gdy filtry nic nie znajdą) */}
			{courses.length === 0 && (
				<div className='flex flex-col items-center justify-center py-16 text-center'>
					<div className='rounded-full bg-gray-100 p-6 mb-4'>
						<svg
							className='h-16 w-16 text-gray-400'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</div>
					<h3 className='text-xl font-semibold text-gray-900 mb-2'>
						Nie znaleziono kursów
					</h3>
					<p className='text-gray-600'>
						Spróbuj zmienić filtry lub wyszukaj inną frazę
					</p>
				</div>
			)}
		</div>
	);
}

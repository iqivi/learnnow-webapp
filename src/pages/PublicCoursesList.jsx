import React from "react";
import { CourseDemo } from "@/components/elements";
import { useNavigate } from "react-router-dom";

export function PublicCoursesList() {
	const navigate = useNavigate();

	// Przykładowe kursy do pokazania niezalogowanym userom
	const demoCoursesData = [
		{
			id: 1,
			title: "Kurs cyberbezpieczeństwa dla każdego",
			description:
				"Bez ogródek i lania wody! Poznaj podstawy cyberbezpieczeństwa i naucz się chronić swoje dane.",
			thumbnail: "src/assets/course_img.svg",
			instructor: "Jan Kowalski",
			instructorAvatar: "https://i.pravatar.cc/150?img=12",
			duration: 720,
			studentsCount: 1250,
			rating: 4.8,
			reviewsCount: 245,
			price: 199,
			totalLessons: 45,
			level: "Początkujący",
			category: "Bezpieczeństwo",
		},
		{
			id: 2,
			title: "React.js - Tworzenie nowoczesnych aplikacji",
			description:
				"Kompletny przewodnik po React.js. Hooks, Context API, React Router i najlepsze praktyki.",
			thumbnail:
				"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
			instructor: "Anna Nowak",
			instructorAvatar: "https://i.pravatar.cc/150?img=5",
			duration: 540,
			studentsCount: 3420,
			rating: 4.9,
			reviewsCount: 876,
			price: 249,
			totalLessons: 98,
			level: "Średniozaawansowany",
			category: "Frontend",
		},
		{
			id: 3,
			title: "Python dla początkujących",
			description:
				"Najlepszy kurs Python dla początkujących. Podstawy, struktury danych i programowanie obiektowe.",
			thumbnail:
				"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
			instructor: "Piotr Wiśniewski",
			duration: 480,
			studentsCount: 5600,
			rating: 4.7,
			reviewsCount: 1234,
			price: 0, // Darmowy
			totalLessons: 124,
			level: "Początkujący",
			category: "Programowanie",
		},
		{
			id: 4,
			title: "UI/UX Design - Projektowanie interfejsów",
			description:
				"Poznaj zasady projektowania UX/UI. Figma, prototypowanie i testowanie użyteczności.",
			thumbnail:
				"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
			instructor: "Maria Lewandowska",
			instructorAvatar: "https://i.pravatar.cc/150?img=9",
			duration: 360,
			studentsCount: 2100,
			rating: 4.6,
			reviewsCount: 456,
			price: 179,
			totalLessons: 67,
			level: "Początkujący",
			category: "Design",
		},
		{
			id: 5,
			title: "Node.js i Express - Backend Development",
			description:
				"Buduj potężne aplikacje backendowe z Node.js i Express. REST API, bazy danych i autentykacja.",
			thumbnail:
				"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
			instructor: "Tomasz Zieliński",
			duration: 600,
			studentsCount: 2890,
			rating: 4.8,
			reviewsCount: 678,
			price: 229,
			totalLessons: 89,
			level: "Zaawansowany",
			category: "Backend",
		},
	];

	const handleEnroll = courseId => {
		console.log("Zapisz się do kursu:", courseId);
		// Przekieruj do logowania/rejestracji
		navigate(`/register?redirect=/course/${courseId}`);
	};

	const handleViewDetails = courseId => {
		console.log("Zobacz szczegóły kursu:", courseId);
		// Możesz mieć publiczną stronę szczegółów kursu
		// navigate(`/courses/${courseId}`);
	};

	return (
		<div className='content'>
			<div className='flex flex-col gap-6 justify-around p-8 w-6/7 mx-auto'>
				<div className='example_courses text-left'>
					<h1 className='text-4xl font-bold mb-2'>Przykładowe kursy</h1>
					<p className='text-lg text-gray-600'>
						Odkryj nasze najpopularniejsze kursy i rozpocznij naukę już dziś
					</p>
				</div>

				<div className='example_list flex flex-col gap-6'>
					{demoCoursesData.map(course => (
						<CourseDemo
							key={course.id}
							{...course}
							onEnroll={handleEnroll}
							onViewDetails={handleViewDetails}
						/>
					))}
				</div>

				{/* Call to Action */}
				<div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center mt-8'>
					<h2 className='text-2xl font-bold mb-3'>
						Gotowy na rozpoczęcie nauki?
					</h2>
					<p className='text-gray-600 mb-6'>
						Dołącz do tysięcy studentów i rozwijaj swoje umiejętności
					</p>
					<div className='flex gap-4 justify-center'>
						<button
							onClick={() => navigate("/register")}
							className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors'>
							Zarejestruj się za darmo
						</button>
						<button
							onClick={() => navigate("/login")}
							className='bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg border border-gray-300 transition-colors'>
							Zaloguj się
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

// import React from "react";
// import { CoursePreview } from "@/components/elements";

// export function PublicCoursesList() {
// 	return (
// 		<div className='content'>
// 			<div className='flex flex-col gap-6 justify-around p-8 w-6/7 mx-auto '>
// 				<div className='example_courses text-left text-4xl font-bold'>
// 					<h1>Przykładowe kursy</h1>
// 				</div>
// 				<div className='example_list'></div>
// 				<CoursePreview />
// 				<CoursePreview />
// 				<CoursePreview />
// 				<CoursePreview />
// 				<CoursePreview />
// 			</div>
// 		</div>
// 	);
// }

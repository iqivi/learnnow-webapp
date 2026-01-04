import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Play,
	FileText,
	ChevronRight,
	Clock,
	BookOpen,
	Star,
	Users,
	CheckCircle,
	Lock,
} from "lucide-react";

export function CoursePreviewPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	// Przykładowe dane kursu
	const course = {
		id: courseId,
		title: "React.js - Tworzenie nowoczesnych aplikacji",
		description:
			"Kompletny przewodnik po React.js. Nauczysz się tworzyć nowoczesne aplikacje webowe, zrozumiesz Hooks, Context API, React Router i najlepsze praktyki używane w przemyśle.",
		thumbnail:
			"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
		instructor: "Anna Nowak",
		instructorAvatar: "https://i.pravatar.cc/150?img=5",
		category: "Frontend",
		level: "Zaawansowany",
		price: 249,
		rating: 4.9,
		reviewsCount: 213,
		studentsCount: 847,
		totalDuration: 540, // minuty
		lessons: [
			{
				id: 1,
				type: "video",
				title: "Wprowadzenie do React",
				content: "https://youtube.com/watch?v=...",
				duration: 15,
				order: 1,
			},
			{
				id: 2,
				type: "video",
				title: "Instalacja i konfiguracja",
				content: "https://youtube.com/watch?v=...",
				duration: 20,
				order: 2,
			},
			{
				id: 3,
				type: "text",
				title: "Czym jest JSX?",
				content:
					"JSX to rozszerzenie składni JavaScript, które pozwala pisać kod przypominający HTML wewnątrz plików JavaScript. Jest to podstawowa koncepcja w React...",
				order: 3,
			},
			{
				id: 4,
				type: "video",
				title: "Twój pierwszy komponent",
				content: "https://youtube.com/watch?v=...",
				duration: 25,
				order: 4,
			},
			{
				id: 5,
				type: "video",
				title: "Props i State",
				content: "https://youtube.com/watch?v=...",
				duration: 30,
				order: 5,
			},
			{
				id: 6,
				type: "text",
				title: "Różnica między Props a State",
				content:
					"Props (properties) to dane przekazywane do komponentu z zewnątrz, podczas gdy State to wewnętrzny stan komponentu...",
				order: 6,
			},
			{
				id: 7,
				type: "video",
				title: "Hooks - useState",
				content: "https://youtube.com/watch?v=...",
				duration: 35,
				order: 7,
			},
			{
				id: 8,
				type: "video",
				title: "Hooks - useEffect",
				content: "https://youtube.com/watch?v=...",
				duration: 40,
				order: 8,
			},
		],
	};

	const [selectedLesson, setSelectedLesson] = useState(course.lessons[0]);

	const formatDuration = minutes => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	const backNavigation = () => {
		navigate(-1);
	};

	const totalLessons = course.lessons.length;
	const videoLessons = course.lessons.filter(l => l.type === "video").length;
	const textLessons = course.lessons.filter(l => l.type === "text").length;

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white border-b sticky top-0 z-10'>
				<div className='container mx-auto px-8 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div>
								<h1 className='text-xl font-bold text-gray-900'>
									Podgląd kursu
								</h1>
								<p className='text-sm text-gray-600'>{course.title}</p>
							</div>
						</div>
						<Button
							variant='outline_border'
							size='sm'
							// onClick={() => navigate("/author")}
							onClick={backNavigation}>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Powrót
						</Button>
					</div>
				</div>
			</div>

			<div className='container mx-auto p-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Główna zawartość - Player */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Player / Content Display */}
						<Card className='overflow-hidden'>
							{selectedLesson.type === "video" ? (
								<>
									{/* Video Player */}
									<div className='aspect-video bg-gray-900 flex items-center justify-center relative'>
										<img
											src={course.thumbnail}
											alt='Video thumbnail'
											className='w-full h-full object-cover opacity-50'
										/>
										<div className='absolute inset-0 flex items-center justify-center'>
											<div className='text-center'>
												<div className='bg-blue-600 rounded-full p-6 mx-auto mb-4 inline-flex'>
													<Play className='h-12 w-12 text-white' />
												</div>
												<p className='text-white text-lg font-semibold'>
													{selectedLesson.title}
												</p>
												<p className='text-gray-300 text-sm'>
													Kliknij aby odtworzyć
												</p>
											</div>
										</div>
									</div>
									{/* Video Controls Bar */}
									<div className='bg-gray-100 p-4 border-t'>
										<div className='flex items-center justify-between text-sm text-gray-600'>
											<span>0:00 / {selectedLesson.duration}:00</span>
											<div className='flex items-center gap-2'>
												<Clock className='h-4 w-4' />
												<span>{selectedLesson.duration} min</span>
											</div>
										</div>
									</div>
								</>
							) : (
								<>
									{/* Text Content Display */}
									<div className='p-8 bg-white min-h-[400px]'>
										<div className='flex items-center gap-3 mb-6'>
											<div className='p-3 rounded-lg bg-purple-100'>
												<FileText className='h-6 w-6 text-purple-600' />
											</div>
											<div>
												<h2 className='text-2xl font-bold text-gray-900'>
													{selectedLesson.title}
												</h2>
												<p className='text-sm text-gray-600'>
													Plansza tekstowa
												</p>
											</div>
										</div>
										<div className='prose prose-lg max-w-none'>
											<p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
												{selectedLesson.content}
											</p>
										</div>
									</div>
								</>
							)}
						</Card>

						{/* Lesson Info */}
						<Card className='p-6'>
							<h3 className='text-xl font-bold text-gray-900 mb-4'>
								{selectedLesson.title}
							</h3>
							<div className='flex items-center gap-4 text-sm text-gray-600 mb-4'>
								{selectedLesson.type === "video" ? (
									<>
										<div className='flex items-center gap-1'>
											<Play className='h-4 w-4' />
											<span>Lekcja wideo</span>
										</div>
										<div className='flex items-center gap-1'>
											<Clock className='h-4 w-4' />
											<span>{selectedLesson.duration} min</span>
										</div>
									</>
								) : (
									<div className='flex items-center gap-1'>
										<FileText className='h-4 w-4' />
										<span>Plansza tekstowa</span>
									</div>
								)}
							</div>

							{/* Navigation Buttons */}
							<div className='flex gap-3 pt-4 border-t'>
								<Button
									variant='outline'
									className='flex-1'
									disabled={selectedLesson.order === 1}
									onClick={() => {
										const prevLesson = course.lessons.find(
											l => l.order === selectedLesson.order - 1
										);
										if (prevLesson) setSelectedLesson(prevLesson);
									}}>
									← Poprzednia lekcja
								</Button>
								<Button
									variant='default'
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									disabled={selectedLesson.order === course.lessons.length}
									onClick={() => {
										const nextLesson = course.lessons.find(
											l => l.order === selectedLesson.order + 1
										);
										if (nextLesson) setSelectedLesson(nextLesson);
									}}>
									Następna lekcja →
								</Button>
							</div>
						</Card>

						{/* Course Description */}
						<Card className='p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-3'>
								O kursie
							</h3>
							<p className='text-gray-700 leading-relaxed'>
								{course.description}
							</p>

							<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t'>
								<div className='text-center'>
									<BookOpen className='h-6 w-6 text-blue-600 mx-auto mb-2' />
									<p className='text-2xl font-bold text-gray-900'>
										{totalLessons}
									</p>
									<p className='text-xs text-gray-600'>Lekcji</p>
								</div>
								<div className='text-center'>
									<Play className='h-6 w-6 text-purple-600 mx-auto mb-2' />
									<p className='text-2xl font-bold text-gray-900'>
										{videoLessons}
									</p>
									<p className='text-xs text-gray-600'>Filmów</p>
								</div>
								<div className='text-center'>
									<FileText className='h-6 w-6 text-green-600 mx-auto mb-2' />
									<p className='text-2xl font-bold text-gray-900'>
										{textLessons}
									</p>
									<p className='text-xs text-gray-600'>Plansz</p>
								</div>
								<div className='text-center'>
									<Clock className='h-6 w-6 text-orange-600 mx-auto mb-2' />
									<p className='text-2xl font-bold text-gray-900'>
										{formatDuration(course.totalDuration)}
									</p>
									<p className='text-xs text-gray-600'>Treści</p>
								</div>
							</div>
						</Card>
					</div>

					{/* Sidebar - Lekcje */}
					<div className='lg:col-span-1'>
						<Card className='sticky top-24'>
							<div className='p-4 border-b bg-gray-50'>
								<h3 className='font-semibold text-gray-900'>Zawartość kursu</h3>
								<p className='text-sm text-gray-600'>
									{totalLessons} lekcji • {formatDuration(course.totalDuration)}
								</p>
							</div>

							{/* Lista lekcji */}
							<div className='max-h-[600px] overflow-y-auto'>
								{course.lessons.map((lesson, index) => {
									const isActive = selectedLesson.id === lesson.id;
									const Icon = lesson.type === "video" ? Play : FileText;

									return (
										<button
											key={lesson.id}
											onClick={() => setSelectedLesson(lesson)}
											className={`
												w-full text-left p-4 border-b transition-colors
												${
													isActive
														? "bg-blue-50 border-l-4 border-l-blue-600"
														: "hover:bg-gray-50 border-l-4 border-l-transparent"
												}
											`}>
											<div className='flex items-start gap-3'>
												<div
													className={`
													p-2 rounded flex-shrink-0
													${
														isActive
															? lesson.type === "video"
																? "bg-blue-100"
																: "bg-purple-100"
															: "bg-gray-100"
													}
												`}>
													<Icon
														className={`
														h-4 w-4
														${
															isActive
																? lesson.type === "video"
																	? "text-blue-600"
																	: "text-purple-600"
																: "text-gray-600"
														}
													`}
													/>
												</div>
												<div className='flex-1 min-w-0'>
													<p
														className={`
														text-sm font-medium mb-1
														${isActive ? "text-blue-600" : "text-gray-900"}
													`}>
														{index + 1}. {lesson.title}
													</p>
													<div className='flex items-center gap-2 text-xs text-gray-600'>
														{lesson.type === "video" ? (
															<>
																<Play className='h-3 w-3' />
																<span>{lesson.duration} min</span>
															</>
														) : (
															<>
																<FileText className='h-3 w-3' />
																<span>Tekst</span>
															</>
														)}
													</div>
												</div>
												{isActive && (
													<ChevronRight className='h-5 w-5 text-blue-600 flex-shrink-0' />
												)}
											</div>
										</button>
									);
								})}
							</div>

							{/* Course Info Footer */}
							<div className='p-4 border-t bg-gray-50 space-y-3'>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>Kategoria:</span>
									<Badge variant='secondary'>{course.category}</Badge>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>Poziom:</span>
									<Badge variant='secondary'>{course.level}</Badge>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>Cena:</span>
									<span className='font-semibold text-gray-900'>
										{course.price === 0 ? "Darmowy" : `${course.price} zł`}
									</span>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

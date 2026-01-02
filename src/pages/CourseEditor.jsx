import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Save,
	ArrowLeft,
	Plus,
	Video,
	FileText,
	Trash2,
	GripVertical,
	Eye,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

export function CourseEditor() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const isNewCourse = !courseId || courseId === "new";

	// Stan kursu
	const [course, setCourse] = useState({
		title: "",
		description: "",
		thumbnail: "",
		category: "",
		level: "Początkujący",
		price: "",
		lessons: [], // Lista lekcji
	});

	const [isSaving, setIsSaving] = useState(false);

	// Typy lekcji
	const lessonTypes = {
		video: { label: "Film", icon: Video, color: "blue" },
		text: { label: "Plansza tekstowa", icon: FileText, color: "purple" },
	};

	// Dodaj nową lekcję
	const addLesson = type => {
		const newLesson = {
			id: Date.now(),
			type: type, // 'video' lub 'text'
			title: "",
			content: type === "video" ? "" : "", // URL dla video, tekst dla text
			duration: type === "video" ? 0 : null,
			order: course.lessons.length + 1,
			isExpanded: true,
		};

		setCourse({
			...course,
			lessons: [...course.lessons, newLesson],
		});
	};

	// Usuń lekcję
	const deleteLesson = lessonId => {
		if (confirm("Czy na pewno chcesz usunąć tę lekcję?")) {
			setCourse({
				...course,
				lessons: course.lessons.filter(l => l.id !== lessonId),
			});
			toast.success("Lekcja usunięta");
		}
	};

	// Zaktualizuj lekcję
	const updateLesson = (lessonId, field, value) => {
		setCourse({
			...course,
			lessons: course.lessons.map(lesson =>
				lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
			),
		});
	};

	// Toggle expand/collapse lekcji
	const toggleLessonExpand = lessonId => {
		setCourse({
			...course,
			lessons: course.lessons.map(lesson =>
				lesson.id === lessonId
					? { ...lesson, isExpanded: !lesson.isExpanded }
					: lesson
			),
		});
	};

	// Przenieś lekcję w górę
	const moveLessonUp = index => {
		if (index === 0) return;
		const newLessons = [...course.lessons];
		[newLessons[index - 1], newLessons[index]] = [
			newLessons[index],
			newLessons[index - 1],
		];
		setCourse({ ...course, lessons: newLessons });
	};

	// Przenieś lekcję w dół
	const moveLessonDown = index => {
		if (index === course.lessons.length - 1) return;
		const newLessons = [...course.lessons];
		[newLessons[index], newLessons[index + 1]] = [
			newLessons[index + 1],
			newLessons[index],
		];
		setCourse({ ...course, lessons: newLessons });
	};

	// Zapisz kurs
	const handleSave = async () => {
		// Walidacja
		if (!course.title.trim()) {
			toast.error("Wpisz tytuł kursu");
			return;
		}

		if (!course.description.trim()) {
			toast.error("Wpisz opis kursu");
			return;
		}

		if (course.lessons.length === 0) {
			toast.error("Dodaj przynajmniej jedną lekcję");
			return;
		}

		// Sprawdź czy wszystkie lekcje mają tytuł i zawartość
		const invalidLesson = course.lessons.find(
			l => !l.title.trim() || !l.content.trim()
		);
		if (invalidLesson) {
			toast.error("Wszystkie lekcje muszą mieć tytuł i zawartość");
			return;
		}

		setIsSaving(true);

		try {
			// API call
			// const response = await fetch(`/api/courses/${courseId || ''}`, {
			//     method: isNewCourse ? 'POST' : 'PUT',
			//     headers: { 'Content-Type': 'application/json' },
			//     body: JSON.stringify(course)
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 1500));

			toast.success(isNewCourse ? "Kurs utworzony!" : "Zmiany zapisane!");

			// Przekieruj do panelu autora
			navigate("/author");
		} catch (error) {
			toast.error("Nie udało się zapisać kursu");
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	// Podgląd kursu
	const handlePreview = () => {
		toast.info("Funkcja podglądu będzie dostępna wkrótce");
		// Można otworzyć modal z podglądem
	};

	return (
		<div className='container mx-auto p-8 max-w-5xl space-y-6'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div>
						<h1 className='text-3xl font-bold text-gray-900'>
							{isNewCourse ? "Utwórz nowy kurs" : "Edytuj kurs"}
						</h1>
						<p className='text-gray-600 text-sm mt-1'>
							{course.lessons.length} lekcji •{" "}
							{course.lessons.filter(l => l.type === "video").length} filmów •{" "}
							{course.lessons.filter(l => l.type === "text").length} plansz
							tekstowych
						</p>
					</div>
				</div>
				<div className='flex flex-col items-end w-100 gap-2'>
					<Button
						onClick={handleSave}
						disabled={isSaving}
						variant='outline_border'
						size='sm'>
						{isSaving ? (
							<>
								<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
								Zapisywanie...
							</>
						) : (
							<>
								<Save className='h-4 w-4 mr-2' />
								Zapisz kurs
							</>
						)}
					</Button>
					<Button
						variant='outline_border'
						size='sm'
						onClick={() => navigate("/author")}>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Powrót
					</Button>
				</div>
			</div>

			<Separator />

			{/* Podstawowe informacje o kursie */}
			<Card className='p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-4'>
					Podstawowe informacje
				</h2>

				<div className='space-y-4'>
					{/* Tytuł */}
					<div className='space-y-2'>
						<Label htmlFor='title'>Tytuł kursu *</Label>
						<Input
							id='title'
							placeholder='Np. React.js - Tworzenie nowoczesnych aplikacji'
							value={course.title}
							onChange={e => setCourse({ ...course, title: e.target.value })}
						/>
					</div>

					{/* Opis */}
					<div className='space-y-2'>
						<Label htmlFor='description'>Opis kursu *</Label>
						<textarea
							id='description'
							rows={4}
							placeholder='Opisz czego nauczy się student w tym kursie...'
							value={course.description}
							onChange={e =>
								setCourse({ ...course, description: e.target.value })
							}
							className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
						/>
					</div>

					{/* Grid - Thumbnail, Kategoria, Poziom */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='thumbnail'>URL miniaturki</Label>
							<Input
								id='thumbnail'
								placeholder='https://...'
								value={course.thumbnail}
								onChange={e =>
									setCourse({ ...course, thumbnail: e.target.value })
								}
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='category'>Kategoria</Label>
							<select
								id='category'
								value={course.category}
								onChange={e =>
									setCourse({ ...course, category: e.target.value })
								}
								className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
								<option value=''>Wybierz kategorię</option>
								<option value='Programowanie'>Programowanie</option>
								<option value='Frontend'>Frontend</option>
								<option value='Backend'>Backend</option>
								<option value='Design'>Design</option>
								<option value='DevOps'>DevOps</option>
								<option value='AI & ML'>AI & ML</option>
								<option value='Bezpieczeństwo'>Bezpieczeństwo</option>
							</select>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='level'>Poziom trudności</Label>
							<select
								id='level'
								value={course.level}
								onChange={e => setCourse({ ...course, level: e.target.value })}
								className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
								<option value='Początkujący'>Początkujący</option>
								<option value='Średniozaawansowany'>Średniozaawansowany</option>
								<option value='Zaawansowany'>Zaawansowany</option>
							</select>
						</div>
					</div>

					{/* Cena */}
					<div className='space-y-2'>
						<Label htmlFor='price'>Cena (zł)</Label>
						<Input
							id='price'
							type='number'
							placeholder='199'
							value={course.price}
							onChange={e => setCourse({ ...course, price: e.target.value })}
						/>
						<p className='text-xs text-gray-500'>Ustaw 0 dla kursu darmowego</p>
					</div>
				</div>
			</Card>

			<Separator />

			{/* Lekcje */}
			<div>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-xl font-semibold text-gray-900'>
						Treść kursu ({course.lessons.length} lekcji)
					</h2>
					<div className='flex flex-col items-end w-100 gap-2'>
						<Button
							variant='outline_border'
							size='sm'
							onClick={() => addLesson("video")}>
							<Video className='h-4 w-4 mr-2' />
							Dodaj film
						</Button>
						<Button
							variant='outline_border'
							size='sm'
							onClick={() => addLesson("text")}>
							<FileText className='h-4 w-4 mr-2' />
							Dodaj planszę tekstową
						</Button>
					</div>
				</div>

				{/* Lista lekcji */}
				{course.lessons.length === 0 ? (
					<Card className='p-12 text-center border-dashed'>
						<div className='flex flex-col items-center justify-center'>
							<div className='rounded-full bg-gray-100 p-4 mb-4'>
								<Plus className='h-8 w-8 text-gray-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Dodaj pierwszą lekcję
							</h3>
							<p className='text-gray-600 mb-6'>
								Możesz dodać film lub planszę tekstową
							</p>
							<div className='flex gap-2 justify-center'>
								<Button
									variant='outline_border'
									// size='sm'
									onClick={() => addLesson("video")}>
									<Video className='h-4 w-4 mr-2' />
									Dodaj film
								</Button>
								<Button
									variant='outline_border'
									// size='sm'
									onClick={() => addLesson("text")}>
									<FileText className='h-4 w-4 mr-2' />
									Dodaj planszę tekstową
								</Button>
							</div>
						</div>
					</Card>
				) : (
					<div className='space-y-3'>
						{course.lessons.map((lesson, index) => {
							const LessonIcon = lessonTypes[lesson.type].icon;
							const iconColor = lessonTypes[lesson.type].color;

							return (
								<Card key={lesson.id} className='overflow-hidden'>
									{/* Header lekcji */}
									<div
										className='flex items-center gap-3 p-4 bg-gray-50 border-b cursor-pointer hover:bg-gray-100 transition-colors'
										onClick={() => toggleLessonExpand(lesson.id)}>
										{/* Drag handle */}
										<GripVertical className='h-5 w-5 text-gray-400 flex-shrink-0' />

										{/* Ikona typu */}
										<div
											className={`p-2 rounded bg-${iconColor}-100 flex-shrink-0`}>
											<LessonIcon className={`h-4 w-4 text-${iconColor}-600`} />
										</div>

										{/* Tytuł lub placeholder */}
										<div className='flex-1 min-w-0'>
											<p className='font-medium text-gray-900 truncate'>
												{lesson.title || `Lekcja ${index + 1} (bez tytułu)`}
											</p>
											<p className='text-xs text-gray-500'>
												{lessonTypes[lesson.type].label}
												{lesson.type === "video" && lesson.duration > 0 && (
													<> • {lesson.duration} min</>
												)}
											</p>
										</div>

										{/* Expand button */}
										{lesson.isExpanded ? (
											<ChevronUp className='h-5 w-5 text-gray-400 flex-shrink-0' />
										) : (
											<ChevronDown className='h-5 w-5 text-gray-400 flex-shrink-0' />
										)}
									</div>

									{/* Content lekcji (collapsed/expanded) */}
									{lesson.isExpanded && (
										<div className='p-4 space-y-4'>
											{/* Tytuł lekcji */}
											<div className='space-y-2'>
												<Label>Tytuł lekcji *</Label>
												<Input
													placeholder='Np. Wprowadzenie do React Hooks'
													value={lesson.title}
													onChange={e =>
														updateLesson(lesson.id, "title", e.target.value)
													}
												/>
											</div>

											{/* Content - różny w zależności od typu */}
											{lesson.type === "video" ? (
												<>
													{/* URL wideo */}
													<div className='space-y-2'>
														<Label>URL filmu *</Label>
														<Input
															placeholder='https://youtube.com/... lub link do pliku MP4'
															value={lesson.content}
															onChange={e =>
																updateLesson(
																	lesson.id,
																	"content",
																	e.target.value
																)
															}
														/>
														<p className='text-xs text-gray-500'>
															YouTube, Vimeo lub bezpośredni link do pliku
														</p>
													</div>

													{/* Czas trwania */}
													<div className='space-y-2'>
														<Label>Czas trwania (minuty)</Label>
														<Input
															type='number'
															placeholder='15'
															value={lesson.duration || ""}
															onChange={e =>
																updateLesson(
																	lesson.id,
																	"duration",
																	parseInt(e.target.value) || 0
																)
															}
														/>
													</div>
												</>
											) : (
												<>
													{/* Treść tekstowa */}
													<div className='space-y-2'>
														<Label>Treść planszy *</Label>
														<textarea
															rows={8}
															placeholder='Wpisz treść lekcji tekstowej...'
															value={lesson.content}
															onChange={e =>
																updateLesson(
																	lesson.id,
																	"content",
																	e.target.value
																)
															}
															className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono'
														/>
														<p className='text-xs text-gray-500'>
															Możesz używać Markdown do formatowania
														</p>
													</div>
												</>
											)}

											{/* Akcje */}
											<div className='flex items-center justify-between pt-3 border-t'>
												<div className='flex gap-2'>
													<Button
														size='sm'
														variant='outline'
														onClick={() => moveLessonUp(index)}
														disabled={index === 0}>
														↑ W górę
													</Button>
													<Button
														size='sm'
														variant='outline'
														onClick={() => moveLessonDown(index)}
														disabled={index === course.lessons.length - 1}>
														↓ W dół
													</Button>
												</div>
												<Button
													size='sm'
													variant='destructive'
													onClick={() => deleteLesson(lesson.id)}>
													<Trash2 className='h-3 w-3 mr-1' />
													Usuń lekcję
												</Button>
											</div>
										</div>
									)}
								</Card>
							);
						})}
					</div>
				)}
			</div>

			{/* Sticky bottom bar */}
			<div className='sticky bottom-0 bg-white border-t border-gray-200 py-4 -mx-8 px-8'>
				<div className='flex items-center justify-around max-w-5xl mx-auto'>
					<p className='text-sm text-gray-600'>
						Wszystkie pola oznaczone * są wymagane
					</p>
					<div className='flex gap-2'>
						<Button
							onClick={handleSave}
							disabled={isSaving}
							variant='outline_border'>
							{isSaving ? (
								<>
									<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
									Zapisywanie...
								</>
							) : (
								<>
									<Save className='h-4 w-4 mr-2' />
									Zapisz kurs
								</>
							)}
						</Button>
						<Button
							variant='outline_border'
							onClick={() => navigate("/author")}>
							Anuluj
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

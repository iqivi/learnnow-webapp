import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Play,
	FileText,
	ChevronRight,
	Clock,
	CheckCircle,
	MessageSquare,
	ThumbsUp,
	Star,
	Send,
	AlertCircle,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";

export function CoursePlayerPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();

	// Stan użytkownika (w praktyce z AuthContext)
	const [currentUser] = useState({
		id: 1,
		name: "Jan Kowalski",
		role: "author", // 'student' lub 'author'
		isInstructor: true, // czy jest autorem tego kursu
	});
 
	// Mock user - w prawdziwej aplikacji z useAuth()
	const mockUser = {
		id: 1,
		email: "anna.nowak@example.com",
		role: "author", // student, author, admin
	};

	// Przykładowe dane kursu
	const course = {
		id: courseId,
		title: "React.js - Tworzenie nowoczesnych aplikacji",
		instructor: "Anna Nowak",
		instructorEmail: "anna.nowak@example.com", // Email autora kursu
		lessons: [
			{
				id: 1,
				type: "video",
				title: "Wprowadzenie do React",
				content: "https://youtube.com/watch?v=...",
				duration: 15,
				order: 1,
				completed: true,
			},
			{
				id: 2,
				type: "video",
				title: "Instalacja i konfiguracja",
				content: "https://youtube.com/watch?v=...",
				duration: 20,
				order: 2,
				completed: true,
			},
			{
				id: 3,
				type: "text",
				title: "Czym jest JSX?",
				content:
					"JSX to rozszerzenie składni JavaScript, które pozwala pisać kod przypominający HTML wewnątrz plików JavaScript. Jest to podstawowa koncepcja w React...",
				order: 3,
				completed: false,
			},
			{
				id: 4,
				type: "video",
				title: "Twój pierwszy komponent",
				content: "https://youtube.com/watch?v=...",
				duration: 25,
				order: 4,
				completed: false,
			},
		],
	};

	const [selectedLesson, setSelectedLesson] = useState(course.lessons[2]);
	const [commentText, setCommentText] = useState("");
	const [isSendingComment, setIsSendingComment] = useState(false);

	// Przykładowe komentarze dla wybranej lekcji
	const [comments, setComments] = useState([
		{
			id: 1,
			lessonId: 3,
			user: "Jan Kowalski",
			userAvatar: "https://i.pravatar.cc/150?img=12",
			content: "Świetne wyjaśnienie JSX! Teraz wszystko jest jasne.",
			createdAt: "2025-01-02 14:30",
			likes: 12,
			isLiked: false,
			isCommunityNote: false,
			pendingApproval: false, // Czy oczekuje na zatwierdzenie
		},
		{
			id: 2,
			lessonId: 3,
			user: "Maria Lewandowska",
			userAvatar: "https://i.pravatar.cc/150?img=9",
			content:
				"Polecam też przeczytać oficjalną dokumentację React o JSX. Link: https://react.dev/learn/writing-markup-with-jsx",
			createdAt: "2025-01-02 12:15",
			likes: 28,
			isLiked: true,
			isCommunityNote: true, // Zatwierdzony przez autora
			approvedBy: "Anna Nowak",
			pendingApproval: false,
		},
		{
			id: 3,
			lessonId: 3,
			user: "Piotr Wiśniewski",
			userAvatar: "https://i.pravatar.cc/150?img=15",
			content:
				"Czy można używać JSX bez Reacta? Widziałem gdzieś że Preact też to wspiera.",
			createdAt: "2025-01-01 18:45",
			likes: 5,
			isLiked: false,
			isCommunityNote: false,
			pendingApproval: true, // Zaproponowany przez studenta
		},
	]);

	// Filtruj komentarze dla wybranej lekcji
	const lessonComments = comments.filter(c => c.lessonId === selectedLesson.id);

	// Sortuj: najpierw community notes, potem według liczby polubień
	const sortedComments = [...lessonComments].sort((a, b) => {
		if (a.isCommunityNote && !b.isCommunityNote) return -1;
		if (!a.isCommunityNote && b.isCommunityNote) return 1;
		return b.likes - a.likes;
	});

	const handleSendComment = async e => {
		e.preventDefault();

		if (!commentText.trim()) {
			toast.error("Wpisz treść komentarza");
			return;
		}

		setIsSendingComment(true);

		try {
			// API call
			// await fetch(`/api/courses/${courseId}/lessons/${selectedLesson.id}/comments`, {
			//     method: 'POST',
			//     body: JSON.stringify({ content: commentText })
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 500));

			const newComment = {
				id: Date.now(),
				lessonId: selectedLesson.id,
				user: "Ty",
				userAvatar: "https://i.pravatar.cc/150?img=1",
				content: commentText,
				createdAt: new Date().toLocaleString("pl-PL"),
				likes: 0,
				isLiked: false,
				isCommunityNote: false,
			};

			setComments([...comments, newComment]);
			setCommentText("");
			toast.success("Komentarz dodany!");
		} catch (error) {
			toast.error("Nie udało się dodać komentarza");
		} finally {
			setIsSendingComment(false);
		}
	};

	const handleLikeComment = commentId => {
		setComments(
			comments.map(c =>
				c.id === commentId
					? {
							...c,
							isLiked: !c.isLiked,
							likes: c.isLiked ? c.likes - 1 : c.likes + 1,
					  }
					: c
			)
		);
	};

	const handleMarkAsCompleted = () => {
		toast.success("Lekcja oznaczona jako ukończona!");
		// API call: POST /api/courses/${courseId}/lessons/${selectedLesson.id}/complete
	};

	// Zaproponuj komentarz jako notka społeczności (student)
	const handleProposeAsCommunityNote = commentId => {
		setComments(
			comments.map(c =>
				c.id === commentId ? { ...c, pendingApproval: true } : c
			)
		);
		toast.success("Komentarz zaproponowany jako notka społeczności!");
		// API call: POST /api/comments/${commentId}/propose
	};

	// Zatwierdź komentarz jako notka społeczności (autor)
	const handleApproveCommunityNote = async commentId => {
		try {
			// API call
			// await fetch(`/api/comments/${commentId}/approve`, {
			//     method: 'POST'
			// });

			setComments(
				comments.map(c =>
					c.id === commentId
						? {
								...c,
								isCommunityNote: true,
								pendingApproval: false,
								approvedBy: course.instructor,
						  }
						: c
				)
			);
			toast.success("Komentarz zatwierdzony jako notka społeczności!");
		} catch (error) {
			toast.error("Nie udało się zatwierdzić komentarza");
		}
	};

	// Odrzuć propozycję notki społeczności (autor)
	const handleRejectCommunityNote = commentId => {
		setComments(
			comments.map(c =>
				c.id === commentId ? { ...c, pendingApproval: false } : c
			)
		);
		toast.info("Propozycja odrzucona");
		// API call: POST /api/comments/${commentId}/reject
	};

	// Zatwierdź komentarz jako notka społeczności (tylko dla autora)
	const approveCommunityNote = async commentId => {
		try {
			// API call
			// await fetch(`/api/comments/${commentId}/approve`, {
			//     method: 'POST'
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 300));

			setComments(
				comments.map(c =>
					c.id === commentId
						? {
								...c,
								isCommunityNote: true,
								approvedBy: course.instructor,
						  }
						: c
				)
			);

			toast.success("Komentarz zatwierdzony jako notka społeczności!");
		} catch (error) {
			toast.error("Nie udało się zatwierdzić komentarza");
		}
	};

	// Cofnij zatwierdzenie notki społeczności
	const revokeCommunityNote = async commentId => {
		if (
			!confirm(
				"Czy na pewno chcesz cofnąć zatwierdzenie tej notki społeczności?"
			)
		) {
			return;
		}

		try {
			// API call
			// await fetch(`/api/comments/${commentId}/revoke`, {
			//     method: 'POST'
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 300));

			setComments(
				comments.map(c =>
					c.id === commentId
						? {
								...c,
								isCommunityNote: false,
								approvedBy: null,
						  }
						: c
				)
			);

			toast.success("Zatwierdzenie cofnięte");
		} catch (error) {
			toast.error("Nie udało się cofnąć zatwierdzenia");
		}
	};

	// Sprawdź czy zalogowany użytkownik jest autorem kursu
	const isAuthor = mockUser.email === course.instructorEmail;

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white border-b sticky top-0 z-10'>
				<div className='container mx-auto px-8 py-4'>
					<div className='flex  items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div>
								<h1 className='text-lg font-bold text-gray-900'>
									{course.title}
								</h1>
								<p className='text-xs text-gray-600'>
									Instruktor: {course.instructor}
								</p>
							</div>
						</div>
						<Button
							variant='outline_border'
							size='md'
							onClick={() => navigate("/dashboard")}>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Powrót
						</Button>
					</div>
				</div>
			</div>

			<div className='container mx-auto p-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Główna zawartość - Player + Comments */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Player / Content Display */}
						<Card className='overflow-hidden'>
							{selectedLesson.type === "video" ? (
								<>
									{/* Video Player */}
									<div className='aspect-video bg-gray-900 flex items-center justify-center relative'>
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
									<div className='p-8 bg-white'>
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

						{/* Lesson Info + Navigation */}
						<Card className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									{selectedLesson.title}
								</h3>
								{selectedLesson.completed ? (
									<Badge className='bg-green-600'>
										<CheckCircle className='h-3 w-3 mr-1' />
										Ukończone
									</Badge>
								) : (
									<Button
										size='sm'
										variant='outline'
										onClick={handleMarkAsCompleted}>
										<CheckCircle className='h-4 w-4 mr-2' />
										Oznacz jako ukończone
									</Button>
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

						{/* Comments Section */}
						<Card className='p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
								<MessageSquare className='h-5 w-5' />
								Komentarze ({lessonComments.length})
							</h3>

							{/* Add Comment Form */}
							<form onSubmit={handleSendComment} className='mb-6'>
								<textarea
									rows={3}
									placeholder='Dodaj komentarz do tej lekcji...'
									value={commentText}
									onChange={e => setCommentText(e.target.value)}
									className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-2'
								/>
								<div className='flex justify-between items-center'>
									<p className='text-xs text-gray-500'>
										{commentText.length} / 500 znaków
									</p>
									<Button
										type='submit'
										size='sm'
										disabled={isSendingComment || !commentText.trim()}
										className='bg-blue-600 hover:bg-blue-700'>
										{isSendingComment ? (
											<>
												<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
												Wysyłanie...
											</>
										) : (
											<>
												<Send className='h-4 w-4 mr-2' />
												Dodaj komentarz
											</>
										)}
									</Button>
								</div>
							</form>

							{/* Comments List */}
							<div className='space-y-4'>
								{sortedComments.length === 0 ? (
									<div className='text-center py-8 text-gray-500'>
										<MessageSquare className='h-12 w-12 mx-auto mb-2 opacity-50' />
										<p>Brak komentarzy do tej lekcji</p>
										<p className='text-sm'>Bądź pierwszy!</p>
									</div>
								) : (
									sortedComments.map(comment => (
										<div
											key={comment.id}
											className={`
												rounded-lg p-4 
												${
													comment.isCommunityNote
														? "bg-blue-50 border-2 border-blue-200"
														: "bg-gray-50"
												}
											`}>
											{/* Community Note Badge */}
											{comment.isCommunityNote && (
												<div className='mb-3'>
													<Badge className='bg-blue-600'>
														<Star className='h-3 w-3 mr-1' />
														Notka społeczności
													</Badge>
													<p className='text-xs text-blue-700 mt-1'>
														Zatwierdzone przez {comment.approvedBy}
													</p>
												</div>
											)}

											{/* User Info */}
											<div className='flex items-start gap-3'>
												<img
													src={comment.userAvatar}
													alt={comment.user}
													className='h-10 w-10 rounded-full'
												/>
												<div className='flex-1'>
													<div className='flex items-center justify-between mb-2'>
														<div>
															<p className='font-semibold text-gray-900'>
																{comment.user}
															</p>
															<p className='text-xs text-gray-500'>
																{comment.createdAt}
															</p>
														</div>
													</div>

													{/* Comment Content */}
													<p className='text-sm text-gray-700 mb-3'>
														{comment.content}
													</p>

													{/* Comment Actions */}
													<div className='flex items-center gap-4'>
														<button
															onClick={() => handleLikeComment(comment.id)}
															className={`
																flex items-center gap-1 text-sm transition-colors
																${
																	comment.isLiked
																		? "text-blue-600 font-semibold"
																		: "text-gray-600 hover:text-blue-600"
																}
															`}>
															<ThumbsUp
																className={`h-4 w-4 ${
																	comment.isLiked ? "fill-blue-600" : ""
																}`}
															/>
															<span>{comment.likes}</span>
														</button>

														{/* Przycisk dla studenta - zaproponuj jako notka */}
														{currentUser.role === "student" &&
															!comment.isCommunityNote &&
															!comment.pendingApproval && (
																<Button
																	size='sm'
																	variant='outline'
																	onClick={() =>
																		handleProposeAsCommunityNote(comment.id)
																	}>
																	<Star className='h-3 w-3 mr-1' />
																	Zaproponuj jako notka
																</Button>
															)}

														{/* Status oczekiwania dla studenta */}
														{comment.pendingApproval &&
															currentUser.role === "student" && (
																<Badge
																	variant='secondary'
																	className='bg-yellow-100 text-yellow-800'>
																	<Clock className='h-3 w-3 mr-1' />
																	Oczekuje na zatwierdzenie
																</Badge>
															)}

														{/* Przyciski dla autora - zatwierdź/odrzuć */}
														{currentUser.role === "author" &&
															currentUser.isInstructor &&
															!comment.isCommunityNote &&
															comment.pendingApproval && (
																<div className='flex gap-2'>
																	<Button
																		size='sm'
																		className='bg-green-600 hover:bg-green-700'
																		onClick={() =>
																			handleApproveCommunityNote(comment.id)
																		}>
																		<CheckCircle className='h-3 w-3 mr-1' />
																		Zatwierdź
																	</Button>
																	<Button
																		size='sm'
																		variant='outline'
																		onClick={() =>
																			handleRejectCommunityNote(comment.id)
																		}>
																		<XCircle className='h-3 w-3 mr-1' />
																		Odrzuć
																	</Button>
																</div>
															)}
													</div>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</Card>
					</div>

					{/* Sidebar - Lesson List */}
					<div className='lg:col-span-1'>
						<Card className='sticky top-24'>
							<div className='p-4 border-b bg-gray-50'>
								<h3 className='font-semibold text-gray-900'>Lista lekcji</h3>
								<p className='text-sm text-gray-600'>
									{course.lessons.filter(l => l.completed).length} /{" "}
									{course.lessons.length} ukończone
								</p>
							</div>

							{/* Lessons List */}
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
												{/* Lesson Icon */}
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

												{/* Lesson Info */}
												<div className='flex-1 min-w-0'>
													<p
														className={`
															text-sm font-medium mb-1
															${isActive ? "text-blue-600" : "text-gray-900"}
														`}>
														{index + 1}. {lesson.title}
													</p>
													<div className='flex items-center gap-2 text-xs text-gray-600'>
														{lesson.type === "video" && (
															<>
																<Clock className='h-3 w-3' />
																<span>{lesson.duration} min</span>
															</>
														)}
														{lesson.completed && (
															<Badge
																variant='secondary'
																className='bg-green-100 text-green-800'>
																<CheckCircle className='h-3 w-3' />
															</Badge>
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

							{/* Progress Bar */}
							<div className='p-4 border-t bg-gray-50'>
								<div className='flex justify-between text-sm mb-2'>
									<span className='text-gray-600'>Postęp kursu</span>
									<span className='font-semibold text-gray-900'>
										{Math.round(
											(course.lessons.filter(l => l.completed).length /
												course.lessons.length) *
												100
										)}
										%
									</span>
								</div>
								<div className='w-full bg-gray-200 rounded-full h-2'>
									<div
										className='bg-blue-600 h-2 rounded-full transition-all'
										style={{
											width: `${
												(course.lessons.filter(l => l.completed).length /
													course.lessons.length) *
												100
											}%`,
										}}></div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

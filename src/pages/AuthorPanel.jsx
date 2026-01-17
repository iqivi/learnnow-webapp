import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	BookOpen,
	Plus,
	Eye,
	Edit,
	Trash2,
	Users,
	Star,
	TrendingUp,
	DollarSign,
	Clock,
	PlayCircle,
	CheckCircle,
	XCircle,
	AlertCircle,
	BarChart3,
	Download,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function AuthorPanel() {
	const [activeTab, setActiveTab] = useState("courses"); // courses, analytics, earnings
	const navigate = useNavigate();

	// Przykładowe dane autora
	const authorStats = [
		{
			title: "Opublikowane kursy",
			value: "12",
			icon: BookOpen,
			color: "blue",
		},
		{
			title: "Wszyscy studenci",
			value: "3,247",
			icon: Users,
			color: "purple",
		},
		{
			title: "Średnia ocena",
			value: "4.8",
			icon: Star,
			color: "yellow",
		},
		{
			title: "Przychody (mies.)",
			value: "8,450 zł",
			icon: DollarSign,
			color: "green",
		},
	];

	// Przykładowe kursy autora
	const authorCourses = [
		{
			id: 1,
			title: "React.js - Tworzenie nowoczesnych aplikacji",
			thumbnail:
				"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
			status: "published",
			students: 847,
			rating: 4.9,
			reviews: 213,
			revenue: 3200,
			lessonsCount: 98,
			duration: 540,
			publishedAt: "2024-06-15",
			lastUpdated: "2024-12-20",
			pendingCommunityNotes: 0,
		},
		{
			id: 2,
			title: "Advanced TypeScript Patterns",
			thumbnail:
				"https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=450&fit=crop",
			status: "pending",
			students: 0,
			rating: 0,
			reviews: 0,
			revenue: 0,
			lessonsCount: 45,
			duration: 320,
			publishedAt: null,
			lastUpdated: "2025-01-02",
			pendingCommunityNotes: 0,
		},
		{
			id: 3,
			title: "Node.js i Express - Backend Development",
			thumbnail:
				"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
			status: "published",
			students: 1243,
			rating: 4.8,
			reviews: 456,
			revenue: 4100,
			lessonsCount: 89,
			duration: 600,
			publishedAt: "2024-03-10",
			lastUpdated: "2024-11-05",
			pendingCommunityNotes: 2,
		},
		{
			id: 4,
			title: "JavaScript ES6+ - Zaawansowane techniki",
			thumbnail:
				"https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=450&fit=crop",
			status: "draft",
			students: 0,
			rating: 0,
			reviews: 0,
			revenue: 0,
			lessonsCount: 12,
			duration: 85,
			publishedAt: null,
			lastUpdated: "2025-01-01",
			pendingCommunityNotes: 1,
		},
		{
			id: 5,
			title: "Docker i Kubernetes dla programistów",
			thumbnail:
				"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=450&fit=crop",
			status: "published",
			students: 657,
			rating: 4.7,
			reviews: 189,
			revenue: 1150,
			lessonsCount: 67,
			duration: 420,
			publishedAt: "2024-09-20",
			lastUpdated: "2024-12-15",
			pendingCommunityNotes: 0,
		},
	];

	const getStatusBadge = status => {
		const variants = {
			published: {
				className: "bg-green-600",
				label: "Opublikowany",
				icon: CheckCircle,
			},
			pending: {
				className: "bg-yellow-600",
				label: "Oczekuje",
				icon: Clock,
			},
			draft: {
				className: "bg-gray-600",
				label: "Szkic",
				icon: Edit,
			},
			rejected: {
				className: "bg-red-600",
				label: "Odrzucony",
				icon: XCircle,
			},
		};
		const config = variants[status] || variants.draft;
		const Icon = config.icon;
		return (
			<Badge className={config.className}>
				<Icon className='h-3 w-3 mr-1' />
				{config.label}
			</Badge>
		);
	};

	const formatDuration = minutes => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	const handleDeleteCourse = (courseId, courseName) => {
		if (
			confirm(
				`Czy na pewno chcesz usunąć kurs "${courseName}"? Ta akcja jest nieodwracalna!`
			)
		) {
			toast.success("Kurs został usunięty");
			// API call: DELETE /api/courses/${courseId}
		}
	};

	// const handlePublishCourse = (courseId) => {
	// 	toast.success("Kurs wysłany do weryfikacji");
	// 	// API call: POST /api/courses/${courseId}/submit
	// };

	return (
		<div className='container mx-auto p-8 space-y-8'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
						<BookOpen className='h-8 w-8' />
						Panel Autora
					</h1>
					<p className='text-gray-600 mt-1'>
						Zarządzaj swoimi kursami i śledź statystyki
					</p>
				</div>
				<Button
					className='bg-blue-600 hover:bg-blue-700'
					onClick={() => navigate("/author/courses/new")}>
					<Plus className='h-4 w-4 mr-2' />
					Utwórz nowy kurs
				</Button>
			</div>

			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{authorStats.map(stat => {
					const Icon = stat.icon;
					return (
						<Card key={stat.title} className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className={`p-3 rounded-lg bg-${stat.color}-100`}>
									<Icon className={`h-6 w-6 text-${stat.color}-600`} />
								</div>
							</div>
							<h3 className='text-sm font-medium text-gray-600 mb-1'>
								{stat.title}
							</h3>
							<p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
						</Card>
					);
				})}
			</div>

			{/* Tabs */}
			<div className='flex gap-2 border-b pb-2'>
				<Button
					variant={activeTab === "courses" ? "default" : "secondary"}
					onClick={() => setActiveTab("courses")}>
					<BookOpen className='h-4 w-4 mr-2' />
					Moje kursy
				</Button>
				<Button
					variant={activeTab === "analytics" ? "default" : "secondary"}
					onClick={() => setActiveTab("analytics")}>
					<BarChart3 className='h-4 w-4 mr-2' />
					Analityka
				</Button>
				<Button
					variant={activeTab === "earnings" ? "default" : "secondary"}
					onClick={() => setActiveTab("earnings")}>
					<DollarSign className='h-4 w-4 mr-2' />
					Przychody
				</Button>
			</div>

			{/* Courses Tab */}
			{activeTab === "courses" && (
				<div className='space-y-6'>
					{/* Pending Community Notes Alert */}
					{authorCourses.some(c => c.pendingCommunityNotes > 0) && (
						<div className='space-y-3'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Noteki społeczności oczekujące na zatwierdzenie
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{authorCourses
									.filter(c => c.pendingCommunityNotes > 0)
									.map(course => (
										<Card
											key={course.id}
											className='p-5 border-2 border-blue-200 bg-blue-50'>
											<div className='flex items-start justify-between'>
												<div className='flex-1'>
													<div className='flex items-center gap-2 mb-2'>
														<AlertCircle className='h-5 w-5 text-blue-600' />
														<h4 className='font-semibold text-gray-900'>
															{course.title}
														</h4>
													</div>
													<p className='text-sm text-gray-600 mb-3'>
														<span className='font-semibold text-blue-600'>
															{course.pendingCommunityNotes}
														</span>{" "}
														komentarz
														{course.pendingCommunityNotes > 1 ? "y" : ""}{" "}
														oczekuje na zatwierdzenie jako notek społeczności
													</p>
													<Button
														className='bg-blue-600 hover:bg-blue-700'
														size='sm'
														onClick={() =>
															navigate(`/course/${course.id}/watch`)
														}>
														<PlayCircle className='h-4 w-4 mr-2' />
														Przejdź do kursu
													</Button>
												</div>
											</div>
										</Card>
									))}
							</div>
						</div>
					)}

					{/* Filter/Sort bar */}
					<div className='flex items-center justify-between'>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='text-green-600 border-green-600'>
								<CheckCircle className='h-4 w-4 mr-1' />
								Opublikowane (3)
							</Button>
							<Button variant='outline' size='sm'>
								<Clock className='h-4 w-4 mr-1' />
								Oczekujące (1)
							</Button>
							<Button variant='outline' size='sm'>
								<Edit className='h-4 w-4 mr-1' />
								Szkice (1)
							</Button>
						</div>
						{/* <select className='px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
							<option>Sortuj: Najnowsze</option>
							<option>Sortuj: Najstarsze</option>
							<option>Sortuj: Najwięcej studentów</option>
							<option>Sortuj: Najwyższa ocena</option>
						</select> */}
					</div>

					{/* Courses Grid */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						{authorCourses.map(course => (
							<Card key={course.id} className='overflow-hidden'>
								<div className='flex'>
									{/* Thumbnail */}
									<div className='w-1/3 relative'>
										<img
											src={course.thumbnail}
											alt={course.title}
											className='h-full w-full object-cover'
										/>
										<div className='absolute top-2 left-2'>
											{getStatusBadge(course.status)}
										</div>
									</div>

									{/* Content */}
									<div className='flex-1 p-4'>
										<h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>
											{course.title}
										</h3>

										{/* Stats */}
										<div className='flex flex-wrap gap-3 text-sm text-gray-600 mb-3'>
											<div className='flex items-center gap-1'>
												<Users className='h-4 w-4' />
												<span>{course.students} studentów</span>
											</div>
											{course.rating > 0 && (
												<div className='flex items-center gap-1'>
													<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
													<span>
														{course.rating.toFixed(1)} ({course.reviews})
													</span>
												</div>
											)}
											<div className='flex items-center gap-1'>
												<PlayCircle className='h-4 w-4' />
												<span>{course.lessonsCount} lekcji</span>
											</div>
											<div className='flex items-center gap-1'>
												<Clock className='h-4 w-4' />
												<span>{formatDuration(course.duration)}</span>
											</div>
										</div>

										{/* Revenue (only for published) */}
										{course.status === "published" && (
											<div className='mb-3 text-sm'>
												<span className='text-gray-600'>Przychód:</span>
												<span className='font-semibold text-green-600 ml-2'>
													{course.revenue} zł
												</span>
											</div>
										)}

										{/* Dates */}
										<div className='text-xs text-gray-500 mb-3'>
											{course.publishedAt && (
												<p>Opublikowano: {course.publishedAt}</p>
											)}
											<p>Ostatnia aktualizacja: {course.lastUpdated}</p>
										</div>

										{/* Actions */}
										<div className='flex gap-2'>
											<Button
												size='sm'
												variant='secondary'
												onClick={() =>
													navigate(`/author/courses/${course.id}/preview`)
												}>
												<Eye className='h-3 w-3 mr-1' />
												Podgląd
											</Button>
											<Button
												size='sm'
												variant='secondary'
												onClick={() =>
													navigate(`/author/courses/${course.id}/edit`)
												}>
												<Edit className='h-3 w-3 mr-1' />
												Edytuj
											</Button>
											{course.status === "draft" && (
												<Button
													size='sm'
													className='bg-blue-600 hover:bg-blue-700'
													// onClick={() => handlePublishCourse(course.id)}
												>
													<CheckCircle className='h-3 w-3 mr-1' />
													Wyślij do weryfikacji
												</Button>
											)}
											<Button
												size='sm'
												variant='destructive'
												onClick={() =>
													handleDeleteCourse(course.id, course.title)
												}>
												<Trash2 className='h-3 w-3' />
											</Button>
										</div>
									</div>
								</div>
							</Card>
						))}
					</div>

					{/* Empty state dla szkiców */}
					{authorCourses.filter(c => c.status === "draft").length === 0 && (
						<Card className='p-12 text-center border-dashed'>
							<BookOpen className='h-16 w-16 text-gray-400 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								Brak szkiców
							</h3>
							<p className='text-gray-600 mb-6'>
								Wszystkie Twoje kursy są opublikowane lub w trakcie weryfikacji
							</p>
							<Button
								className='bg-blue-600 hover:bg-blue-700'
								onClick={() => navigate("/author/courses/new")}>
								<Plus className='h-4 w-4 mr-2' />
								Utwórz nowy kurs
							</Button>
						</Card>
					)}
				</div>
			)}

			{/* Analytics Tab */}
			{activeTab === "analytics" && (
				<div className='space-y-6'>
					{/* Overview Cards */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Card className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<TrendingUp className='h-8 w-8 text-blue-600' />
								<span className='text-sm font-semibold text-green-600'>
									+15%
								</span>
							</div>
							<h3 className='text-sm font-medium text-gray-600 mb-1'>
								Nowi studenci (30 dni)
							</h3>
							<p className='text-2xl font-bold text-gray-900'>347</p>
						</Card>

						<Card className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<CheckCircle className='h-8 w-8 text-green-600' />
								<span className='text-sm font-semibold text-green-600'>
									+8%
								</span>
							</div>
							<h3 className='text-sm font-medium text-gray-600 mb-1'>
								Ukończenia (30 dni)
							</h3>
							<p className='text-2xl font-bold text-gray-900'>124</p>
						</Card>

						<Card className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<Star className='h-8 w-8 text-yellow-500' />
								<span className='text-sm font-semibold text-green-600'>
									+0.2
								</span>
							</div>
							<h3 className='text-sm font-medium text-gray-600 mb-1'>
								Nowe opinie (30 dni)
							</h3>
							<p className='text-2xl font-bold text-gray-900'>87</p>
						</Card>
					</div>

					{/* Course Performance Table */}
					<Card>
						<div className='p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4'>
								Wydajność kursów
							</h3>
							<div className='overflow-x-auto'>
								<table className='w-full'>
									<thead className='bg-gray-50 border-b'>
										<tr>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Kurs
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Studenci
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Ocena
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Ukończenia
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Przychód
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{authorCourses
											.filter(c => c.status === "published")
											.map(course => (
												<tr key={course.id} className='hover:bg-gray-50'>
													<td className='px-4 py-3 text-sm text-gray-900'>
														{course.title}
													</td>
													<td className='px-4 py-3 text-sm text-gray-600'>
														{course.students}
													</td>
													<td className='px-4 py-3 text-sm text-gray-600'>
														{course.rating > 0
															? `${course.rating.toFixed(1)} ⭐`
															: "-"}
													</td>
													<td className='px-4 py-3 text-sm text-gray-600'>
														{Math.floor(course.students * 0.65)}
													</td>
													<td className='px-4 py-3 text-sm font-semibold text-green-600'>
														{course.revenue} zł
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</Card>

					{/* Chart placeholder */}
					<Card className='p-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Zapisani studenci (ostatnie 6 miesięcy)
						</h3>
						<div className='h-64 flex items-center justify-center bg-gray-50 rounded-lg'>
							<div className='text-center text-gray-500'>
								<BarChart3 className='h-12 w-12 mx-auto mb-2' />
								<p>Wykres będzie dostępny wkrótce</p>
							</div>
						</div>
					</Card>
				</div>
			)}

			{/* Earnings Tab */}
			{activeTab === "earnings" && (
				<div className='space-y-6'>
					{/* Summary Cards */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Card className='p-6'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='p-3 rounded-lg bg-green-100'>
									<DollarSign className='h-6 w-6 text-green-600' />
								</div>
								<div>
									<h3 className='text-sm font-medium text-gray-600'>
										Przychód (ten miesiąc)
									</h3>
									<p className='text-2xl font-bold text-gray-900'>8,450 zł</p>
								</div>
							</div>
							<span className='text-sm text-green-600 font-semibold'>
								+22% vs. poprzedni miesiąc
							</span>
						</Card>

						<Card className='p-6'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='p-3 rounded-lg bg-blue-100'>
									<TrendingUp className='h-6 w-6 text-blue-600' />
								</div>
								<div>
									<h3 className='text-sm font-medium text-gray-600'>
										Całkowity przychód
									</h3>
									<p className='text-2xl font-bold text-gray-900'>52,340 zł</p>
								</div>
							</div>
							<span className='text-sm text-gray-600'>Od początku</span>
						</Card>

						<Card className='p-6'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='p-3 rounded-lg bg-purple-100'>
									<Users className='h-6 w-6 text-purple-600' />
								</div>
								<div>
									<h3 className='text-sm font-medium text-gray-600'>
										Średni przychód/student
									</h3>
									<p className='text-2xl font-bold text-gray-900'>161 zł</p>
								</div>
							</div>
							<span className='text-sm text-gray-600'>
								Średnia ze wszystkich kursów
							</span>
						</Card>
					</div>

					{/* Earnings by Course */}
					<Card>
						<div className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-lg font-semibold text-gray-900'>
									Przychody z kursów
								</h3>
								<Button variant='outline' size='sm'>
									<Download className='h-4 w-4 mr-2' />
									Eksportuj raport
								</Button>
							</div>
							<div className='overflow-x-auto'>
								<table className='w-full'>
									<thead className='bg-gray-50 border-b'>
										<tr>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Kurs
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Cena
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Sprzedanych
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Przychód brutto
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Prowizja (30%)
											</th>
											<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
												Twój przychód
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{authorCourses
											.filter(c => c.status === "published")
											.map(course => {
												const price = 249;
												const sold = course.students;
												const gross = price * sold;
												const commission = gross * 0.3;
												const net = gross - commission;

												return (
													<tr key={course.id} className='hover:bg-gray-50'>
														<td className='px-4 py-3 text-sm text-gray-900'>
															{course.title}
														</td>
														<td className='px-4 py-3 text-sm text-gray-600'>
															{price} zł
														</td>
														<td className='px-4 py-3 text-sm text-gray-600'>
															{sold}
														</td>
														<td className='px-4 py-3 text-sm text-gray-600'>
															{gross.toLocaleString()} zł
														</td>
														<td className='px-4 py-3 text-sm text-red-600'>
															-{commission.toLocaleString()} zł
														</td>
														<td className='px-4 py-3 text-sm font-semibold text-green-600'>
															{net.toLocaleString()} zł
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					</Card>

					{/* Info box */}
					<Card className='p-6 bg-blue-50 border-blue-200'>
						<div className='flex gap-4'>
							<AlertCircle className='h-6 w-6 text-blue-600 flex-shrink-0' />
							<div>
								<h4 className='font-semibold text-blue-900 mb-2'>
									Informacje o wypłatach
								</h4>
								<p className='text-sm text-blue-800'>
									Wypłaty realizowane są do 15. dnia każdego miesiąca za
									poprzedni miesiąc. Minimalna kwota wypłaty to 100 zł. Prowizja
									platformy wynosi 30% od każdej sprzedaży.
								</p>
							</div>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
}

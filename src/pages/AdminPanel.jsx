import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import {
	Users,
	BookOpen,
	DollarSign,
	TrendingUp,
	UserPlus,
	AlertCircle,
	CheckCircle,
	Clock,
	Settings,
	FileText,
	BarChart3,
	Search,
	Filter,
} from "lucide-react";
import { toast } from "sonner";
import { UserFormModal, SupportResponseModal } from "@/pages";

export function AdminPanel() {
	const [activeTab, setActiveTab] = useState("overview");
	const navigate = useNavigate();

	// Stan dla modala użytkownika
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	// Stan dla modala odpowiedzi support
	const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState(null);

	// Przykładowe dane statystyk
	const stats = [
		{
			title: "Użytkownicy",
			value: "2,543",
			change: "+12%",
			trend: "up",
			icon: Users,
			color: "blue",
		},
		{
			title: "Aktywne kursy",
			value: "47",
			change: "+3",
			trend: "up",
			icon: BookOpen,
			color: "purple",
		},
		{
			title: "Przychody (mies.)",
			value: "42,350 zł",
			change: "+18%",
			trend: "up",
			icon: DollarSign,
			color: "green",
		},
		{
			title: "Ukończenia",
			value: "1,247",
			change: "+8%",
			trend: "up",
			icon: TrendingUp,
			color: "orange",
		},
	];

	// Przykładowe dane - użytkownicy (dodaj useState)
	const [recentUsers, setRecentUsers] = useState([
		{
			id: 1,
			name: "Jan Kowalski",
			email: "jan@example.com",
			joinedAt: "2025-01-02",
			status: "active",
			role: "student",
			courses: 2,
		},
		{
			id: 2,
			name: "Anna Nowak",
			email: "anna@example.com",
			joinedAt: "2025-01-02",
			status: "active",
			role: "author",
			courses: 5,
		},
		{
			id: 3,
			name: "Piotr Wiśniewski",
			email: "piotr@example.com",
			joinedAt: "2025-01-01",
			status: "pending",
			role: "student",
			courses: 0,
		},
		{
			id: 4,
			name: "Maria Lewandowska",
			email: "maria@example.com",
			joinedAt: "2025-01-01",
			status: "active",
			role: "admin",
			courses: 3,
		},
	]);

	// Przykładowe dane - kursy oczekujące na zatwierdzenie
	const pendingCourses = [
		{
			id: 1,
			title: "Advanced TypeScript Patterns",
			author: "Jan Kowalski",
			submittedAt: "2025-01-01",
			status: "pending",
		},
		{
			id: 2,
			title: "Vue.js 3 Composition API",
			author: "Anna Nowak",
			submittedAt: "2024-12-30",
			status: "pending",
		},
		{
			id: 3,
			title: "Docker dla początkujących",
			author: "Piotr Wiśniewski",
			submittedAt: "2024-12-29",
			status: "pending",
		},
	];

	// Przykładowe zgłoszenia supportu
	const [supportTickets, setSupportTickets] = useState([
		{
			id: 1,
			user: "Jan Kowalski",
			subject: "Problem z płatnością",
			category: "technical",
			status: "open",
			priority: "high",
			createdAt: "2025-01-02 14:30",
			message:
				"Nie mogę dokonać płatności za kurs. Wyskakuje błąd 'Payment failed'. Próbowałem dwóch różnych kart.",
		},
		{
			id: 2,
			user: "Anna Nowak",
			subject: "Pytanie o certyfikat",
			category: "general",
			status: "open",
			priority: "medium",
			createdAt: "2025-01-02 12:15",
			message:
				"Ukończyłam kurs React.js tydzień temu. Kiedy otrzymam certyfikat ukończenia?",
		},
		{
			id: 3,
			user: "Maria Lewandowska",
			subject: "Błąd odtwarzacza wideo",
			category: "technical",
			status: "in_progress",
			priority: "high",
			createdAt: "2025-01-01 16:45",
			message:
				"Wideo w lekcji 5 nie odtwarza się. Po kliknięciu play nic się nie dzieje.",
		},
	]);

	const getStatusBadge = status => {
		const variants = {
			active: {
				variant: "default",
				label: "Aktywny",
				className: "bg-green-600",
			},
			pending: {
				variant: "secondary",
				label: "Oczekuje",
				className: "bg-yellow-600",
			},
			inactive: {
				variant: "secondary",
				label: "Nieaktywny",
				className: "bg-gray-600",
			},
			open: {
				variant: "destructive",
				label: "Otwarte",
				className: "bg-red-600",
			},
			in_progress: {
				variant: "default",
				label: "W trakcie",
				className: "bg-blue-600",
			},
			closed: {
				variant: "secondary",
				label: "Zamknięte",
				className: "bg-gray-600",
			},
		};
		const config = variants[status] || variants.pending;
		return <Badge className={config.className}>{config.label}</Badge>;
	};

	// const getPriorityBadge = priority => {
	// 	const variants = {
	// 		high: { className: "bg-red-100 text-red-800", label: "Wysoki" },
	// 		medium: { className: "bg-yellow-100 text-yellow-800", label: "Średni" },
	// 		low: { className: "bg-green-100 text-green-800", label: "Niski" },
	// 	};
	// 	const config = variants[priority] || variants.medium;
	// 	return (
	// 		<Badge variant='secondary' className={config.className}>
	// 			{config.label}
	// 		</Badge>
	// 	);
	// };

	const getRoleBadge = role => {
		const variants = {
			student: { className: "bg-blue-100 text-blue-800", label: "Student" },
			author: { className: "bg-purple-100 text-purple-800", label: "Autor" },
			admin: { className: "bg-red-100 text-red-800", label: "Admin" },
		};
		const config = variants[role] || variants.student;
		return (
			<Badge variant='secondary' className={config.className}>
				{config.label}
			</Badge>
		);
	};

	// Otwórz modal do dodawania użytkownika
	const handleAddUser = () => {
		setSelectedUser(null);
		setIsUserModalOpen(true);
	};

	// Otwórz modal do edycji użytkownika
	const handleEditUser = user => {
		setSelectedUser(user);
		setIsUserModalOpen(true);
	};

	// Zapisz użytkownika (dodaj lub edytuj)
	const handleSaveUser = userData => {
		if (selectedUser) {
			// Edycja - zaktualizuj istniejącego użytkownika
			setRecentUsers(prev =>
				prev.map(u => (u.id === selectedUser.id ? { ...u, ...userData } : u))
			);
		} else {
			// Dodawanie - dodaj nowego użytkownika
			setRecentUsers(prev => [...prev, userData]);
		}
	};

	// Usuń użytkownika
	const handleDeleteUser = (userId, userName) => {
		if (confirm(`Czy na pewno chcesz usunąć użytkownika "${userName}"?`)) {
			setRecentUsers(prev => prev.filter(u => u.id !== userId));
			toast.success("Użytkownik usunięty");
		}
	};

	// Otwórz modal odpowiedzi na zgłoszenie
	const handleRespondToTicket = ticket => {
		setSelectedTicket(ticket);
		setIsSupportModalOpen(true);
	};

	// Wyślij odpowiedź na zgłoszenie
	const handleSendResponse = responseData => {
		// Zaktualizuj status zgłoszenia na "closed"
		setSupportTickets(prev =>
			prev.map(t =>
				t.id === responseData.ticketId ? { ...t, status: "closed" } : t
			)
		);
	};

	return (
		<div className='container mx-auto p-8 space-y-8'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
						<Settings className='h-8 w-8' />
						Panel Administratora
					</h1>
					<p className='text-gray-600 mt-1'>
						Zarządzaj platformą, użytkownikami i kursami
					</p>
				</div>
			</div>

			{/* Tabs */}
			<div className='flex gap-2 border-b pb-2'>
				<Button
					variant={activeTab === "overview" ? "default" : "secondary"}
					onClick={() => setActiveTab("overview")}>
					<BarChart3 className='h-4 w-4 mr-2' />
					Przegląd
				</Button>
				<Button
					variant={activeTab === "users" ? "default" : "secondary"}
					onClick={() => setActiveTab("users")}>
					<Users className='h-4 w-4 mr-2' />
					Użytkownicy
				</Button>
				<Button
					variant={activeTab === "courses" ? "default" : "secondary"}
					onClick={() => setActiveTab("courses")}>
					<BookOpen className='h-4 w-4 mr-2' />
					Kursy
				</Button>
				<Button
					variant={activeTab === "support" ? "default" : "secondary"}
					onClick={() => setActiveTab("support")}>
					<AlertCircle className='h-4 w-4 mr-2' />
					Support
				</Button>
			</div>

			{/* Overview Tab */}
			{activeTab === "overview" && (
				<div className='space-y-8'>
					{/* Stats Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{stats.map(stat => {
							const Icon = stat.icon;
							return (
								<Card key={stat.title} className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<div className={`p-3 rounded-lg bg-${stat.color}-100`}>
											<Icon className={`h-6 w-6 text-${stat.color}-600`} />
										</div>
										<span
											className={`text-sm font-semibold ${
												stat.trend === "up" ? "text-green-600" : "text-red-600"
											}`}>
											{stat.change}
										</span>
									</div>
									<h3 className='text-sm font-medium text-gray-600 mb-1'>
										{stat.title}
									</h3>
									<p className='text-2xl font-bold text-gray-900'>
										{stat.value}
									</p>
								</Card>
							);
						})}
					</div>

					{/* Recent Activity */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						{/* Najnowsi użytkownicy */}
						<Card className='p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
								<UserPlus className='h-5 w-5' />
								Najnowsi użytkownicy
							</h3>
							<div className='space-y-4'>
								{recentUsers.slice(0, 4).map(user => (
									<div
										key={user.id}
										className='flex items-center justify-between pb-4 border-b last:border-b-0'>
										<div className='flex items-center gap-3'>
											<div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold'>
												{user.name.charAt(0)}
											</div>
											<div>
												<p className='font-medium text-gray-900'>{user.name}</p>
												<p className='text-sm text-gray-600'>{user.email}</p>
											</div>
										</div>
										<div className='text-right'>
											{getStatusBadge(user.status)}
											<p className='text-xs text-gray-500 mt-1'>
												{user.joinedAt}
											</p>
										</div>
									</div>
								))}
							</div>
						</Card>

						{/* Kursy do zatwierdzenia */}
						<Card className='p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
								<Clock className='h-5 w-5' />
								Oczekujące kursy
							</h3>
							<div className='space-y-4'>
								{pendingCourses.map(course => (
									<div
										key={course.id}
										className='pb-4 border-b last:border-b-0'>
										<div className='flex items-start justify-between mb-2'>
											<div className='flex-1'>
												<p className='font-medium text-gray-900'>
													{course.title}
												</p>
												<p className='text-sm text-gray-600'>
													Autor: {course.author}
												</p>
											</div>
											{getStatusBadge(course.status)}
										</div>
										<div className='flex gap-2 mt-3'>
											<Button
												size='sm'
												className='bg-green-600 hover:bg-green-700'>
												<CheckCircle className='h-3 w-3 mr-1' />
												Zatwierdź
											</Button>
											<Button
												size='sm'
												variant='secondary'
												onClick={() =>
													navigate(`/author/courses/${course.id}/preview`)
												}>
												<Eye className='h-3 w-3 mr-1' />
												Podgląd
											</Button>
										</div>
									</div>
								))}
							</div>
						</Card>
					</div>
				</div>
			)}

			{/* Users Tab */}
			{activeTab === "users" && (
				<div className='space-y-6'>
					{/* Search and filters */}
					<div className='flex gap-3'>
						<Button
							className='bg-blue-600 hover:bg-blue-700'
							onClick={handleAddUser}>
							<UserPlus className='h-4 w-4 mr-2' />
							Dodaj użytkownika
						</Button>
					</div>

					{/* Users table */}
					<Card>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-gray-50 border-b'>
									<tr>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Użytkownik
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Email
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Rola
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Kursy
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Status
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Data dołączenia
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Akcje
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{recentUsers.map(user => (
										<tr key={user.id} className='hover:bg-gray-50'>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold'>
														{user.name.charAt(0)}
													</div>
													<div className='ml-3'>
														<p className='font-medium text-gray-900'>
															{user.name}
														</p>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
												{user.email}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												{getRoleBadge(user.role)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{user.courses}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												{getStatusBadge(user.status)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
												{user.joinedAt}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>
												<div className='flex gap-2'>
													<Button
														size='sm'
														variant='outline'
														onClick={() => handleEditUser(user)}>
														Edytuj
													</Button>
													<Button
														size='sm'
														variant='destructive'
														onClick={() =>
															handleDeleteUser(user.id, user.name)
														}>
														Usuń
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Card>
				</div>
			)}

			{/* Courses Tab */}
			{activeTab === "courses" && (
				<div className='space-y-6'>
					<Card>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-gray-50 border-b'>
									<tr>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Kurs
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Autor
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Status
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Data dodania
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Akcje
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{pendingCourses.map(course => (
										<tr key={course.id} className='hover:bg-gray-50'>
											<td className='px-6 py-4'>
												<p className='font-medium text-gray-900'>
													{course.title}
												</p>
											</td>
											<td className='px-6 py-4 text-sm text-gray-600'>
												{course.author}
											</td>
											<td className='px-6 py-4'>
												{getStatusBadge(course.status)}
											</td>
											<td className='px-6 py-4 text-sm text-gray-600'>
												{course.submittedAt}
											</td>
											<td className='px-6 py-4'>
												<div className='flex gap-2'>
													<Button
														size='sm'
														className='bg-green-600 hover:bg-green-700'>
														Zatwierdź
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Card>
				</div>
			)}

			{/* Support Tab */}
			{activeTab === "support" && (
				<div className='space-y-6'>
					<Card>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-gray-50 border-b'>
									<tr>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Użytkownik
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Temat
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Kategoria
										</th>
										{/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Priorytet
										</th> */}
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Status
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Data
										</th>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Akcje
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{supportTickets.map(ticket => (
										<tr key={ticket.id} className='hover:bg-gray-50'>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{ticket.user}
											</td>
											<td className='px-6 py-4'>
												<p className='font-medium text-gray-900'>
													{ticket.subject}
												</p>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize'>
												{ticket.category}
											</td>
											{/* <td className='px-6 py-4 whitespace-nowrap'>
												{getPriorityBadge(ticket.priority)}
											</td> */}
											<td className='px-6 py-4 whitespace-nowrap'>
												{getStatusBadge(ticket.status)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
												{ticket.createdAt}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<Button
													size='sm'
													variant='outline'
													onClick={() => handleRespondToTicket(ticket)}>
													Odpowiedz
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Card>
				</div>
			)}

			{/* User Form Modal */}
			<UserFormModal
				isOpen={isUserModalOpen}
				onClose={() => setIsUserModalOpen(false)}
				user={selectedUser}
				onSave={handleSaveUser}
			/>

			<SupportResponseModal
				isOpen={isSupportModalOpen}
				onClose={() => setIsSupportModalOpen(false)}
				ticket={selectedTicket}
				onSend={handleSendResponse}
			/>
		</div>
	);
}

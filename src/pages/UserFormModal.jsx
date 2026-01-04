import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function UserFormModal({ isOpen, onClose, user = null, onSave }) {
	const isEditing = !!user;

	// Stan formularza
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "student",
		status: "active",
	});

	const [isSaving, setIsSaving] = useState(false);

	// Załaduj dane użytkownika do edycji
	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				email: user.email || "",
				password: "", // Nigdy nie pokazuj hasła
				role: user.role || "student",
				status: user.status || "active",
			});
		} else {
			// Reset dla nowego użytkownika
			setFormData({
				name: "",
				email: "",
				password: "",
				role: "student",
				status: "active",
			});
		}
	}, [user, isOpen]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Walidacja
		if (!formData.name.trim()) {
			toast.error("Wpisz imię i nazwisko");
			return;
		}

		if (!formData.email.trim()) {
			toast.error("Wpisz adres email");
			return;
		}

		// Walidacja email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error("Nieprawidłowy adres email");
			return;
		}

		// Walidacja hasła (tylko dla nowego użytkownika)
		if (!isEditing && !formData.password.trim()) {
			toast.error("Wpisz hasło");
			return;
		}

		if (!isEditing && formData.password.length < 8) {
			toast.error("Hasło musi mieć minimum 8 znaków");
			return;
		}

		setIsSaving(true);

		try {
			// API call
			// const url = isEditing
			// 	? `/api/admin/users/${user.id}`
			// 	: '/api/admin/users';
			// const method = isEditing ? 'PUT' : 'POST';
			//
			// const response = await fetch(url, {
			// 	method,
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify(formData)
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 1000));

			toast.success(
				isEditing ? "Użytkownik zaktualizowany!" : "Użytkownik dodany!"
			);

			// Wywołaj callback z danymi
			if (onSave) {
				onSave({
					id: isEditing ? user.id : Date.now(),
					...formData,
					joinedAt: isEditing
						? user.joinedAt
						: new Date().toISOString().split("T")[0],
					courses: isEditing ? user.courses : 0,
				});
			}

			// Zamknij modal
			onClose();
		} catch (error) {
			toast.error("Nie udało się zapisać użytkownika");
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edytuj użytkownika" : "Dodaj nowego użytkownika"}
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-4'>
					{/* Imię i nazwisko */}
					<div className='space-y-2'>
						<Label htmlFor='name'>Imię i nazwisko *</Label>
						<Input
							id='name'
							name='name'
							type='text'
							placeholder='Jan Kowalski'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Email */}
					<div className='space-y-2'>
						<Label htmlFor='email'>Email *</Label>
						<Input
							id='email'
							name='email'
							type='email'
							placeholder='jan@example.com'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Hasło */}
					<div className='space-y-2'>
						<Label htmlFor='password'>
							{isEditing ? "Nowe hasło (opcjonalne)" : "Hasło *"}
						</Label>
						<Input
							id='password'
							name='password'
							type='password'
							placeholder={
								isEditing ? "Zostaw puste aby nie zmieniać" : "••••••••"
							}
							value={formData.password}
							onChange={handleChange}
							required={!isEditing}
						/>
						{!isEditing && (
							<p className='text-xs text-gray-500'>Minimum 8 znaków</p>
						)}
					</div>

					{/* Rola */}
					<div className='space-y-2'>
						<Label htmlFor='role'>Rola</Label>
						<select
							id='role'
							name='role'
							value={formData.role}
							onChange={handleChange}
							className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
							<option value='student'>Student</option>
							<option value='author'>Autor</option>
							<option value='admin'>Administrator</option>
						</select>
						<p className='text-xs text-gray-500'>
							Student: dostęp do kursów | Autor: może tworzyć kursy | Admin:
							pełen dostęp
						</p>
					</div>

					{/* Status */}
					<div className='space-y-2'>
						<Label htmlFor='status'>Status</Label>
						<select
							id='status'
							name='status'
							value={formData.status}
							onChange={handleChange}
							className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
							<option value='active'>Aktywny</option>
							<option value='pending'>Oczekuje</option>
							<option value='inactive'>Nieaktywny</option>
						</select>
					</div>

					<DialogFooter>
						<Button
							type='submit'
							disabled={isSaving}
							variant='outline_border'
							size='md'>
							{isSaving ? (
								<>
									<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
									Zapisywanie...
								</>
							) : isEditing ? (
								"Zaktualizuj"
							) : (
								"Dodaj użytkownika"
							)}
						</Button>
						<Button
							type='button'
							variant='outline_border'
							onClick={onClose}
							disabled={isSaving}
							size='md'>
							Anuluj
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

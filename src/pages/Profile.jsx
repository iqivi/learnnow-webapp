import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, Camera } from "lucide-react";
import { toast } from "sonner";

export function Profile() {
	const { user } = useAuth();

	// Stan formularza
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	// Obsługa zmian w inputach
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// Zapisz zmiany profilu
	const handleSaveProfile = async e => {
		e.preventDefault();
		setIsSaving(true);

		try {
			// Tutaj będzie wywołanie API
			// await fetch('/api/user/profile', {
			//     method: 'PUT',
			//     body: JSON.stringify({
			//         name: formData.name,
			//         email: formData.email
			//     })
			// });

			// Symulacja opóźnienia
			await new Promise(resolve => setTimeout(resolve, 1000));

			toast.success("Profil został zaktualizowany!");
			setIsEditing(false);
		} catch (error) {
			toast.error("Nie udało się zaktualizować profilu");
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	// Zmiana hasła
	const handleChangePassword = async e => {
		e.preventDefault();

		// Walidacja
		if (
			!formData.currentPassword ||
			!formData.newPassword ||
			!formData.confirmPassword
		) {
			toast.error("Wypełnij wszystkie pola");
			return;
		}

		if (formData.newPassword !== formData.confirmPassword) {
			toast.error("Nowe hasła nie są identyczne");
			return;
		}

		if (formData.newPassword.length < 8) {
			toast.error("Hasło musi mieć minimum 8 znaków");
			return;
		}

		setIsSaving(true);

		try {
			// Tutaj będzie wywołanie API
			// await fetch('/api/user/change-password', {
			//     method: 'POST',
			//     body: JSON.stringify({
			//         currentPassword: formData.currentPassword,
			//         newPassword: formData.newPassword
			//     })
			// });

			// Symulacja opóźnienia
			await new Promise(resolve => setTimeout(resolve, 1000));

			toast.success("Hasło zostało zmienione!");

			// Wyczyść pola hasła
			setFormData(prev => ({
				...prev,
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			}));
		} catch (error) {
			toast.error("Nie udało się zmienić hasła");
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setFormData({
			name: user?.name || "",
			email: user?.email || "",
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
		setIsEditing(false);
	};

	return (
		<div className='space-y-3 sm:space-y-4 md:space-y-6'>
			{/* Header */}
			<div className='pb-2'>
				<h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
					Profil użytkownika
				</h2>
				<p className='text-xs sm:text-sm text-gray-600 mt-0.5'>
					Zarządzaj swoimi danymi osobowymi i ustawieniami konta
				</p>
			</div>

			<Separator className='my-2' />

			{/* Avatar Section */}
			<div className='flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 pb-1'>
				<div className='relative flex-shrink-0'>
					<div className='h-20 sm:h-24 w-20 sm:w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold'>
						{user?.name?.charAt(0).toUpperCase() || "U"}
					</div>
					<button className='absolute bottom-0 right-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-lg transition-colors'>
						<Camera className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
					</button>
				</div>
				<div className='text-center sm:text-left'>
					<h3 className='text-base sm:text-lg font-semibold text-gray-900'>
						{user?.name || "Użytkownik"}
					</h3>
					<p className='text-xs sm:text-sm text-gray-600'>{user?.email}</p>
					<button className='mt-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium'>
						Zmień zdjęcie profilowe
					</button>
				</div>
			</div>

			<Separator className='my-2' />

			{/* Formularz danych osobowych */}
			<div className='pb-1'>
				<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3'>
					<h3 className='text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2'>
						<User className='h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0' />
						Dane osobowe
					</h3>
					{!isEditing && (
						<Button
							variant='outline_border'
							size='sm'
							onClick={() => setIsEditing(true)}
							className='text-xs sm:text-sm'>
							Edytuj
						</Button>
					)}
				</div>

				<form onSubmit={handleSaveProfile} className='space-y-3'>
					<div className='grid gap-3 md:grid-cols-2'>
						{/* Imię i nazwisko */}
						<div className='space-y-1.5'>
							<Label htmlFor='name' className='text-xs sm:text-sm'>
								Imię i nazwisko
							</Label>
							<Input
								id='name'
								name='name'
								type='text'
								placeholder='Jan Kowalski'
								value={formData.name}
								onChange={handleChange}
								disabled={!isEditing}
								className={`text-sm ${!isEditing ? "bg-gray-50" : ""}`}
							/>
						</div>

						{/* Email */}
						<div className='space-y-1.5'>
							<Label htmlFor='email' className='text-xs sm:text-sm'>
								Email
							</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='jan@example.com'
								value={formData.email}
								onChange={handleChange}
								disabled={!isEditing}
								className={`text-sm ${!isEditing ? "bg-gray-50" : ""}`}
							/>
						</div>
					</div>

					{/* Przyciski akcji */}
					{isEditing && (
						<div className='flex gap-2 pt-1'>
							<Button
								type='submit'
								disabled={isSaving}
								className='bg-blue-600 hover:bg-blue-700 text-sm'
								size='sm'>
								{isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
							</Button>
							<Button
								type='button'
								variant='outline'
								onClick={handleCancel}
								disabled={isSaving}
								className='text-sm'
								size='sm'>
								Anuluj
							</Button>
						</div>
					)}
				</form>
			</div>

			<Separator className='my-2' />

			{/* Formularz zmiany hasła */}
			<div className='pb-1'>
				<h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2'>
					<Lock className='h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0' />
					Zmiana hasła
				</h3>

				<form onSubmit={handleChangePassword} className='space-y-3'>
					<div className='grid gap-3 md:grid-cols-1 max-w-md'>
						{/* Obecne hasło */}
						<div className='space-y-1.5'>
							<Label htmlFor='currentPassword' className='text-xs sm:text-sm'>
								Obecne hasło
							</Label>
							<Input
								id='currentPassword'
								name='currentPassword'
								type='password'
								placeholder='••••••••'
								value={formData.currentPassword}
								onChange={handleChange}
								className='text-sm'
							/>
						</div>

						{/* Nowe hasło */}
						<div className='space-y-1.5'>
							<Label htmlFor='newPassword' className='text-xs sm:text-sm'>
								Nowe hasło
							</Label>
							<Input
								id='newPassword'
								name='newPassword'
								type='password'
								placeholder='••••••••'
								value={formData.newPassword}
								onChange={handleChange}
								className='text-sm'
							/>
							<p className='text-xs text-gray-500'>Minimum 8 znaków</p>
						</div>

						{/* Potwierdź nowe hasło */}
						<div className='space-y-1.5'>
							<Label htmlFor='confirmPassword' className='text-xs sm:text-sm'>
								Potwierdź nowe hasło
							</Label>
							<Input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								placeholder='••••••••'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='text-sm'
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='w-full text-sm'
						disabled={isSaving}
						size='sm'
						variant='outline_border'>
						{isSaving ? "Zmiana hasła..." : "Zmień hasło"}
					</Button>
				</form>
			</div>

			<Separator className='my-2' />

			{/* Sekcja niebezpieczna */}
			<div className='pb-1'>
				<h3 className='text-base sm:text-lg font-semibold text-red-600 mb-1'>
					Strefa niebezpieczna
				</h3>
				<p className='text-xs sm:text-sm text-gray-600 mb-3'>
					Nieodwracalne działania dotyczące Twojego konta
				</p>
				<Button
					variant='destructive'
					size='sm'
					className='text-sm'
					onClick={() => {
						if (
							confirm(
								"Czy na pewno chcesz usunąć konto? Ta akcja jest nieodwracalna!"
							)
						) {
							toast.error("Usuwanie konta - funkcja w przygotowaniu");
						}
					}}>
					Usuń konto
				</Button>
			</div>
		</div>
	);
}

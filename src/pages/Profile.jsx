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
		<div className='space-y-6'>
			{/* Header */}
			<div>
				<h2 className='text-2xl font-bold text-gray-900'>Profil użytkownika</h2>
				<p className='text-sm text-gray-600 mt-1'>
					Zarządzaj swoimi danymi osobowymi i ustawieniami konta
				</p>
			</div>

			<Separator />

			{/* Avatar Section */}
			<div className='flex items-center gap-6'>
				<div className='relative'>
					<div className='h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold'>
						{user?.name?.charAt(0).toUpperCase() || "U"}
					</div>
					<button className='absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-lg transition-colors'>
						<Camera className='h-4 w-4' />
					</button>
				</div>
				<div>
					<h3 className='text-lg font-semibold text-gray-900'>
						{user?.name || "Użytkownik"}
					</h3>
					<p className='text-sm text-gray-600'>{user?.email}</p>
					<button className='mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium'>
						Zmień zdjęcie profilowe
					</button>
				</div>
			</div>

			<Separator />

			{/* Formularz danych osobowych */}
			<div>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
						<User className='h-5 w-5' />
						Dane osobowe
					</h3>
					{!isEditing && (
						<Button
							variant='outline_border'
							size='sm'
							onClick={() => setIsEditing(true)}>
							Edytuj
						</Button>
					)}
				</div>

				<form onSubmit={handleSaveProfile} className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2'>
						{/* Imię i nazwisko */}
						<div className='space-y-2'>
							<Label htmlFor='name'>Imię i nazwisko</Label>
							<Input
								id='name'
								name='name'
								type='text'
								placeholder='Jan Kowalski'
								value={formData.name}
								onChange={handleChange}
								disabled={!isEditing}
								className={!isEditing ? "bg-gray-50" : ""}
							/>
						</div>

						{/* Email */}
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='jan@example.com'
								value={formData.email}
								onChange={handleChange}
								disabled={!isEditing}
								className={!isEditing ? "bg-gray-50" : ""}
							/>
						</div>
					</div>

					{/* Przyciski akcji */}
					{isEditing && (
						<div className='flex gap-3 pt-2'>
							<Button
								type='submit'
								disabled={isSaving}
								className='bg-blue-600 hover:bg-blue-700'>
								{isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
							</Button>
							<Button
								type='button'
								variant='outline'
								onClick={handleCancel}
								disabled={isSaving}>
								Anuluj
							</Button>
						</div>
					)}
				</form>
			</div>

			<Separator />

			{/* Formularz zmiany hasła */}
			<div>
				<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
					<Lock className='h-5 w-5' />
					Zmiana hasła
				</h3>

				<form onSubmit={handleChangePassword} className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-1 max-w-md'>
						{/* Obecne hasło */}
						<div className='space-y-2'>
							<Label htmlFor='currentPassword'>Obecne hasło</Label>
							<Input
								id='currentPassword'
								name='currentPassword'
								type='password'
								placeholder='••••••••'
								value={formData.currentPassword}
								onChange={handleChange}
							/>
						</div>

						{/* Nowe hasło */}
						<div className='space-y-2'>
							<Label htmlFor='newPassword'>Nowe hasło</Label>
							<Input
								id='newPassword'
								name='newPassword'
								type='password'
								placeholder='••••••••'
								value={formData.newPassword}
								onChange={handleChange}
							/>
							<p className='text-xs text-gray-500'>Minimum 8 znaków</p>
						</div>

						{/* Potwierdź nowe hasło */}
						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Potwierdź nowe hasło</Label>
							<Input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								placeholder='••••••••'
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='w-full'
						disabled={isSaving}
						variant='outline_border'>
						{isSaving ? "Zmiana hasła..." : "Zmień hasło"}
					</Button>
				</form>
			</div>

			<Separator />

			{/* Sekcja niebezpieczna */}
			<div>
				<h3 className='text-lg font-semibold text-red-600 mb-2'>
					Strefa niebezpieczna
				</h3>
				<p className='text-sm text-gray-600 mb-4'>
					Nieodwracalne działania dotyczące Twojego konta
				</p>
				<Button
					variant='destructive'
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/AuthContext";
import {
	HelpCircle,
	Mail,
	MessageSquare,
	Send,
	CheckCircle,
	Book,
	Bug,
	Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

export function Support() {
	const { user } = useAuth();

	const [formData, setFormData] = useState({
		subject: "",
		category: "general",
		message: "",
	});

	const [isSending, setIsSending] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// Kategorie zgłoszeń
	const categories = [
		{ value: "general", label: "Ogólne pytanie", icon: MessageSquare },
		{ value: "technical", label: "Problem techniczny", icon: Bug },
		{ value: "course", label: "Pytanie o kurs", icon: Book },
		{ value: "suggestion", label: "Sugestia", icon: Lightbulb },
	];

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
		if (!formData.subject.trim()) {
			toast.error("Wpisz temat wiadomości");
			return;
		}

		if (!formData.message.trim()) {
			toast.error("Wpisz treść wiadomości");
			return;
		}

		if (formData.message.length < 10) {
			toast.error("Wiadomość musi mieć minimum 10 znaków");
			return;
		}

		setIsSending(true);

		try {
			// Tutaj będzie wywołanie API
			// await fetch('/api/support/ticket', {
			//     method: 'POST',
			//     headers: { 'Content-Type': 'application/json' },
			//     body: JSON.stringify({
			//         ...formData,
			//         userEmail: user?.email
			//     })
			// });

			// Symulacja opóźnienia
			await new Promise(resolve => setTimeout(resolve, 1500));

			toast.success("Wiadomość wysłana pomyślnie!");
			setSubmitted(true);

			// Wyczyść formularz
			setFormData({
				subject: "",
				category: "general",
				message: "",
			});

			// Ukryj potwierdzenie po 5 sekundach
			setTimeout(() => setSubmitted(false), 5000);
		} catch (error) {
			toast.error("Nie udało się wysłać wiadomości");
			console.error(error);
		} finally {
			setIsSending(false);
		}
	};

	// Jeśli formularz został wysłany - pokaż potwierdzenie
	if (submitted) {
		return (
			<div className='flex flex-col items-center justify-center py-12 text-center'>
				<div className='rounded-full bg-green-100 p-4 mb-4'>
					<CheckCircle className='h-16 w-16 text-green-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					Dziękujemy za kontakt!
				</h2>
				<p className='text-gray-600 mb-6 max-w-md'>
					Twoja wiadomość została wysłana. Odpowiemy na nią najszybciej jak to
					możliwe, zwykle w ciągu 24 godzin.
				</p>
				<Button onClick={() => setSubmitted(false)} variant='outline'>
					Wyślij kolejną wiadomość
				</Button>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div>
				<h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
					<HelpCircle className='h-7 w-7' />
					Pomoc i wsparcie
				</h2>
				<p className='text-sm text-gray-600 mt-1'>
					Masz pytanie lub problem? Skontaktuj się z nami, a postaramy się pomóc
				</p>
			</div>

			{/* Formularz kontaktowy */}
			<div>
				<h3 className='text-lg font-semibold text-gray-900 mb-4'>
					Formularz kontaktowy
				</h3>

				<form onSubmit={handleSubmit} className='space-y-5'>
					{/* Email użytkownika (readonly) */}
					<div className='space-y-2'>
						<Label htmlFor='email'>Twój email</Label>
						<Input
							id='email'
							type='email'
							value={user?.email || ""}
							disabled
							className='bg-gray-50'
						/>
					</div>

					{/* Kategoria */}
					<div className='space-y-2'>
						<Label htmlFor='category'>Kategoria</Label>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
							{categories.map(cat => {
								const Icon = cat.icon;
								return (
									<button
										key={cat.value}
										type='button'
										onClick={() =>
											setFormData(prev => ({ ...prev, category: cat.value }))
										}
										className={`
											flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
											${
												formData.category === cat.value
													? "border-blue-600 bg-blue-50 text-blue-600"
													: "border-gray-200 hover:border-gray-300 text-gray-700"
											}
										`}>
										<Icon className='h-6 w-6' />
										<span className='text-xs font-medium text-center'>
											{cat.label}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Temat */}
					<div className='space-y-2'>
						<Label htmlFor='subject'>Temat</Label>
						<Input
							id='subject'
							name='subject'
							type='text'
							placeholder='Np. Problem z zalogowaniem się do kursu'
							value={formData.subject}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Wiadomość */}
					<div className='space-y-2'>
						<Label htmlFor='message'>Wiadomość</Label>
						<textarea
							id='message'
							name='message'
							rows={6}
							placeholder='Opisz szczegółowo swój problem lub pytanie...'
							value={formData.message}
							onChange={handleChange}
							required
							className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
						/>
						<p className='text-xs text-gray-500'>
							{formData.message.length} / 1000 znaków (minimum 10)
						</p>
					</div>

					{/* Przyciski */}
					<div className='flex items-center justify-center gap-3 pt-2'>
						<Button
							type='submit'
							disabled={isSending}
							className='bg-blue-600 hover:bg-blue-700'>
							{isSending ? (
								<>
									<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
									Wysyłanie...
								</>
							) : (
								<>
									<Send className='h-9 w-50 ' />
									Wyślij wiadomość
								</>
							)}
						</Button>
						<Button
							type='button'
							variant='outline'
							size='md'
							onClick={() => {
								setFormData({
									subject: "",
									category: "general",
									message: "",
								});
							}}
							disabled={isSending}>
							Wyczyść
						</Button>
					</div>
				</form>
			</div>

			<Separator />

			{/* Informacje dodatkowe */}
			<div className='rounded-lg bg-blue-50 p-4 border border-blue-200'>
				<h4 className='font-semibold text-blue-900 mb-2 flex items-center gap-2'>
					<HelpCircle className='h-5 w-5' />
					Czas odpowiedzi
				</h4>
				<p className='text-sm text-blue-800'>
					Zwykle odpowiadamy w ciągu <strong>24 godzin</strong> w dni robocze. W
					weekendy i święta czas odpowiedzi może być dłuższy.
				</p>
			</div>
		</div>
	);
}

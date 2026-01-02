import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
	Mail,
	User,
	MessageSquare,
	Clock,
	Bug,
	Book,
	Lightbulb,
} from "lucide-react";

export function SupportResponseModal({
	isOpen,
	onClose,
	ticket = null,
	onSend,
}) {
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);

	// Reset formularza przy zamknięciu
	useEffect(() => {
		if (!isOpen) {
			setMessage("");
		}
	}, [isOpen]);

	const handleSubmit = async e => {
		e.preventDefault();

		// Walidacja
		if (!message.trim()) {
			toast.error("Wpisz treść odpowiedzi");
			return;
		}

		if (message.length < 10) {
			toast.error("Odpowiedź musi mieć minimum 10 znaków");
			return;
		}

		setIsSending(true);

		try {
			// API call
			// const response = await fetch(`/api/admin/support/${ticket.id}/respond`, {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({
			// 		message,
			// 		status: 'closed' // Zmień status na zamknięte po odpowiedzi
			// 	})
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 1000));

			toast.success("Odpowiedź wysłana do użytkownika!");

			// Wywołaj callback
			if (onSend) {
				onSend({
					ticketId: ticket.id,
					message,
					respondedAt: new Date().toISOString(),
				});
			}

			// Zamknij modal
			onClose();
		} catch (error) {
			toast.error("Nie udało się wysłać odpowiedzi");
			console.error(error);
		} finally {
			setIsSending(false);
		}
	};

	const getPriorityBadge = priority => {
		const variants = {
			high: { className: "bg-red-100 text-red-800", label: "Wysoki" },
			medium: { className: "bg-yellow-100 text-yellow-800", label: "Średni" },
			low: { className: "bg-green-100 text-green-800", label: "Niski" },
		};
		const config = variants[priority] || variants.medium;
		return (
			<Badge variant='secondary' className={config.className}>
				{config.label}
			</Badge>
		);
	};

	// Mapowanie kategorii na ikony i nazwy
	const getCategoryInfo = category => {
		const categories = {
			general: { label: "Ogólne pytanie", icon: MessageSquare },
			technical: { label: "Problem techniczny", icon: Bug },
			course: { label: "Pytanie o kurs", icon: Book },
			suggestion: { label: "Sugestia", icon: Lightbulb },
		};
		return categories[category] || categories.general;
	};

	if (!ticket) return null;

	const categoryInfo = getCategoryInfo(ticket.category);
	const CategoryIcon = categoryInfo.icon;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Odpowiedź na zgłoszenie</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Informacje o zgłoszeniu */}
					<div className='bg-gray-50 rounded-lg p-4 space-y-3'>
						<div className='flex items-start justify-between'>
							<h3 className='font-semibold text-gray-900 text-lg'>
								{ticket.subject}
							</h3>
							{getPriorityBadge(ticket.priority)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
							<div className='flex items-center gap-2 text-gray-600'>
								<User className='h-4 w-4 flex-shrink-0' />
								<span>
									<strong>Użytkownik:</strong> {ticket.user}
								</span>
							</div>
							<div className='flex items-center gap-2 text-gray-600'>
								<CategoryIcon className='h-4 w-4 flex-shrink-0' />
								<span>
									<strong>Kategoria:</strong> {categoryInfo.label}
								</span>
							</div>
							<div className='flex items-center gap-2 text-gray-600'>
								<Clock className='h-4 w-4 flex-shrink-0' />
								<span>
									<strong>Data:</strong> {ticket.createdAt}
								</span>
							</div>
							<div className='flex items-center gap-2 text-gray-600'>
								<Mail className='h-4 w-4 flex-shrink-0' />
								<span>
									<strong>Status:</strong>{" "}
									<span>
										{ticket.status === "open" && "Otwarte"}
										{ticket.status === "in_progress" && "W trakcie"}
										{ticket.status === "closed" && "Zamknięte"}
									</span>
								</span>
							</div>
						</div>

						{/* Treść zgłoszenia */}
						{ticket.message && (
							<div className='pt-3 border-t border-gray-200'>
								<p className='text-sm font-semibold text-gray-700 mb-2'>
									Treść zgłoszenia:
								</p>
								<div className='text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap max-h-40 overflow-y-auto'>
									{ticket.message}
								</div>
							</div>
						)}
					</div>

					{/* Formularz odpowiedzi */}
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='message'>Twoja odpowiedź *</Label>
							<textarea
								id='message'
								rows={8}
								placeholder='Wpisz odpowiedź do użytkownika...&#10;&#10;Przykład:&#10;Dzień dobry,&#10;&#10;Dziękujemy za zgłoszenie. Problem został rozwiązany...&#10;&#10;Pozdrawiamy,&#10;Zespół Wsparcia'
								value={message}
								onChange={e => setMessage(e.target.value)}
								maxLength={2000}
								className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
								required
							/>
							<p className='text-xs text-gray-500'>
								{message.length} / 2000 znaków (minimum 10)
							</p>
						</div>

						{/* Info box */}
						<div className='rounded-lg bg-blue-50 p-4 border border-blue-200'>
							<p className='text-sm text-blue-800'>
								📧 Użytkownik otrzyma odpowiedź na adres email powiązany z
								kontem. Po wysłaniu odpowiedzi zgłoszenie zostanie automatycznie
								zamknięte.
							</p>
						</div>

						<DialogFooter>
							<Button
								type='submit'
								variant='outline_border'
								size='md'
								disabled={isSending}>
								{isSending ? (
									<>
										<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
										Wysyłanie...
									</>
								) : (
									<>
										<Mail className='h-4 w-4 mr-2' />
										Wyślij odpowiedź
									</>
								)}
							</Button>
							<Button
								type='button'
								variant='outline_border'
								size='md'
								onClick={onClose}
								disabled={isSending}>
								Anuluj
							</Button>
						</DialogFooter>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

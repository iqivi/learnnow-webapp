import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, PlayCircle, Star, TrendingUp } from "lucide-react";

export function CoursePreview({
	id ,
	title = "Kurs cyberbezpieczeństwa dla każdego",
	description = "Bez ogródek i lania wody! Dla każdego z minimum 50-letnim doświadczeniem w cyberbezpieczeństwie!",
	thumbnail = "src/assets/course_img.svg",
	progress = 0,
	totalLessons = 45,
	completedLessons = 12,
	duration = 720,
	lastWatched = "Lekcja 12: Podstawy szyfrowania",
	onContinue,
	className = "",
}) {
	const handleContinue = e => {
		e.stopPropagation(); // Nie wywołuj handleClick
		if (onContinue) {
			onContinue(id);
		}
	};

	const formatDuration = minutes => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	return (
		<Card
			className={`group overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
			<div className='flex flex-col md:flex-row'>
				{/* Thumbnail Section */}
				<div className='relative w-full md:w-2/5 lg:w-1/3 overflow-hidden bg-gray-100'>
					<div className='aspect-video md:aspect-auto md:h-full'>
						{thumbnail ? (
							<img
								src={thumbnail}
								alt={title}
								className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
							/>
						) : (
							<div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100'>
								<PlayCircle className='h-12 w-12 sm:h-16 sm:w-16 text-gray-400' />
							</div>
						)}

						{/* Progress Overlay */}
						<div className='absolute bottom-0 left-0 h-2 w-full bg-gray-300'>
							<div
								className='h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300'
								style={{ width: `${progress}%` }}
							/>
						</div>

						{/* Progress Badge */}
						<Badge
							variant='secondary'
							className='absolute right-3 top-3 bg-black/80 text-white backdrop-blur-sm text-xs sm:text-sm'>
							{progress}% ukończone
						</Badge>
					</div>
				</div>

				{/* Content Section */}
				<div className='flex flex-1 flex-col justify-between p-4 sm:p-5 lg:p-6'>
					<div>
						{/* Title */}
						<h2 className='mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2'>
							{title}
						</h2>

						{/* Description */}
						<p className='mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base text-gray-600 line-clamp-2'>
							{description}
						</p>

						{/* Last Watched */}
						{lastWatched && (
							<div className='mb-3 sm:mb-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500'>
								<TrendingUp className='h-3 w-3 sm:h-4 sm:w-4' />
								<span>Ostatnio: {lastWatched}</span>
							</div>
						)}

						{/* Stats Row */}
						<div className='mb-3 sm:mb-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600'>
							{completedLessons && totalLessons && (
								<div className='flex items-center gap-1.5'>
									<PlayCircle className='h-3 w-3 sm:h-4 sm:w-4' />
									<span className='font-medium'>
										{completedLessons}/{totalLessons} lekcji
									</span>
								</div>
							)}

							{duration && (
								<div className='flex items-center gap-1.5'>
									<Clock className='h-3 w-3 sm:h-4 sm:w-4' />
									<span>{formatDuration(duration)}</span>
								</div>
							)}
						</div>
					</div>

					{/* Action Button */}
					<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 border-t pt-3 sm:pt-4'>
						<div className='text-xs sm:text-sm text-gray-500'>
							Jeszcze{" "}
							<span className='font-semibold text-gray-900'>
								{totalLessons - completedLessons} lekcji
							</span>{" "}
							do ukończenia
						</div>
						<Button
							onClick={handleContinue}
							variant='outline_primary'
							size='lg'
							className='w-full sm:w-auto text-xs sm:text-sm'>
							<PlayCircle className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
							Kontynuuj
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}

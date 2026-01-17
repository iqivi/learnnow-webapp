import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, PlayCircle, Users, Star, BookOpen } from "lucide-react";
import courseImg from "@/assets/course_img.svg";

export function CourseDemo({
	id,
	title = "Kurs cyberbezpieczeństwa dla każdego",
	description = "Bez ogródek i lania wody! Dla każdego z minimum 50-letnim doświadczeniem w cyberbezpieczeństwie!",
	thumbnail = courseImg,
	instructor = "Jan Kowalski",
	instructorAvatar,
	duration = 720,
	studentsCount = 1250,
	rating = 4.8,
	reviewsCount = 245,
	price = 199,
	totalLessons = 45,
	level = "Początkujący",
	category,
	onEnroll,
	onViewDetails,
	className = "",
}) {
	const handleEnroll = e => {
		e.stopPropagation();
		if (onEnroll) {
			onEnroll(id);
		}
	};

	const handleViewDetails = () => {
		if (onViewDetails) {
			onViewDetails(id);
		}
	};

	const formatDuration = minutes => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	const formatStudents = count => {
		if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}k`;
		}
		return count;
	};

	return (
		<Card
			className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
			onClick={handleEnroll}>
			<div className='flex flex-col md:flex-row'>
				{/* Thumbnail Section */}
				<div className='relative w-full md:w-2/5 lg:w-1/3 overflow-hidden'>
					<div className='aspect-video md:aspect-auto md:h-full p-3 sm:p-4 lg:p-6'>
						{thumbnail ? (
							<img
								src={thumbnail}
								alt={title}
								className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-md'
							/>
						) : (
							<div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100'>
								<BookOpen className='h-12 w-12 sm:h-16 sm:w-16 text-gray-400' />
							</div>
						)}

						{/* Level Badge */}
						{level && (
							<Badge
								variant='secondary'
								className='absolute left-3 top-3 bg-white/90 backdrop-blur-sm text-xs sm:text-sm'>
								{level}
							</Badge>
						)}

						{/* Duration Badge */}
						{duration && (
							<div className='absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
								{formatDuration(duration)}
							</div>
						)}
					</div>
				</div>

				{/* Content Section */}
				<div className='flex flex-1 flex-col justify-between p-4 sm:p-5 lg:p-6'>
					<div>
						{/* Category Tag */}
						{category && (
							<div className='mb-2'>
								<span className='inline-block rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-xs font-medium text-blue-700'>
									{category}
								</span>
							</div>
						)}

						{/* Title */}
						<h2 className='mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2 transition-colors group-hover:text-blue-600'>
							{title}
						</h2>

						{/* Description */}
						<p className='mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base text-gray-600 line-clamp-2'>
							{description}
						</p>

						{/* Instructor */}
						{instructor && (
							<div className='mb-3 sm:mb-4 flex items-center gap-2'>
								{instructorAvatar ? (
									<img
										src={instructorAvatar}
										alt={instructor}
										className='h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover'
									/>
								) : (
									<div className='flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs sm:text-sm font-semibold text-gray-600'>
										{instructor.charAt(0).toUpperCase()}
									</div>
								)}
								<span className='text-xs sm:text-sm font-medium text-gray-700'>
									{instructor}
								</span>
							</div>
						)}

						{/* Stats Row */}
						<div className='mb-3 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600'>
							{rating && (
								<div className='flex items-center gap-1'>
									<Star className='h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400' />
									<span className='font-semibold'>{rating.toFixed(1)}</span>
									{reviewsCount && (
										<span className='text-gray-500'>
											({formatStudents(reviewsCount)})
										</span>
									)}
								</div>
							)}

							{studentsCount && (
								<div className='flex items-center gap-1.5'>
									<Users className='h-3 w-3 sm:h-4 sm:w-4' />
									<span>{formatStudents(studentsCount)} studentów</span>
								</div>
							)}

							{totalLessons && (
								<div className='flex items-center gap-1.5'>
									<PlayCircle className='h-3 w-3 sm:h-4 sm:w-4' />
									<span>{totalLessons} lekcji</span>
								</div>
							)}
						</div>
					</div>

					{/* Action Footer */}
					<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 border-t pt-3 sm:pt-4'>
						<div>
							{price !== undefined && price !== null ? (
								price === 0 ? (
									<span className='text-lg sm:text-xl lg:text-2xl font-bold text-green-600'>
										Darmowy
									</span>
								) : (
									<span className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900'>
										{price} zł
									</span>
								)
							) : null}
						</div>
						<Button
							onClick={handleEnroll}
							className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm'
							size='lg'>
							<PlayCircle className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
							Zapisz się
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}

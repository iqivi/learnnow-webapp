import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Users, Star, BookOpen, PlayCircle } from "lucide-react";

const CourseCard = ({
	id,
	title,
	description,
	thumbnail,
	instructor,
	instructorAvatar,
	duration,
	studentsCount,
	rating,
	reviewsCount,
	price,
	level,
	category,
	lessonsCount,
	isEnrolled = false,
	progress = 0,
	onCardClick,
	className = "",
}) => {
	const handleClick = () => {
		if (onCardClick) {
			onCardClick(id);
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
			className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
			onClick={handleClick}>
			{/* Thumbnail Section */}
			<div className='relative aspect-video w-full overflow-hidden bg-gray-100'>
				{thumbnail ? (
					<img
						src={thumbnail}
						alt={title}
						className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100'>
						<BookOpen className='h-16 w-16 text-gray-400' />
					</div>
				)}

				{/* Duration Badge */}
				{duration && (
					<div className='absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
						{formatDuration(duration)}
					</div>
				)}

				{/* Level Badge */}
				{level && (
					<Badge
						variant='secondary'
						className='absolute left-2 top-2 bg-white/90 backdrop-blur-sm'>
						{level}
					</Badge>
				)}

				{/* Progress Bar (for enrolled courses) */}
				{isEnrolled && progress > 0 && (
					<div className='absolute bottom-0 left-0 h-1 w-full bg-gray-300'>
						<div
							className='h-full bg-green-500 transition-all duration-300'
							style={{ width: `${progress}%` }}
						/>
					</div>
				)}
			</div>

			{/* Content Section */}
			<div className='p-4'>
				{/* Category Tag */}
				{category && (
					<div className='mb-2'>
						<span className='inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
							{category}
						</span>
					</div>
				)}

				{/* Title */}
				<h3 className='mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600'>
					{title}
				</h3>

				{/* Description */}
				{description && (
					<p className='mb-3 line-clamp-2 text-sm text-gray-600'>
						{description}
					</p>
				)}

				{/* Instructor */}
				{instructor && (
					<div className='mb-3 flex items-center gap-2'>
						{instructorAvatar ? (
							<img
								src={instructorAvatar}
								alt={instructor}
								className='h-6 w-6 rounded-full object-cover'
							/>
						) : (
							<div className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600'>
								{instructor.charAt(0).toUpperCase()}
							</div>
						)}
						<span className='text-sm text-gray-700'>{instructor}</span>
					</div>
				)}

				{/* Stats Row */}
				<div className='mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-600'>
					{rating && (
						<div className='flex items-center gap-1'>
							<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
							<span className='font-semibold'>{rating.toFixed(1)}</span>
							{reviewsCount && (
								<span className='text-gray-500'>
									({formatStudents(reviewsCount)})
								</span>
							)}
						</div>
					)}

					{studentsCount && (
						<div className='flex items-center gap-1'>
							<Users className='h-4 w-4' />
							<span>{formatStudents(studentsCount)}</span>
						</div>
					)}

					{lessonsCount && (
						<div className='flex items-center gap-1'>
							<PlayCircle className='h-4 w-4' />
							<span>{lessonsCount} lekcji</span>
						</div>
					)}
				</div>

				{/* Footer: Price and Action */}
				<div className='flex items-center justify-between border-t pt-3'>
					<div>
						{price !== undefined && price !== null ? (
							price === 0 ? (
								<span className='text-lg font-bold text-green-600'>
									Darmowy
								</span>
							) : (
								<span className='text-lg font-bold text-gray-900'>
									{price} zł
								</span>
							)
						) : null}
					</div>

					{isEnrolled ? (
						<Button
							size='sm'
							variant='default'
							className='bg-blue-600 hover:bg-blue-700'
							onClick={e => {
								e.stopPropagation();
								// Handle continue course
							}}>
							Kontynuuj
						</Button>
					) : (
						<Button
							size='sm'
							variant='outline'
							onClick={e => {
								e.stopPropagation();
								// Handle enroll/view details
							}}>
							Zobacz więcej
						</Button>
					)}
				</div>
			</div>
		</Card>
	);
};

export default CourseCard;

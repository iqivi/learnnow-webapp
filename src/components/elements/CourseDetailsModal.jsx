import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Clock,
	Users,
	Star,
	BookOpen,
	PlayCircle,
	CheckCircle,
	Award,
	BarChart,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

export function CourseDetailsModal({ course }) {
	const navigate = useNavigate();
	if (!course) return null;

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

	const handleEnroll = () => {
		console.log("Zapisz się do kursu:", course.id);
		navigate(`/course/${course.id}/watch`);

		// Tu będzie logika zapisu
	};

	const handleContinue = e => {
		e.stopPropagation(); // Nie wywołuj handleClick
		navigate(`/course/${course.id}/watch`);
	};

	return (
		<div className='course-details flex flex-col gap-6'>
			{/* Thumbnail */}
			<div className='relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100'>
				{course.thumbnail ? (
					<img
						src={course.thumbnail}
						alt={course.title}
						className='w-full h-full object-cover'
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100'>
						<BookOpen className='h-20 w-20 text-gray-400' />
					</div>
				)}

				{/* Progress overlay dla zapisanych kursów */}
				{course.isEnrolled && course.progress > 0 && (
					<div className='absolute bottom-0 left-0 h-2 w-full bg-gray-300'>
						<div
							className='h-full bg-gradient-to-r from-blue-500 to-blue-600'
							style={{ width: `${course.progress}%` }}
						/>
					</div>
				)}
			</div>

			{/* Header z tytułem i badges */}
			<div>
				<div className='flex flex-wrap gap-2 mb-3'>
					{course.category && (
						<Badge variant='secondary' className='bg-blue-50 text-blue-700'>
							{course.category}
						</Badge>
					)}
					{course.level && <Badge variant='outline'>{course.level}</Badge>}
					{course.isEnrolled && (
						<Badge className='bg-green-600'>
							<CheckCircle className='h-3 w-3 mr-1' />
							Zapisany
						</Badge>
					)}
				</div>

				<h2 className='text-3xl font-bold text-gray-900 mb-3'>
					{course.title}
				</h2>

				<p className='text-gray-600 text-lg'>{course.description}</p>
			</div>

			<Separator />

			{/* Stats Grid */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{course.rating && (
					<div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
						<Star className='h-5 w-5 text-yellow-400 fill-yellow-400 mb-2' />
						<span className='text-2xl font-bold text-gray-900'>
							{course.rating.toFixed(1)}
						</span>
						<span className='text-sm text-gray-600'>
							{course.reviewsCount &&
								`(${formatStudents(course.reviewsCount)})`}
						</span>
					</div>
				)}

				{course.studentsCount && (
					<div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
						<Users className='h-5 w-5 text-blue-600 mb-2' />
						<span className='text-2xl font-bold text-gray-900'>
							{formatStudents(course.studentsCount)}
						</span>
						<span className='text-sm text-gray-600'>studentów</span>
					</div>
				)}

				{course.lessonsCount && (
					<div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
						<PlayCircle className='h-5 w-5 text-purple-600 mb-2' />
						<span className='text-2xl font-bold text-gray-900'>
							{course.lessonsCount}
						</span>
						<span className='text-sm text-gray-600'>lekcji</span>
					</div>
				)}

				{course.duration && (
					<div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
						<Clock className='h-5 w-5 text-green-600 mb-2' />
						<span className='text-2xl font-bold text-gray-900'>
							{formatDuration(course.duration)}
						</span>
						<span className='text-sm text-gray-600'>treści</span>
					</div>
				)}
			</div>

			{/* Instructor */}
			{course.instructor && (
				<>
					<Separator />
					<div className='flex items-center gap-4'>
						{course.instructorAvatar ? (
							<img
								src={course.instructorAvatar}
								alt={course.instructor}
								className='h-16 w-16 rounded-full object-cover'
							/>
						) : (
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-600'>
								{course.instructor.charAt(0).toUpperCase()}
							</div>
						)}
						<div>
							<p className='text-sm text-gray-600'>Prowadzący</p>
							<p className='text-lg font-semibold text-gray-900'>
								{course.instructor}
							</p>
						</div>
					</div>
				</>
			)}

			{/* Progress (tylko dla zapisanych) */}
			{course.isEnrolled && (
				<>
					<Separator />
					<div className='bg-blue-50 rounded-lg p-4'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm font-medium text-gray-700'>
								Twój postęp
							</span>
							<span className='text-sm font-bold text-blue-600'>
								{course.progress}%
							</span>
						</div>
						<div className='h-3 w-full bg-gray-200 rounded-full overflow-hidden'>
							<div
								className='h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300'
								style={{ width: `${course.progress}%` }}
							/>
						</div>
						<p className='text-xs text-gray-600 mt-2'>
							{course.progress === 100
								? "Gratulacje! Ukończyłeś kurs!"
								: `Jeszcze ${100 - course.progress}% do ukończenia`}
						</p>
					</div>
				</>
			)}

			<Separator />

			{/* Action Buttons */}
			<div className='flex items-center justify-between'>
				<div>
					{!course.isEnrolled && course.price !== undefined && (
						<div>
							{course.price === 0 ? (
								<span className='text-3xl font-bold text-green-600'>
									Darmowy
								</span>
							) : (
								<span className='text-3xl font-bold text-gray-900'>
									{course.price} zł
								</span>
							)}
						</div>
					)}
				</div>

				<div className='flex gap-3'>
					{course.isEnrolled ? (
						<Button
							onClick={handleContinue}
							variant='outline_primary'
							size='lg'
							className='w-full sm:w-auto text-xs sm:text-sm'>
							<PlayCircle className='mr-2 h-5 w-5' />
							{course.progress > 0 ? "Kontynuuj naukę" : "Rozpocznij kurs"}
						</Button>
					) : (
						<Button
							onClick={handleEnroll}
							size='lg'
							className='bg-blue-600 hover:bg-blue-700'>
							<PlayCircle className='mr-2 h-5 w-5' />
							Zapisz się na kurs
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

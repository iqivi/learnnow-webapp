// Quiz Display Component for CoursePlayerPage
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function QuizDisplay({ lesson, onComplete }) {
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [score, setScore] = useState(null);

	const handleSelectAnswer = (questionId, optionIndex) => {
		if (isSubmitted) return; // Nie pozwalaj zmieniać po submit
		setSelectedAnswers({
			...selectedAnswers,
			[questionId]: optionIndex,
		});
	};

	const handleSubmit = () => {
		// Sprawdź czy wszystkie pytania mają odpowiedzi
		const allAnswered =
			lesson.questions.length === Object.keys(selectedAnswers).length;

		if (!allAnswered) {
			toast.error("Odpowiedz na wszystkie pytania!");
			return;
		}

		// Oblicz wynik
		let correct = 0;
		lesson.questions.forEach(question => {
			if (selectedAnswers[question.id] === question.correctAnswer) {
				correct++;
			}
		});

		const percentage = Math.round((correct / lesson.questions.length) * 100);
		setScore(percentage);
		setIsSubmitted(true);

		// Sprawdź czy zaliczono
		const passed = percentage >= (lesson.passingScore || 70);
		if (passed) {
			toast.success(`Gratulacje! Zaliczyłeś quiz z wynikiem ${percentage}%`);
			if (onComplete) onComplete();
		} else {
			toast.error(
				`Nie udało się. Wynik: ${percentage}%. Wymagane: ${
					lesson.passingScore || 70
				}%`
			);
		}
	};

	const handleRetry = () => {
		setSelectedAnswers({});
		setIsSubmitted(false);
		setScore(null);
	};

	const passed = score >= (lesson.passingScore || 70);

	return (
		<div className='space-y-6'>
			{/* Quiz Header */}
			<div className='flex items-center gap-3'>
				<div className='p-3 rounded-lg bg-green-100'>
					<HelpCircle className='h-6 w-6 text-green-600' />
				</div>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>{lesson.title}</h2>
					<p className='text-sm text-gray-600'>
						{lesson.questions.length} pytań • Wymagane{" "}
						{lesson.passingScore || 70}%
					</p>
				</div>
			</div>

			{/* Result Summary */}
			{isSubmitted && (
				<Card
					className={`p-6 ${
						passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
					}`}>
					<div className='flex items-center gap-4'>
						{passed ? (
							<CheckCircle className='h-12 w-12 text-green-600' />
						) : (
							<XCircle className='h-12 w-12 text-red-600' />
						)}
						<div className='flex-1'>
							<h3
								className={`text-xl font-bold ${
									passed ? "text-green-900" : "text-red-900"
								}`}>
								{passed ? "Quiz zaliczony!" : "Quiz niezaliczony"}
							</h3>
							<p
								className={`text-sm ${
									passed ? "text-green-700" : "text-red-700"
								}`}>
								Twój wynik: {score}% (
								{
									lesson.questions.filter(
										q => selectedAnswers[q.id] === q.correctAnswer
									).length
								}{" "}
								/ {lesson.questions.length} poprawnych odpowiedzi)
							</p>
						</div>
						{!passed && (
							<Button onClick={handleRetry} variant='outline'>
								<RotateCcw className='h-4 w-4 mr-2' />
								Spróbuj ponownie
							</Button>
						)}
					</div>
				</Card>
			)}

			{/* Questions */}
			<div className='space-y-4'>
				{lesson.questions.map((question, qIndex) => {
					const userAnswer = selectedAnswers[question.id];
					const isCorrect = userAnswer === question.correctAnswer;
					const isAnswered = userAnswer !== undefined;

					return (
						<Card key={question.id} className='p-6'>
							<div className='flex items-start gap-3 mb-4'>
								<div
									className={`
										flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold
										${
											!isSubmitted
												? "bg-gray-200 text-gray-700"
												: isCorrect
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}
									`}>
									{qIndex + 1}
								</div>
								<div className='flex-1'>
									<p className='font-semibold text-gray-900 mb-4'>
										{question.question}
									</p>

									{/* Options */}
									<div className='space-y-2'>
										{question.options.map((option, optIndex) => {
											const isSelected = userAnswer === optIndex;
											const isCorrectOption =
												question.correctAnswer === optIndex;

											let optionClasses =
												"w-full text-left p-4 rounded-lg border-2 transition-all ";

											if (!isSubmitted) {
												// Przed submitem
												optionClasses += isSelected
													? "border-blue-600 bg-blue-50"
													: "border-gray-200 hover:border-gray-300";
											} else {
												// Po submicie
												if (isCorrectOption) {
													optionClasses +=
														"border-green-600 bg-green-50 text-green-900";
												} else if (isSelected && !isCorrectOption) {
													optionClasses +=
														"border-red-600 bg-red-50 text-red-900";
												} else {
													optionClasses += "border-gray-200 opacity-50";
												}
											}

											return (
												<button
													key={optIndex}
													onClick={() =>
														handleSelectAnswer(question.id, optIndex)
													}
													disabled={isSubmitted}
													className={optionClasses}>
													<div className='flex items-center gap-3'>
														<div
															className={`
																flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
																${
																	isSelected && !isSubmitted
																		? "border-blue-600 bg-blue-600"
																		: isCorrectOption && isSubmitted
																		? "border-green-600 bg-green-600"
																		: "border-gray-300"
																}
															`}>
															{isSelected && !isSubmitted && (
																<div className='w-2 h-2 bg-white rounded-full' />
															)}
															{isCorrectOption && isSubmitted && (
																<CheckCircle className='h-4 w-4 text-white' />
															)}
															{isSelected &&
																!isCorrectOption &&
																isSubmitted && (
																	<XCircle className='h-4 w-4 text-white' />
																)}
														</div>
														<span className='flex-1 text-sm'>
															{String.fromCharCode(65 + optIndex)}. {option}
														</span>
													</div>
												</button>
											);
										})}
									</div>

									{/* Feedback after submission */}
									{isSubmitted && (
										<div className='mt-3'>
											{isCorrect ? (
												<div className='flex items-center gap-2 text-sm text-green-700'>
													<CheckCircle className='h-4 w-4' />
													<span>Poprawna odpowiedź!</span>
												</div>
											) : (
												<div className='flex items-center gap-2 text-sm text-red-700'>
													<XCircle className='h-4 w-4' />
													<span>
														Niepoprawna odpowiedź. Prawidłowa to:{" "}
														{String.fromCharCode(65 + question.correctAnswer)}
													</span>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</Card>
					);
				})}
			</div>

			{/* Submit Button */}
			{!isSubmitted && (
				<div className='flex justify-center pt-4'>
					<Button
						onClick={handleSubmit}
						className='bg-green-600 hover:bg-green-700 px-8'
						disabled={
							Object.keys(selectedAnswers).length !== lesson.questions.length
						}>
						<CheckCircle className='h-4 w-4 mr-2' />
						Sprawdź odpowiedzi
					</Button>
				</div>
			)}
		</div>
	);
}

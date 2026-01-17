import { createContext, useState, useEffect, useCallback } from "react";

const CourseProgressContext = createContext(null);

export function CourseProgressProvider({ children }) {
	const [courseProgress, setCourseProgress] = useState(() => {
		const saved = localStorage.getItem("courseProgress");
		return saved ? JSON.parse(saved) : {};
	});

	// Zapisz progress do localStorage
	useEffect(() => {
		localStorage.setItem("courseProgress", JSON.stringify(courseProgress));
	}, [courseProgress]);

	// Oznacz lekcję jako ukończoną i zwiększ progress
	const markLessonAsCompleted = useCallback((courseId, lessonId) => {
		setCourseProgress(prev => {
			const courseKey = `course_${courseId}`;
			const currentCourse = prev[courseKey] || {
				completedLessons: [],
				progress: 0,
				quizCompleted: false,
			};

			// Dodaj lekcję do listy ukończonych (unikaj duplikatów)
			const completedLessons = [
				...new Set([...currentCourse.completedLessons, lessonId]),
			];

			return {
				...prev,
				[courseKey]: {
					...currentCourse,
					completedLessons,
				},
			};
		});
	}, []);

	// Oblicz progress kursu na podstawie liczby ukończonych lekcji (bez quizu)
	const getCourseProgress = useCallback(
		(courseId, totalLessons) => {
			const courseKey = `course_${courseId}`;
			const course = courseProgress[courseKey];

			if (!course) return 0;

			// Liczymy tylko lekcje, nie liczymy quizu (ostatnia lekcja zwykle)
			const nonQuizLessons = totalLessons - 1;
			if (nonQuizLessons === 0) return 0;

			const completedNonQuiz = course.completedLessons.filter(
				id => !id.toString().endsWith("5") // Quizy zwykle mają id kończące się na 5
			).length;

			return Math.round((completedNonQuiz / nonQuizLessons) * 100);
		},
		[courseProgress]
	);

	// Oznacz quiz jako ukończony i ustaw kurs na 100%
	const markQuizAsCompleted = useCallback(courseId => {
		setCourseProgress(prev => {
			const courseKey = `course_${courseId}`;
			const currentCourse = prev[courseKey] || {
				completedLessons: [],
				progress: 0,
				quizCompleted: false,
			};

			return {
				...prev,
				[courseKey]: {
					...currentCourse,
					quizCompleted: true,
				},
			};
		});
	}, []);

	// Sprawdź czy quiz jest ukończony
	const isQuizCompleted = useCallback(
		courseId => {
			const courseKey = `course_${courseId}`;
			return courseProgress[courseKey]?.quizCompleted || false;
		},
		[courseProgress]
	);

	const value = {
		courseProgress,
		markLessonAsCompleted,
		markQuizAsCompleted,
		getCourseProgress,
		isQuizCompleted,
	};

	return (
		<CourseProgressContext.Provider value={value}>
			{children}
		</CourseProgressContext.Provider>
	);
}

export { CourseProgressContext };

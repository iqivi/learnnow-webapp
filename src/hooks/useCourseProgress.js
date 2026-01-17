import { useContext } from "react";
import { CourseProgressContext } from "@/context/CourseProgressContext";

export function useCourseProgress() {
	const context = useContext(CourseProgressContext);
	if (!context) {
		throw new Error(
			"useCourseProgress must be used within CourseProgressProvider"
		);
	}
	return context;
}

// hooks/useCourses.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService } from "../src/api/services";
import { toast } from "sonner";

function useCourses() {
	const { data: courses, isLoading } = useQuery({
		queryKey: ["courses"],
		queryFn: async () => {
			const response = await coursesService.getAll();
			return response.data;
		},
	});

	return { courses, isLoading };
}

function useCourse(id) {
	const { data: course, isLoading } = useQuery({
		queryKey: ["course", id],
		queryFn: async () => {
			const response = await coursesService.getById(id);
			return response.data;
		},
		enabled: !!id, // Nie wywołuj jeśli brak id
	});

	return { course, isLoading };
}

function useMyCourses() {
	const { data: myCourses, isLoading } = useQuery({
		queryKey: ["myCourses"],
		queryFn: async () => {
			const response = await coursesService.getMyCourses();
			return response.data;
		},
	});

	return { myCourses, isLoading };
}

function usePurchaseCourse() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: courseId => coursesService.purchaseCourse(courseId),
		onSuccess: () => {
			queryClient.invalidateQueries(["myCourses"]);
			toast.success("Kurs zakupiony pomyślnie!");
		},
		onError: error => {
			toast.error(error.response?.data?.message || "Błąd zakupu");
		},
	});

	return mutation;
}

function useUpdateProgress() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ courseId, lessonId, progress }) =>
			coursesService.updateProgress(courseId, lessonId, progress),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries(["course", variables.courseId]);
			queryClient.invalidateQueries(["myCourses"]);
		},
	});

	return mutation;
}

export {
	useCourses,
	useCourse,
	useMyCourses,
	usePurchaseCourse,
	useUpdateProgress,
};

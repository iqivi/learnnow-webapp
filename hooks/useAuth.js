// hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/services";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useAuth() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	// Pobierz aktualnego użytkownika
	const { data: user, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: async () => {
			const token = localStorage.getItem("token");
			if (!token) return null;

			try {
				const response = await authService.getCurrentUser();
				return response.data;
			} catch (error) {
				localStorage.removeItem("token");
				return null;
			}
		},
		retry: false,
	});

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: ({ email, password }) => authService.login(email, password),
		onSuccess: response => {
			localStorage.setItem("token", response.data.token);
			queryClient.setQueryData(["currentUser"], response.data.user);
			toast.success("Zalogowano pomyślnie!");
			navigate("/dashboard");
		},
		onError: error => {
			toast.error(error.response?.data?.message || "Błąd logowania");
		},
	});

	// Register mutation
	const registerMutation = useMutation({
		mutationFn: userData => authService.register(userData),
		onSuccess: response => {
			localStorage.setItem("token", response.data.token);
			queryClient.setQueryData(["currentUser"], response.data.user);
			toast.success("Rejestracja pomyślna!");
			navigate("/dashboard");
		},
		onError: error => {
			toast.error(error.response?.data?.message || "Błąd rejestracji");
		},
	});

	// Logout
	const logout = async () => {
		try {
			await authService.logout();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			localStorage.removeItem("token");
			queryClient.clear();
			navigate("/");
			toast.success("Wylogowano pomyślnie");
		}
	};

	return {
		user,
		isAuthenticated: !!user,
		isLoading,
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout,
		isLoginLoading: loginMutation.isPending,
		isRegisterLoading: registerMutation.isPending,
	};
}

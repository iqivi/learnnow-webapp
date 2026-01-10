// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { authService } from "@/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
	// Tutaj symulujemy zalogowanego użytkownika
	const [isAuthenticated, setIsAuthenticated] = useState(false); // Zmień na false dla widoku publicznego
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// const [user, setUser] = useState({
	// 	name: "Jan Kowalski",
	// 	email: "jan@example.com",
	// });

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			// Opcjonalnie: zweryfikuj token na backendzie
			// authService.getCurrentUser()
			//   .then(response => {
			//     setUser(response.data);
			//     setIsAuthenticated(true);
			//   })
			//   .catch(() => {
			//     localStorage.removeItem("accessToken");
			//   })
			//   .finally(() => setIsLoading(false));

			// Lub po prostu uznaj token za ważny:
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	const register = async userData => {
		console.log(userData);
		try {
			const response = await authService.register(userData);
			const { success } = response.data;
			if (success) {
				const loginResponse = await login(userData.email, userData.password);
				if (loginResponse.success) {
					return { success: true };
				}
			}
		} catch (error) {
			toast.error(
				"Błąd rejestracji: " + (error.response?.data?.message || error.message)
			);
			return { success: false, error };
		}
	};

	const login = async (email, password) => {
		try {
			const response = await authService.login(email, password);
			const { accessToken } = response.data;

			localStorage.setItem("accessToken", accessToken);
			setIsAuthenticated(true);
			// setUser(response.data.user); // jeśli API zwraca dane użytkownika

			toast.success("Zalogowano pomyślnie");
			return { success: true };
		} catch (error) {
			toast.error(
				"Błąd logowania: " + (error.response?.data?.message || error.message)
			);
			return { success: false, error };
		}
	};
	// const login = userData => {
	// 	setUser(userData);
	// 	setIsAuthenticated(true);
	// };

	const logout = () => {
		localStorage.removeItem("accessToken");
		setUser(null);
		setIsAuthenticated(false);
		toast.success("Wylogowano pomyślnie");
	};

	// const logout = () => {
	// 	setUser(null);
	// 	setIsAuthenticated(false);
	// };

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				register,
				login,
				logout,
				isLoading,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}

export { AuthProvider };

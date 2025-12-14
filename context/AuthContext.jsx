// context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	// Tutaj symulujemy zalogowanego użytkownika
	const [isAuthenticated, setIsAuthenticated] = useState(true); // Zmień na false dla widoku publicznego
	const [user, setUser] = useState({
		name: "Jan Kowalski",
		email: "jan@example.com",
	});

	const login = userData => {
		setUser(userData);
		setIsAuthenticated(true);
	};

	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
				isLoading: false, // Dla zgodności z przyszłym API
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

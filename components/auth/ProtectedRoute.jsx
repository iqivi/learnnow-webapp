function ProtectedRoute({ children }) {
	const isAuthenticated = false; // Replace with actual authentication logic
	return isAuthenticated ? children : <Navigate to='/login' />;
}
export default ProtectedRoute;

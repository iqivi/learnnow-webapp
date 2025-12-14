// import { useAuth } from "../context/AuthContext";
import { Toaster } from "sonner";

function Dashboard() {
	// const { user } = useAuth();

	return (
		<div className='container mx-auto p-8'>
			<p>Dashboard</p>
			{/* <h1 className='text-4xl font-bold'>Witaj, {user?.name}! 👋</h1> */}
		</div>
	);
}

export default Dashboard;

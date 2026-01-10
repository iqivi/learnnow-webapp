import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";

import {
	Field,
	FieldGroup,
	FieldSet,
	ItemMedia,
	Input,
	Button,
} from "@/components/ui";

export function Login() {
	//? navigation in Menu.jsx
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const handleLogin = async e => {
		e.preventDefault();

		setIsSubmitting(true);
		const result = await login(email, password);
		setIsSubmitting(false);

		if (result.success) {
			navigate("/dashboard");
		}
	};

	// const handleLogin = e => {
	// 	e.preventDefault();
	// 	// console.log(email);
	// 	// console.log(password);
	// 	if (!email || !password) {
	// 		toast.error("Wypełnij wszystkie pola");
	// 		return;
	// 	}

	// 	authService
	// 		.login(email, password)
	// 		.then(response => {
	// 			// Zakładamy, że odpowiedź zawiera token
	// 			console.log(response.data);
	// 			const { accessToken } = response.data;
	// 			localStorage.setItem("accessToken", accessToken);
	// 			// navigate("/dashboard");
	// 			toast.success("Zalogowano pomyślnie");
	// 			// window.location.reload();
	// 		})
	// 		.catch(error => {
	// 			toast.error(
	// 				"Błąd logowania: " + error.response?.data?.message || error.message
	// 			);
	// 		});
	// };

	return (
		<div className='w-full flex flex-col items-center'>
			<ItemMedia variant='image_md'>
				<img src='src\assets\logo.svg' alt='' />
			</ItemMedia>
			<div className='w-full h-full'>
				<form onSubmit={handleLogin}>
					<FieldGroup className='h-4/5 justify-between'>
						<FieldSet>
							<Field>
								<Input
									id='username'
									type='email'
									placeholder='login'
									value={email}
									onChange={e => setEmail(e.target.value)}
									disabled={isSubmitting}
									required
								/>
							</Field>
							<Field>
								<Input
									id='password'
									type='password'
									placeholder='hasło'
									value={password}
									onChange={e => setPassword(e.target.value)}
									disabled={isSubmitting}
									required
								/>
							</Field>
							<Field>
								<Button
									id='login'
									variant='outline_primary'
									type='submit'
									disabled={isSubmitting}>
									Zaloguj
								</Button>
							</Field>
							<Field orientation='horizontal'>
								<Button
									variant='outline_icon'
									size='icon-rect'
									disabled={isSubmitting}>
									<img
										className='size-12'
										src='src\assets\google_icon.svg'
										alt=''
									/>
								</Button>
							</Field>
						</FieldSet>
						<Field>
							<Button
								id='register'
								variant='outline'
								type='button'
								onClick={() => navigate("/register")}>
								Rejestracja
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}

import React from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";

import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
	ItemMedia,
	Input,
	Button,
} from "@/components/ui";

export function Register() {
	const navigate = useNavigate();
	const { register } = useAuth();
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordRepeat, setPasswordRepeat] = React.useState("");
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const handleRegister = async e => {
		e.preventDefault();
		// console.log("Registering user:", userData);

		if (password !== passwordRepeat) {
			toast.error("Hasła nie są zgodne");
			return;
		}
		const userData = {
			firstName,
			lastName,
			email,
			password,
		};

		setIsSubmitting(true);
		const result = await register(userData);
		setIsSubmitting(false);

		console.log(result);

		// console.log(result);

		// if (result.created) {
		// 	toast.success("Zarejestrowano pomyślnie");
		// 	navigate("/dashboard");
		// } else {
		// 	toast.error("Rejestracja nie powiodła się");
		// }

		// toast.success("Wysłano potwierdzenie rejestracji");
		// navigate("/");
		// Handle login logic here
	};
	return (
		<div className='w-full flex flex-col items-center'>
			<ItemMedia variant='image_md'>
				<img src='src\assets\logo.svg' alt='' />
			</ItemMedia>
			<div className='w-full h-full'>
				<form onSubmit={handleRegister}>
					<FieldGroup className='h-4/5 justify-between'>
						<FieldSet>
							<Field>
								<Input
									id='name'
									type='text'
									placeholder='imię'
									value={firstName}
									onChange={e => setFirstName(e.target.value)}
									disabled={isSubmitting}
									required
								/>
							</Field>
							<Field>
								<Input
									id='surname'
									type='text'
									placeholder='nazwisko'
									value={lastName}
									onChange={e => setLastName(e.target.value)}
									disabled={isSubmitting}
									required
								/>
							</Field>
							<Field>
								<Input
									id='email'
									type='email'
									placeholder='email'
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
								<Input
									id='password_repeat'
									type='password'
									placeholder='potwierdź hasło'
									value={passwordRepeat}
									onChange={e => setPasswordRepeat(e.target.value)}
									disabled={isSubmitting}
									required
								/>
							</Field>
							<Field>
								<Button
									id='register_submit'
									variant='outline_primary'
									type='submit'>
									Zarejestruj
								</Button>
							</Field>
						</FieldSet>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}

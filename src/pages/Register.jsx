import React from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

	const handleRegister = e => {
		e.preventDefault();
		toast.success("Wysłano potwierdzenie rejestracji");
		navigate("/");
		// Handle login logic here
	};
	return (
		<div className='w-full flex flex-col items-center'>
			<ItemMedia variant='image_md'>
				<img src='src\assets\logo.svg' alt='' />
			</ItemMedia>
			<div className='w-2/3 h-150'>
				<FieldSet>
					<FieldGroup className='h-4/5 justify-between'>
						<Field>
							<Input id='name' type='name' placeholder='imię' />
						</Field>
						<Field>
							<Input id='surname' type='surname' placeholder='nazwisko' />
						</Field>
						<Field>
							<Input id='email' type='text' placeholder='email' />
						</Field>
						<Field>
							<Input id='password' type='password' placeholder='hasło' />
							<Input
								id='password_repeat'
								type='password'
								placeholder='potwierdź hasło'
							/>
						</Field>
						<Field>
							<Button
								onClick={handleRegister}
								id='register_submit'
								variant='outline_primary'
								type='submit'>
								Zarejestruj
							</Button>
						</Field>
					</FieldGroup>
				</FieldSet>
			</div>
		</div>
	);
}

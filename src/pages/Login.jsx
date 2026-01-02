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

export function Login() {
	//? navigation in Menu.jsx
	const navigate = useNavigate();

	const handleLogin = e => {
		e.preventDefault();
		toast.success("Zalogowano pomyślnie");
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
							<Input id='username' type='text' placeholder='login' />
						</Field>
						<Field>
							<Input id='password' type='password' placeholder='hasło' />
						</Field>
						<Field>
							<Button
								onClick={handleLogin}
								id='login'
								variant='outline_primary'
								type='submit'>
								Zaloguj
							</Button>
						</Field>
						<Field orientation='horizontal'>
							<Button variant='outline_icon' size='icon-rect'>
								<img
									className='size-12'
									src='src\assets\google_icon.svg'
									alt=''
								/>
							</Button>
						</Field>
						<Field>
							<Button
								id='register'
								variant='outline'
								type='submit'
								onClick={() => navigate("/register")}>
								Rejestracja
							</Button>
						</Field>
					</FieldGroup>
				</FieldSet>
			</div>
		</div>
	);
}

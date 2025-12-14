import React from "react";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
	ItemMedia,
} from "../components/ui/item.jsx";
import { Button } from "../components/ui/button.jsx";

function PublicCoursesList() {
	return (
		<div className='content'>
			<div className='flex flex-col gap-6 justify-around p-8 w-6/7 mx-auto '>
				<div className='example_courses text-left text-4xl font-bold'>
					<h1>Przykładowe kursy</h1>
				</div>
				<div className='example_list'></div>
				<div className='course_pill flex flex-row'>
					<ItemMedia variant='image_bg'>
						<img src='src\assets\course_img.svg' alt='' />
					</ItemMedia>
					<Item variant='outline_pill' size='lg'>
						<ItemContent className='flex flex-col w-2/3 h-1/3 justify-between items-start'>
							<ItemTitle className='text-left text-2xl font-bold'>
								Kurs cyberbezpieczeństwa dla każdego
							</ItemTitle>
							<ItemDescription className='text-left text-md'>
								Bez ogródek i lania wody! Dla każdego z minimum 50-letnim
								doświadczeniem w cyberbezpieczeństwie!
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant='pill' size='pill'>
								<span className='text-2xl'>►</span>
							</Button>
						</ItemActions>
					</Item>
				</div>
				<div className='course_pill flex flex-row'>
					<ItemMedia variant='image_bg'>
						<img src='src\assets\course_img.svg' alt='' />
					</ItemMedia>
					<Item variant='outline_pill' size='lg'>
						<ItemContent className='flex flex-col w-2/3 h-1/3 justify-between items-start'>
							<ItemTitle className='text-left text-2xl font-bold'>
								Kurs cyberbezpieczeństwa dla każdego
							</ItemTitle>
							<ItemDescription className='text-left text-md'>
								Bez ogródek i lania wody! Dla każdego z minimum 50-letnim
								doświadczeniem w cyberbezpieczeństwie!
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant='pill' size='pill'>
								<span className='text-2xl'>►</span>
							</Button>
						</ItemActions>
					</Item>
				</div>
				<div className='course_pill flex flex-row'>
					<ItemMedia variant='image_bg'>
						<img src='src\assets\course_img.svg' alt='' />
					</ItemMedia>
					<Item variant='outline_pill' size='lg'>
						<ItemContent className='flex flex-col w-2/3 h-1/3 justify-between items-start'>
							<ItemTitle className='text-left text-2xl font-bold'>
								Kurs cyberbezpieczeństwa dla każdego
							</ItemTitle>
							<ItemDescription className='text-left text-md'>
								Bez ogródek i lania wody! Dla każdego z minimum 50-letnim
								doświadczeniem w cyberbezpieczeństwie!
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant='pill' size='pill'>
								<span className='text-2xl'>►</span>
							</Button>
						</ItemActions>
					</Item>
				</div>
				<div className='course_pill flex flex-row'>
					<ItemMedia variant='image_bg'>
						<img src='src\assets\course_img.svg' alt='' />
					</ItemMedia>
					<Item variant='outline_pill' size='lg'>
						<ItemContent className='flex flex-col w-2/3 h-1/3 justify-between items-start'>
							<ItemTitle className='text-left text-2xl font-bold'>
								Kurs cyberbezpieczeństwa dla każdego
							</ItemTitle>
							<ItemDescription className='text-left text-md'>
								Bez ogródek i lania wody! Dla każdego z minimum 50-letnim
								doświadczeniem w cyberbezpieczeństwie!
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant='pill' size='pill'>
								<span className='text-2xl'>►</span>
							</Button>
						</ItemActions>
					</Item>
				</div>
			</div>
		</div>
	);
}

export default PublicCoursesList;

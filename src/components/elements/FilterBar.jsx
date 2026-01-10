import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import { Button } from "../ui/button.jsx";

export function FilterBar() {
	return (
		<div className='filterSortBar'>
			<div className='filter flex-1'>
				<div className='filter-bar-left grid grid-cols-1 gap-6 lg:gap-60 md:grid-cols-2 lg:grid-cols-7 pt-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline_border' size='md'>
								Kategoria <i className='fa-solid fa-angle-down'></i>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem>Cyberbezpieczeństwo</DropdownMenuItem>
								<DropdownMenuItem>Bazy danych</DropdownMenuItem>
								<DropdownMenuItem>Frontend</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline_border' size='md'>
								Postęp <i className='fa-solid fa-angle-down'></i>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem>Nierozpoczęte</DropdownMenuItem>
								<DropdownMenuItem>W trakcie</DropdownMenuItem>
								<DropdownMenuItem>Ukończone</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline_border' size='md'>
								Trudność <i className='fa-solid fa-angle-down'></i>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem>Początkujący</DropdownMenuItem>
								<DropdownMenuItem>Średni</DropdownMenuItem>
								<DropdownMenuItem>Ekspert</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}

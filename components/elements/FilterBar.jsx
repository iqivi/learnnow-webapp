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

function FilterBar() {
	return (
		<div className='filterSortBar flex flex-between w-full pt-4'>
			<div className='filter flex-1'>
				<div className='filter-bar-left flex gap-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline_border' size='md'>
								Kategoria <i class='fa-solid fa-angle-down'></i>
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
								Postęp <i class='fa-solid fa-angle-down'></i>
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
								Trudność <i class='fa-solid fa-angle-down'></i>
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
			<div className='sort'>
				<div className='sort-bar-right flex-1 flex justify-end'>
					<div className='filter-bar-left flex gap-4'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline_border' size='md'>
									Ostatnio używane <i class='fa-solid fa-angle-down'></i>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-56' align='end'>
								<DropdownMenuGroup>
									<DropdownMenuItem>"placholder"</DropdownMenuItem>
									<DropdownMenuItem>"placholder"</DropdownMenuItem>
									<DropdownMenuItem>"placholder"</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	);
}
export default FilterBar;

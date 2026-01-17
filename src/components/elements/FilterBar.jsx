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
import { X } from "lucide-react";

export function FilterBar({
	searchParams,
	setSearchParams,
	hideProgressFilter = false,
}) {
	const selectedCategory = searchParams.get("category");
	const selectedProgress = searchParams.get("progress");
	const selectedLevel = searchParams.get("level");

	const handleFilterChange = (filterType, value) => {
		const newParams = new URLSearchParams(searchParams);
		if (newParams.get(filterType) === value) {
			// Odznaczenie filtera jeśli już jest wybrany
			newParams.delete(filterType);
		} else {
			// Ustawienie nowego filtera
			newParams.set(filterType, value);
		}
		setSearchParams(newParams);
	};

	const clearFilters = () => {
		const newParams = new URLSearchParams(searchParams);
		newParams.delete("category");
		newParams.delete("progress");
		newParams.delete("level");
		setSearchParams(newParams);
	};

	const hasActiveFilters =
		selectedCategory || selectedProgress || selectedLevel;

	return (
		<div className='filterSortBar'>
			<div className='filter flex-1'>
				<div className='filter-bar-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline_border'
								size='md'
								className={
									selectedCategory ? "border-blue-500 text-blue-600" : ""
								}>
								Kategoria {selectedCategory && `(${selectedCategory})`}{" "}
								<i className='fa-solid fa-angle-down'></i>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={() => handleFilterChange("category", "Frontend")}
									className={
										selectedCategory === "Frontend" ? "bg-blue-100" : ""
									}>
									Frontend
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleFilterChange("category", "Bazy danych")}
									className={
										selectedCategory === "Bazy danych" ? "bg-blue-100" : ""
									}>
									Bazy danych
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										handleFilterChange("category", "Cyberbezpieczeństwo")
									}
									className={
										selectedCategory === "Cyberbezpieczeństwo"
											? "bg-blue-100"
											: ""
									}>
									Cyberbezpieczeństwo
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					{!hideProgressFilter && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline_border'
									size='md'
									className={
										selectedProgress ? "border-blue-500 text-blue-600" : ""
									}>
									Postęp {selectedProgress && `(${selectedProgress})`}{" "}
									<i className='fa-solid fa-angle-down'></i>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-56' align='end'>
								<DropdownMenuGroup>
									<DropdownMenuItem
										onClick={() =>
											handleFilterChange("progress", "Nierozpoczęte")
										}
										className={
											selectedProgress === "Nierozpoczęte" ? "bg-blue-100" : ""
										}>
										Nierozpoczęte
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleFilterChange("progress", "W trakcie")}
										className={
											selectedProgress === "W trakcie" ? "bg-blue-100" : ""
										}>
										W trakcie
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleFilterChange("progress", "Ukończone")}
										className={
											selectedProgress === "Ukończone" ? "bg-blue-100" : ""
										}>
										Ukończone
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline_border'
								size='md'
								className={
									selectedLevel ? "border-blue-500 text-blue-600" : ""
								}>
								Trudność {selectedLevel && `(${selectedLevel})`}{" "}
								<i className='fa-solid fa-angle-down'></i>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={() => handleFilterChange("level", "Początkujący")}
									className={
										selectedLevel === "Początkujący" ? "bg-blue-100" : ""
									}>
									Początkujący
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleFilterChange("level", "Średni")}
									className={selectedLevel === "Średni" ? "bg-blue-100" : ""}>
									Średni
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleFilterChange("level", "Ekspert")}
									className={selectedLevel === "Ekspert" ? "bg-blue-100" : ""}>
									Ekspert
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					{hasActiveFilters && (
						<Button
							variant='ghost'
							size='md'
							onClick={clearFilters}
							className='text-red-600 hover:text-red-700'>
							<X className='mr-2 h-4 w-4' />
							Czyść filtry
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

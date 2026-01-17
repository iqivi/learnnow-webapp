// pages/Menu.jsx
import { PublicCoursesList } from "./PublicCoursesList";
import bannerImg from "@/assets/banner.svg";

export function PublicMenu() {
	return (
		<>
			{/* Banner */}
			<div
				className='banner min-h-64 sm:min-h-80 md:min-h-96 lg:min-h-[420px] bg-center bg-cover bg-scroll md:bg-fixed bg-no-repeat flex items-center justify-center'
				style={{ backgroundImage: `url(${bannerImg})` }}
				role='img'
				aria-label='Promotional banner'>
				<div className='flex w-full h-full items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16'>
					<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center drop-shadow-lg'>
						Zacznij naukę na naszej platformie już dziś!
					</h1>
				</div>
			</div>

			{/* Lista kursów */}
			<PublicCoursesList />
		</>
	);
}

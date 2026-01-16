// pages/Menu.jsx
import { PublicCoursesList } from "./PublicCoursesList";
import bannerImg from "@/assets/banner.svg";

export function PublicMenu() {
	return (
		<>
			{/* Banner */}
			<div
				className='banner h-96 md:h-[420px] bg-center bg-contain bg-fixed bg-no-repeat'
				style={{ backgroundImage: `url(${bannerImg})` }}
				role='img'
				aria-label='Promotional banner'>
				<div className='flex w-6/8 h-full items-center justify-center'>
					<h1 className='text-6xl md:text-[4xl] font-bold text-white text-left z-0'>
						Zacznij naukę na naszej platformie już dziś!
					</h1>
				</div>
			</div>

			{/* Lista kursów */}
			<PublicCoursesList />
		</>
	);
}

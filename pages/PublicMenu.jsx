// pages/Menu.jsx
import PublicCoursesList from "./PublicCoursesList";
import bannerImg from "../src/assets/banner.svg";

function PublicMenu() {
	return (
		<>
			{/* Banner */}
			<div
				className='banner h-96 md:h-[420px] bg-center bg-contain bg-fixed bg-no-repeat'
				style={{ backgroundImage: `url(${bannerImg})` }}
				role='img'
				aria-label='Promotional banner'
			/>

			{/* Lista kursów */}
			<PublicCoursesList />
		</>
	);
}

export default PublicMenu;

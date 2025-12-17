import React from "react";
import CoursePreview from "../components/elements/CoursePreview.jsx";
function PublicCoursesList() {
	return (
		<div className='content'>
			<div className='flex flex-col gap-6 justify-around p-8 w-6/7 mx-auto '>
				<div className='example_courses text-left text-4xl font-bold'>
					<h1>Przykładowe kursy</h1>
				</div>
				<div className='example_list'></div>
				<CoursePreview />
				<CoursePreview />
				<CoursePreview />
				<CoursePreview />
				<CoursePreview />
			</div>
		</div>
	);
}

export default PublicCoursesList;

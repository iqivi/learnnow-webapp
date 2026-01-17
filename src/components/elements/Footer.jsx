export function Footer() {
	return (
		<div className='footer'>
			<p className='text-center p-4 sm:p-6 lg:p-8 text-xs sm:text-sm md:text-base text-accent'>
				© {new Date().getFullYear()} LearNow. All rights reserved.
			</p>
		</div>
	);
}

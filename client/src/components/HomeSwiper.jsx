import { register } from 'swiper/element/bundle';

// register Swiper custom elements
register();


function HomeSwiper({ slidesPerView }) {

	const slides = ["slide1","slide2","slide3","slide4","slide5", "slide6", "slide7", "slide8"];

	return (
		<>
			<swiper-container
				slides-per-view={slidesPerView}
				space-between="30"
			>
				{slides.map((slide, i) => (
					<swiper-slide key={i}>
						<div className="bg-gray-300 h-60">{slide}</div>
					</swiper-slide>
				))}
			</swiper-container>
		</>
	)
}

export default HomeSwiper;

import { useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element/bundle';

function HomeSwiper({swiperId}) {

	const slides = ["slide1","slide2","slide3","slide4","slide5", "slide6", "slide7", "slide8"];

	const swiperRef = useRef(null);
	const swiperPaginationRef = useRef(null);

	useEffect(() => {
		// Register Swiper web component
		register();

		// Object with parameters
		const params = {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 20,
			breakpoints: {
				480: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 30
				},
				1024: {
					slidesPerView: 4
				},
			},
			navigation: {
				nextEl: '.swiper-next' + swiperId,
				prevEl: '.swiper-prev' + swiperId
			},
			pagination: {
				el: swiperPaginationRef.current,
				type: 'bullets',
				clickable: true
			}
		};

		// Assign it to swiper element
		Object.assign(swiperRef.current, params);

		// initialize swiper
		swiperRef.current.initialize();
	}, []);

	return (
		<>
			<div className="relative">
				<swiper-container init="false" ref={swiperRef}>
					{slides.map((slide, i) => (
						<swiper-slide key={i}>
							<div className="bg-gray-300 h-20">{slide}</div>
						</swiper-slide>
					))}
				</swiper-container>
				<button className={`swiper-arrow swiper-next${swiperId} -right-8`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 4l8 8l-8 8"/></svg>
				</button>
				<button className={`swiper-arrow swiper-prev${swiperId} -left-8`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 4l-8 8l8 8"/></svg>
				</button>
			</div>
			<div className="h-8 w-full mt-3" ref={swiperPaginationRef}></div>
		</>
	)
}

export default HomeSwiper;

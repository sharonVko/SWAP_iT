import React from "react";
import { Carousel } from "flowbite-react";
import { Avatar } from "flowbite-react";
import userlogo from "../assets/userlogo.png";

const SingleViewAd = () => {
	return (
		<div className="mx-auto sm:flex-col max-w-2xl">
			<div className="mb-8 bg-lemon-600 text-teal-700 text-center">
				<h2>Wildlederboots</h2>
			</div>

			{/* <div className="mx-auto w-64 h-64 xl:h-80 xl:w-80  2xl:h-96 2xl:w-96"> */}
			<div className="mx-auto max-w-2xl h-96">
				<Carousel slide={false}>
					<img
						className="h-full w-full object-cover"
						src="https://cdn.pixabay.com/photo/2015/06/02/23/15/winter-boots-795706_1280.jpg"
						alt="..."
					/>
					<img
						src="https://cdn.pixabay.com/photo/2015/06/02/23/14/shoes-795698_1280.jpg
"
						alt="..."
					/>
					<img
						src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
						alt="..."
					/>
					<img
						src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
						alt="..."
					/>
					<img
						src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
						alt="..."
					/>
				</Carousel>
			</div>

			{/* <div className="h-48 sm:h-56  xl:h-64 2xl:h-80">
        <Carousel leftControl="left" rightControl="right">
          <img
            src="https://cdn.pixabay.com/photo/2015/06/02/23/15/winter-boots-795706_1280.jpg"
            alt="..."
          />
          <img
            src="https://cdn.pixabay.com/photo/2015/06/02/23/14/shoes-795698_1280.jpg
"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div> */}
			<div className="flex flex-wrap gap-2">
				<Avatar img={userlogo} bordered />
			</div>

			<div className="w-96 bg-teal-500">
				<p>
					Wunderschöne, gut erhaltene Winterstiefel aus echtem Leder in
					hellblau. Letzten Winter nur 1x getragen, gut impregniert. Sie könnten
					kommenden Winter schon deine Füße wärmen!{" "}
				</p>
			</div>
		</div>
	);
};

export default SingleViewAd;

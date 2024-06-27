import logo from "../assets/swapit-logo-transparent-02.png";

function Navbar() {
  return (
    <div className="h-24 sm:h-36 lg:h-40 relative flex flex-col justify-center">
			<div className="bg-teal-500 relative z-0 h-14 sm:h-20 lg:h-24"></div>

			<div className="absolute top-0 left-0 h-full w-full z-10">
				<div className="relative z-0 px-4">
					<div className="container mx-auto py-8 flex items-center h-24 sm:h-36 lg:h-40">
						<div>ge</div>
						<img
							src={logo}
							alt="SwapIt Logo"
							className="mx-auto w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 drop-shadow-logo"
						/>
						<div>rt</div>
					</div>
				</div>
			</div>
    </div>
  );
}

export default Navbar;

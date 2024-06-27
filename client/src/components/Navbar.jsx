import logo from "../assets/swapit-logo-transparent.png";

function Navbar() {

	return (

		<div className="navbar py-3 sm:py-4 relative h-28 sm:h-32 flex flex-col justify-center">
			<div className="bg-teal-500 relative z-0 px-4">
				<div className="container mx-auto h-16 sm:h-20 flex flex-col justify-center">
					<div className="navbar-inner flex justify-between">

						<button className="text-3xl w-16 text-peach-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
								<path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"/>
							</svg>
						</button>

						<div className="flex gap-4">

							<button className="text-2xl text-peach-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
									<path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"/>
								</svg>
							</button>

							{/*<button className="text-2xl text-peach-300">*/}
							{/*	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">*/}
							{/*		<g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="5"/>*/}
							{/*			<path strokeLinecap="round" strokeLinejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/></g>*/}
							{/*	</svg>*/}
							{/*</button>*/}

							<button className="btn-sm btn-red">
								Login
							</button>

						</div>
					</div>
				</div>
			</div>
			<div className="absolute top-0 left-1/2 -ml-12 z-1 h-24 sm:h-32 sm:-ml-16">
				<img src={logo} alt="SwapIt Logo" className="mx-auto w-24 sm:w-32 h-24 sm:h-32 mt-1" />
			</div>
		</div>

	)
}

export default Navbar;

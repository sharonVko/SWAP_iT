import { useNavigate } from "react-router-dom";
import logo from "../assets/swapit-logo-transparent-02.png";

function Navbar({ onToggleNav, onClose }) {
	const navigate = useNavigate();
	const goTo = (route) => {
		onClose();
		navigate(route);
	}

  return (
    <div className="h-24 sm:h-36 lg:h-40 relative flex flex-col justify-center">
			<div className="bg-teal-500 relative z-400 h-14 sm:h-20 lg:h-24"></div>

			<div className="absolute top-0 left-0 h-full w-full z-500">
				<div className="relative px-4">
					<div className="container mx-auto py-8 flex items-center h-24 sm:h-36 lg:h-40">
						<button className="text-3xl w-16 text-peach-300" onClick={onToggleNav}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeWidth="2"
									d="M3 6h18M3 12h18M3 18h18"
								/>
							</svg>
						</button >
						<img
							src={logo}
							alt="SwapIt Logo"
							className="mx-auto w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 drop-shadow-logo cursor-pointer"
							onClick={() => goTo("/")}
						/>
						<div className="flex gap-4 md:gap-8">
							<button className="text-2xl text-peach-300">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeWidth="2"
										d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
									/>
								</svg>
							</button>

							{/*<button className="text-2xl text-peach-300">*/}
							{/*	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">*/}
							{/*		<g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="5"/>*/}
							{/*			<path strokeLinecap="round" strokeLinejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/></g>*/}
							{/*	</svg>*/}
							{/*</button>*/}

							<button className="btn-sm btn-red" onClick={() => goTo("/login")}>Login</button>
						</div>
					</div>
				</div>
			</div>
    </div>
  );
}

export default Navbar;

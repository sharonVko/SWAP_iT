const Footer = () => {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
				<a href="#">ABOUT US</a>
				<a href="#">CONTACT US</a>
				<a href="#">FAQs</a>
				<a href="#">GT&C</a>
				<a href="#">PRIVACY POLICY</a>
			</div>
			<div className="flex justify-center items-center container mx-auto text-base text-white/70 text-center">
				&copy; {new Date().getFullYear()} SWAP IT! - Final Project by Sharon, Sidhdhali, Sabrina, Thomas, Hanno
			</div>
		</div>
	);
};

export default Footer;

const Footer = () => {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col md:flex-row justify-center items-center gap-8 p-4">
				<div>ABOUT US</div>
				<div>CONTACT US</div>
				<div>FAQs</div>
				<div>GT&C</div>
				<div>PRIVACY POLICY</div>
			</div>
			<div className="flex justify-center items-center container mx-auto p-4 text-sm text-gray-600">
				&copy; {new Date().getFullYear()} SWAP IT! - Final Project by Sharon, Sidhdhali, Sabrina, Thomas, Hanno
			</div>
		</div>
	);
};

export default Footer;

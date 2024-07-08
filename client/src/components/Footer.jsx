import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faEnvelope,
  faQuestionCircle,
  faFileContract,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className=" text-gray-50 py-8 font-poppins drop-shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-6 sm:text-lg">
          <a
            href="#"
            className="flex items-center text-teal-500 hover:underline transition"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> ABOUT US
          </a>
          <a
            href="#"
            className="flex items-center text-teal-500 hover:underline transition"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> CONTACT US
          </a>
          <a
            href="#"
            className="flex items-center text-teal-500 hover:underline transition"
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> FAQs
          </a>
          <a
            href="#"
            className="flex items-center text-teal-500 hover:underline transition"
          >
            <FontAwesomeIcon icon={faFileContract} className="mr-2" /> GT&C
          </a>
          <a
            href="#"
            className="flex items-center text-teal-500 hover:underline transition"
          >
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" /> PRIVACY
            POLICY
          </a>
        </div>
        <div className="flex justify-center items-center text-base text-gray-100/70 text-center">
          &copy; {new Date().getFullYear()} SWAP IT! - Final Project by Sharon,
          Sidhdhali, Sabrina, Thomas, Hanno
        </div>
      </div>
    </footer>
  );
};

export default Footer;

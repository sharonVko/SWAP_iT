import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaList,
  FaUserPlus,
  FaEnvelope,
  FaAd,
  FaPlus,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../context/AuthProvider"; // Adjust the path as needed

export const Drawer = (props) => {
  const { open, onClose } = props;
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div
        className={`drawer-overlay ${open ? "show" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      >
        <div className="drawer-overlay-top"></div>
        <div className="drawer-overlay-bottom"></div>
      </div>

      <div className={`drawer ${open ? "show" : ""}`} tabIndex="-1">
        <div className="drawer-inner-top"></div>
        <div className="drawer-inner p-4 pt-8 space-y-4">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-teal text-3xl">
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
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m11 5l-7 7l7 7m-7-7h16"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-lg"
              onClick={onClose}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/ads"
              className="flex items-center space-x-2 text-lg"
              onClick={onClose}
            >
              <FaList />
              <span>Alle Anzeigen</span>
            </Link>
            {!isLoggedIn && (
              <Link
                to="/signup"
                className="flex items-center space-x-2 text-lg"
                onClick={onClose}
              >
                <FaUserPlus />
                <span>Konto einrichten</span>
              </Link>
            )}
          </div>

          {isLoggedIn && (
            <>
              <hr className="my-4 border-t border-gray-200" />
              <div className="space-y-4">
                <Link
                  to="/chats"
                  className="flex items-center space-x-2 text-lg"
                  onClick={onClose}
                >
                  <FaEnvelope />
                  <span>Nachrichten</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-lg"
                  onClick={onClose}
                >
                  <FaAd />
                  <span>Meine Anzeigen</span>
                </Link>
                <Link
                  to="/profile/ads/new"
                  className="flex items-center space-x-2 text-lg"
                  onClick={onClose}
                >
                  <FaPlus />
                  <span>Anzeige erstellen</span>
                </Link>
              </div>
              <hr className="my-4 border-t border-gray-200" />
              <div className="space-y-4">
                <Link
                  to="/profile/settings"
                  className="flex items-center space-x-2 text-lg"
                  onClick={onClose}
                >
                  <FaCog />
                  <span>Konto-Einstellungen</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

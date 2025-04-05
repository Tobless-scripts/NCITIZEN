import { NavLink } from "react-router-dom";
import logo from "../../public/logo.png";
import home1 from "../assets/Home1.png";
import Globe1 from "../assets/Globe1.png";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import profileImg from "../assets/user.png";

type HeaderProps = {
    profileImage: string | null;
};

function Header({ profileImage }: HeaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleSticky = () => {
            setIsSticky(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleSticky);
        return () => window.removeEventListener("scroll", handleSticky);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < lastScrollY);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div
                className={`w-full pt-3 px-12 md:px-20 lg:px-48 bg-white ${
                    isSticky ? "fixed top-0 left-0 z-50" : ""
                }`}
            >
                <div className="flex justify-between items-center">
                    <div className="flex justify-evenly items-center gap-8">
                        <NavLink to={"/"}>
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <div className="hidden md:flex justify-evenly items-center gap-8">
                            <NavLink
                                to={"/home"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "navBar-link active"
                                        : "navBar-link"
                                }
                            >
                                <img
                                    src={home1}
                                    alt="home"
                                    className="w-[2.5rem]"
                                />
                            </NavLink>
                            <NavLink
                                to={"/community"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "navBar-link active"
                                        : "navBar-link"
                                }
                            >
                                <img
                                    src={Globe1}
                                    alt="community"
                                    className="w-[2.5rem]"
                                />
                            </NavLink>
                        </div>
                    </div>

                    {!isLoggedIn ? (
                        <NavLink to={"/login"}>
                            <button className="p-1 text-orange-500 text-xl font-bold cursor-pointer">
                                Login
                            </button>
                        </NavLink>
                    ) : (
                        <div className="flex gap-4 justify-center items-center relative">
                            <NavLink to="/profile">
                                <div className="bg-gray-200 w-[2em] h-[2em] rounded-full overflow-hidden cursor-pointer border-2 border-gray-300">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Preview"
                                            className="object-cover object-top w-full h-full rounded-full"
                                        />
                                    ) : (
                                        <img src={profileImg} alt="" />
                                    )}
                                </div>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`bg-white w-full px-12 flex md:hidden fixed z-50 bottom-0 left-0 transition-transform duration-300 ${
                    isVisible ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div className="flex md:hidden justify-between items-center gap-8 w-full">
                    <NavLink
                        to={"/home"}
                        className={({ isActive }) =>
                            isActive ? "navBar-link active" : "navBar-link"
                        }
                    >
                        <img src={home1} alt="home" className="w-[2.5rem]" />
                    </NavLink>
                    <NavLink
                        to={"/community"}
                        className={({ isActive }) =>
                            isActive ? "navBar-link active" : "navBar-link"
                        }
                    >
                        <img
                            src={Globe1}
                            alt="community"
                            className="w-[2.5rem]"
                        />
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Header;

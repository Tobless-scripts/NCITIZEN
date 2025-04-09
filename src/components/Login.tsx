import branding from "../assets/branding.png";
import google from "../assets/google.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNotifications } from "./Notifications";

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const { addNotification } = useNotifications();

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;
        (e.target as HTMLFormElement).reset();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in as:", user.email);

                if (auth.currentUser) {
                    addNotification("Successfully Logged In!", "success"); // ✅ Notification added
                    navigate("/home");
                } else {
                    setErrorMessage(
                        "This Google account is not registered. Please sign up."
                    );
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/user-not-found") {
                    setErrorMessage("User not found. Please sign up.");
                    addNotification("User not found. Please sign up.", "error");
                } else {
                    setErrorMessage("Incorrect email or password");
                    addNotification("Incorrect email or password", "error");
                }
            });
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("User signed in: ", user.displayName);

                if (auth.currentUser) {
                    addNotification(
                        "Successfully Logged In with Google!",
                        "success"
                    );
                    navigate("/home");
                } else {
                    setErrorMessage(
                        "This Google account is not registered. Please sign up."
                    );
                    addNotification(
                        "This Google account is not registered.",
                        "error"
                    );
                }
            })
            .catch((error) => {
                console.error("Error: ", error.code, error.message);
                addNotification("Google login failed!", "error");
            });
    }

    return (
        <div className="border-none md:border-2 border-white rounded-md grid grid-cols-1 lg:grid-cols-2 px-4 md:px-20 lg:px-48 pb-8 lg:pb-0 my-auto pt-8 md:pt-8">
            <div className="hidden lg:flex">
                <img src={branding} alt="branding" className="w-full h-full" />
            </div>
            <div className="bg-white px-8 py-8 md:py-12">
                <h2 className="font-bold text-gray-800 text-xl md:text-2xl text-center">
                    Welcome to your civic community
                </h2>
                <p className="my-4 font-bold text-sm md:text-md text-center">
                    Login with
                </p>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div
                        onClick={googleSignIn}
                        className="border-1 border-black hover:bg-gray-100 inline-flex py-2 px-4 rounded-md cursor-pointer transition-all ease-in-out"
                    >
                        <img src={google} alt="google" className="w-[1.5rem]" />
                        <p>Google</p>
                    </div>
                    <p className="text-gray-800 font-normal text-md md:text-lg">
                        or
                    </p>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-2">
                            {errorMessage && (
                                <p className="text-red-500">{errorMessage}</p>
                            )}
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                className="border-2 border-gray-300 py-2 pl-3 pr-4 rounded-md text-black text-sm"
                            />
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                                className="border-2 border-gray-300 py-2 pl-3 pr-4 rounded-md text-black text-sm"
                            />
                            <h6 className="text-orange-500 cursor-pointer">
                                Forgot Password?
                            </h6>
                            <button
                                type="submit"
                                className="bg-orange-300 hover:bg-orange-500 text-white rounded-full py-2 px-4"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p>
                        Don't have an account?
                        <NavLink to="/signup" className="text-orange-500 ml-1">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

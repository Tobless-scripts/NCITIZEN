import { NavLink, useNavigate } from "react-router-dom";
import branding from "../assets/branding.png";
import google from "../assets/google.png";
import { useAuth } from "./useAuth";
import {
    getAuth,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase/firebase-config";
import "react-toastify/dist/ReactToastify.css";
import { useNotifications } from "./Notifications"; // Import Notification Context

function Signup() {
    const { name, setName, email, setEmail } = useAuth(); //Get from context
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addNotification } = useNotifications(); // Use the notification context

    const signupWithEmail = async (
        email: string,
        password: string,
        name: string
    ) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem("userName", name);

            addNotification("Successfully Signed Up!", "success"); // Store notification

            navigate("/home");
        } catch (error) {
            console.error("Signup failed:", error);
            setErrorMessage("Email already in use");
            setEmail("");
            setPassword("");
            setName("");
            addNotification("Email already in use", "error"); // Store error notification
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signupWithEmail(email, password, name);
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        try {
            // Start Google sign-in process
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const email = user.email;

            if (!email) {
                throw new Error("Google account does not have an email.");
            }

            // Check if the email is already registered **before proceeding**
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length > 0) {
                // Prevent duplicate account sign-in
                setErrorMessage(
                    "Email already in use. Please try another account."
                );
                addNotification(
                    "Email already in use. Please try another account.",
                    "error"
                );

                // **Sign out the user to prevent unintended login**
                await auth.signOut();
                return;
            }

            // Save user name in local storage
            localStorage.setItem("userName", user.displayName ?? "Guest");

            // Display success notification
            addNotification(
                `Welcome, ${user.displayName ?? "Guest"}!`,
                "success"
            );

            // Navigate to home
            navigate("/home");
        } catch (error: any) {
            console.error("Error during Google sign-in:", error.message);
            setErrorMessage(
                error.message || "Google sign-in failed. Please try again."
            );
            addNotification(
                error.message || "Google sign-in failed. Please try again.",
                "error"
            );
        }
    };

    return (
        <div className="border-none md:border-2 border-white rounded-md grid grid-cols-1 lg:grid-cols-2 px-12 md:px-20 lg:px-48 pb-14 lg:pb-0 my-auto pt-12 md:pt-8">
            <div className="hidden lg:flex">
                <img src={branding} alt="branding" className="w-full h-full" />
            </div>
            <div className="bg-white px-8 pt-8 pb-8 md:pt-12 md:pb-6">
                <h2 className="font-bold text-gray-800 text-xl md:text-2xl leading-3xl md:leading-4xl text-center">
                    Welcome to your civic community
                </h2>
                <p className="my-2 font-bold text-sm md:text-md leading-xl md:leading-2xl text-center">
                    Sign up
                </p>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div
                        onClick={googleSignIn}
                        className="border-1 border-black hover:bg-gray-100 inline-flex py-2 px-4 rounded-md justify-evenly gap-2 items-center cursor-pointer transition-all ease-in-out"
                    >
                        <img src={google} alt="google" className="w-[1.5rem]" />
                        <p>Google</p>
                    </div>
                    <p className="text-gray-800 font-normal text-md md:text-lg leading-lg md:leading-xl ">
                        or
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center items-center py-4 gap-2">
                            {errorMessage && (
                                <p className="text-red-500 text-sm">
                                    {errorMessage}
                                </p>
                            )}
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Username"
                                className="border-2 border-gray-300 py-3 pl-5 pr-6 md:pr-12 rounded-md text-black text-sm focus:shadow-lg focus:shadow-blue-200 focus:outline-none transition-all ease-in-out"
                            />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                                className="border-2 border-gray-300 py-3 pl-5 pr-6 md:pr-12 rounded-md text-black text-sm focus:shadow-lg focus:shadow-blue-200 focus:outline-none transition-all ease-in-out"
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border-2 border-gray-300 py-3 pl-5 pr-6 md:pr-12 rounded-md text-black text-sm focus:shadow-lg focus:shadow-blue-200 focus:outline-none transition-all ease-in-out"
                            />
                            <h6 className="font-normal text-[.7rem] break-words leading-md text-gray-500">
                                By signing up you are agreeing to icitizen
                                <span className="text-orange-300 ml-1 cursor-pointer hover:border-b hover:border-b-1 hover:border-b-orange-500 transition-all ease-in-out w-max">
                                    Terms
                                </span>
                            </h6>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all mx-auto ease-in-out text-white font-normal text-md md:text-md leading-md md:leading-lg rounded-full w-max py-2 px-6 ${
                                    loading ? "opacity-50" : ""
                                }`}
                            >
                                {loading ? "Signing up..." : "Sign up!"}
                            </button>
                        </div>
                    </form>
                    <div>
                        <p className="font-normal text-center text-gray-500 text-sm md:text-md leading-md md:leading-lg text-[rgb(15, 27, 45)]">
                            Already have an account?
                            <NavLink to={"/login"}>
                                <span className="text-orange-500 font-normal ml-1 cursor-pointer hover:border-b hover:border-b-1 hover:border-b-orange-500 transition-all ease-in-out w-max">
                                    Login
                                </span>
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

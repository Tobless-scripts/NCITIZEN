import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase-config";
import { useImage } from "../Context/ImageContext";
import defaultImage from "../assets/user.png";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [namePlaceholder, setNamePlaceholder] = useState("");
    const [emailPlaceholder, setEmailPlaceholder] = useState("");
    const { imageSrc, setImageSrc } = useImage();
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        politicalIdentification: "",
        race: "",
        education: "",
        likelyVoter: "",
    });
    const [loading, setLoading] = useState(false);

    const options = {
        gender: ["Male", "Female", "Other"],
        age: ["< 18", "18-34", "35-49", "50-64", "65+"],
        politicalIdentification: [
            "Liberal",
            "Conservative",
            "Independent",
            "Other",
        ],
        race: ["Asian", "Black", "White", "Hispanic", "Other"],
        education: ["High School", "Bachelor's", "Master's", "PhD", "Other"],
        likelyVoter: ["Yes", "No"],
    };

    const navigate = useNavigate();

    const saveData = async () => {
        setLoading(true);
        try {
            if (!user) return;

            const userRef = doc(db, "users", user.email || "");
            await setDoc(userRef, {
                name: nameInput,
                email: emailInput,
                profileImage: imageSrc,
                ...formData,
            });
            console.log("User data saved successfully!");
        } catch (error) {
            console.error("Error saving user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user?.email) {
                setUser(user);
                fetchUserData(user.email); // Fetch user data on login
            } else {
                console.log("No user found");
                resetForm(); // Reset form if no user
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserData = async (email: string) => {
        try {
            const userRef = doc(db, "users", email);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                setNameInput(data?.name || ""); // Set name input
                setEmailInput(data?.email || ""); // Set email input
                setImageSrc(data?.profileImage || defaultImage); // Set image from Firestore
                setFormData({
                    gender: data?.gender || "",
                    age: data?.age || "",
                    politicalIdentification:
                        data?.politicalIdentification || "",
                    race: data?.race || "",
                    education: data?.education || "",
                    likelyVoter: data?.likelyVoter || "",
                });
                console.log("Successfully loaded data");
            } else {
                console.log("User data not found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const resetForm = () => {
        setNameInput("");
        setEmailInput("");
        setImageSrc(defaultImage);
        setFormData({
            gender: "",
            age: "",
            politicalIdentification: "",
            race: "",
            education: "",
            likelyVoter: "",
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            if (validTypes.includes(file.type)) {
                const imageUrl = URL.createObjectURL(file);
                setImageSrc(imageUrl); // Set the new image URL
            } else {
                alert("Please upload a valid image file (JPEG, PNG, GIF).");
            }
        }
    };

    const handleNameUpdate = () => {
        if (nameInput.trim() !== "") {
            setNamePlaceholder(nameInput);
            setNameInput("");
        }
    };

    const handleEmailUpdate = () => {
        if (emailInput.trim() !== "") {
            setEmailPlaceholder(emailInput);
            setEmailInput("");
        }
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out.");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error during logout:", error.message);
            });
    };

    return (
        <div className="bg-white mt-6 mb-15 mx-8 lg:mx-50 rounded-lg py-8 px-8 lg:px-52">
            <div className="flex gap-4 justify-center items-center relative">
                <label htmlFor="profile-upload">
                    <div className="bg-gray-200 w-[9em] h-[9em] rounded-full overflow-hidden border-2 border-gray-300">
                        <img
                            src={imageSrc}
                            alt="profile"
                            className="object-cover object-top w-full h-full rounded-full cursor-pointer"
                        />
                    </div>
                </label>
                <input
                    type="file"
                    id="profile-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="px-6 py-8 md:py-12 max-w-md mx-auto">
                    <span>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder={namePlaceholder}
                            className="border-gray-400 border border-2 w-full py-1.5 px-2"
                        />
                        <button
                            type="button"
                            onClick={handleNameUpdate}
                            className="w-full py-1 border-gray-500 hover:text-orange-500 text-white font-bold border border-1 bg-orange-500 hover:bg-white cursor-pointer transition-all ease-in-out duration-300"
                        >
                            Update
                        </button>
                    </span>

                    <span>
                        <input
                            type="text"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder={emailPlaceholder}
                            className="border-gray-400 border mt-6 border-2 w-full py-1.5 px-2"
                        />
                        <button
                            type="button"
                            onClick={handleEmailUpdate}
                            className="w-full py-1 border-gray-500 hover:text-orange-500 text-white font-bold border border-1 bg-orange-500 hover:bg-white cursor-pointer transition-all ease-in-out duration-300"
                        >
                            Update
                        </button>
                    </span>

                    <div className="mt-8">
                        <p>Notifications</p>
                        <span className="flex justify-start gap-2 items-center">
                            <input type="checkbox" name="notify" />
                            <p>Receive reply updates</p>
                        </span>
                    </div>
                </div>

                <div>
                    <form className="p-2 md:p-4 max-w-md mx-auto">
                        {Object.keys(options).map((field) => (
                            <div key={field} className="mb-4">
                                <label className="block mb-1 capitalize">
                                    {field.replace(/([A-Z])/g, " $1")}
                                </label>
                                <select
                                    name={field}
                                    value={
                                        formData[field as keyof typeof formData]
                                    }
                                    onChange={handleChange}
                                    className="w-full p-2 cursor-pointer border rounded outline-gray-200 focus:outline-none focus:ring-blue-500 focus:ring-2 focus:border focus:border-blue-500 focus:shadow focus:shadow-md focus:shadow-blue-500"
                                >
                                    <option value="">Select</option>
                                    {options[field as keyof typeof options].map(
                                        (option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        ))}
                    </form>
                </div>
            </div>

            <div className="py-4 flex justify-between items-center">
                <button
                    type="button"
                    onClick={logout}
                    className="border border-1 border-orange-500 px-2.5 py-1 rounded-lg cursor-pointer text-[.9rem] text-orange-500 leading-md hover:bg-orange-500 hover:border-gray-500 hover:text-white transition-all duration-300 ease-in-out"
                >
                    Logout
                </button>

                <button
                    type="button"
                    onClick={saveData}
                    className="border border-1 bg-orange-500 border-gray-500 px-4.5 py-1 rounded-lg cursor-pointer text-[.9rem] text-white leading-md hover:bg-white hover:text-orange-500 transition-all duration-300 ease-in-out"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default Profile;

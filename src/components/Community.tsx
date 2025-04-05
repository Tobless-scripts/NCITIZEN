import military from "../assets/m.jpg";
import education from "../assets/education.jpg";
import immigration from "../assets/immigration.jpg";
import civil from "../assets/civil rights.jpg";
import coronavirus from "../assets/coronavirus.jpg";
import economy from "../assets/economy.jpg";
import court from "../assets/elections.jpg";
import healthcare from "../assets/healthcare.jpg";
import politics from "../assets/politic books.jpg";
import religion from "../assets/religion.jpg";
import society from "../assets/society.jpg";
import world from "../assets/world congress.jpg";
import environment from "../assets/istockphoto-2129646240-1024x1024.jpg";
import elections from "../assets/court.jpg";
import media from "../assets/media.jpg";
import newYork from "../assets/statue.jpeg";
import pittsford from "../assets/pittsford.jpeg";
import texas from "../assets/tecas.png";
import tennessee from "../assets/tenesse.png";
import brighton from "../assets/s-l400.jpg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase-config"; // import firebase config
import { onAuthStateChanged } from "firebase/auth"; // Firebase function to listen to auth state

function Community() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [joinedCommunities, setJoinedCommunities] = useState<
        Record<string, boolean>
    >({}); // Store joined communities

    useEffect(() => {
        // Listen to the auth state change
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Set login state based on user presence
        });

        // Load joined communities from localStorage
        const storedJoined = JSON.parse(
            localStorage.getItem("joinedCommunities") ?? "{}"
        );
        setJoinedCommunities(storedJoined);

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    const handleJoinLeave = (issue: string) => {
        setJoinedCommunities((prev) => {
            const updated = { ...prev, [issue]: !prev[issue] };
            localStorage.setItem("joinedCommunities", JSON.stringify(updated)); // Update localStorage
            return updated;
        });
    };

    type JoinButtonProps = { issue: string };

    const JoinButton = ({ issue }: JoinButtonProps) => {
        const joined = joinedCommunities[issue] || false;

        return (
            <button
                onClick={() => handleJoinLeave(issue)}
                className={`w-full border-2 py-1 transition-all duration-500 ease-in-out ${
                    joined
                        ? "border-red-300 text-red-600 hover:bg-red-500"
                        : "border-orange-300 text-[rgb(255,127,1)]"
                } cursor-pointer hover:bg-orange-300 hover:text-white`}
            >
                {joined ? "Leave" : "Join"}
            </button>
        );
    };

    const communities = [
        { id: 1, issue: "Media", src: media },
        { id: 2, issue: "Military", src: military },
        { id: 3, issue: "Education", src: education },
        { id: 4, issue: "Immigration", src: immigration },
        { id: 5, issue: "Civil Rights", src: civil },
        { id: 6, issue: "Corona Virus", src: coronavirus },
        { id: 7, issue: "Economy", src: economy },
        { id: 8, issue: "Supreme Court", src: court },
        { id: 9, issue: "Health Care", src: healthcare },
        { id: 10, issue: "Politics", src: politics },
        { id: 11, issue: "Religion", src: religion },
        { id: 12, issue: "Society", src: society },
        { id: 13, issue: "World Congress", src: world },
        { id: 14, issue: "Environment", src: environment },
        { id: 15, issue: "Elections", src: elections },
    ];

    const cities = [
        { id: 1, city: "New York", src: newYork },
        { id: 2, city: "Texas", src: texas },
        { id: 3, city: "Brighton", src: brighton },
        { id: 4, city: "Pittsford", src: pittsford },
        { id: 5, city: "Tennessee", src: tennessee },
    ];

    return (
        <>
            <div className="px-12 md:px-20 lg:px-48 py-8">
                <h1 className="text-gray-800 text-xl md:text-2xl leading-3xl font-medium">
                    Discover Issue Communities
                </h1>

                <div className="py-8 grid small-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {communities.map((community) => (
                        <div
                            key={community.id}
                            className="px-8 py-4 rounded-xl cursor-pointer relative flex flex-col justify-center gap-4 items-center bg-white shadow-lg"
                        >
                            <div className="flex justify-start z-10">
                                <div className="rounded-full border-2 border-black w-[4rem] h-[4rem] overflow-hidden">
                                    <img
                                        src={community.src}
                                        alt="Community"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <p className="font-medium text-gray-800 text-base leading-lg leading-[1.875rem]">
                                {community.issue}
                            </p>
                            {isLoggedIn ? (
                                <JoinButton issue={community.issue} />
                            ) : (
                                <NavLink to={"/login"} className="w-full">
                                    <button className="w-full border-orange-300 border-2 text-[rgb(255,127,1)] cursor-pointer py-1 transition-all duration-500 ease-in-out hover:bg-orange-300 hover:text-white">
                                        Join
                                    </button>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-12 md:px-20 lg:px-48 py-8">
                <h1 className="text-gray-800 text-xl md:text-2xl leading-3xl font-medium">
                    Discover Geographic Communities
                </h1>

                <div className="py-8 grid small-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {cities.map((city) => (
                        <div
                            key={city.id}
                            className="px-8 py-4 rounded-xl cursor-pointer relative flex flex-col justify-center gap-4 items-center bg-white shadow-lg"
                        >
                            <div className="flex justify-start z-10">
                                <div className="rounded-full border-2 border-black w-[4rem] h-[4rem] overflow-hidden">
                                    <img
                                        src={city.src}
                                        alt="City"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <p className="font-medium text-gray-800 text-base leading-lg leading-[1.875rem]">
                                {city.city}
                            </p>
                            {isLoggedIn ? (
                                <JoinButton issue={city.city} />
                            ) : (
                                <NavLink to={"/login"} className="w-full">
                                    <button className="w-full border-orange-300 border-2 text-[rgb(255,127,1)] cursor-pointer py-1 transition-all duration-500 ease-in-out hover:bg-orange-300 hover:text-white">
                                        Join
                                    </button>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Community;

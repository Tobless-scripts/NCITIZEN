import { useState } from "react";
import logo2 from "../assets/logo2.png";
import img1 from "../assets/IMG1.avif";
import img2 from "../assets/IMG2.jpg";
import img3 from "../assets/IMG3.webp";
import img4 from "../assets/IMG4.jpg";
import img5 from "../assets/IMG5.avif";

type PollOption = {
    color: string;
};

type PollWithPercent = PollOption & {
    percent: number;
};

const allPollOptions: PollOption[] = [
    { color: "bg-orange-300" },
    { color: "bg-blue-500" },
    { color: "bg-green-500" },
    { color: "bg-yellow-500" },
    { color: "bg-purple-500" },
    { color: "bg-pink-500" },
    { color: "bg-indigo-500" },
    { color: "bg-orange-500" },
];

// Legend mapping for each section
const legendLabels: { [key: string]: string[] } = {
    weighted: ["Group A", "Group B", "Group C", "Group D"],
    party: ["Democrat", "Republican", "Independent", "Other"],
    gender: ["Male", "Female", "Other"],
    race: ["White", "Black", "Asian", "Hispanic", "Other", "Mixed"],
    age: ["< 18", "18-34", "35-49", "35-44", "50-64", "65+"],
    region: ["North", "South", "East", "West"],
    education: ["Less than a Bachelor's Degree", "Bachelor's Degree or Higher"],
};

const percentages = {
    raw: { yes: [70], no: [30] },
    weighted: { yes: [60, 73, 55, 44], no: [40, 27, 45, 56] },
    party: { yes: [25, 63, 72, 65], no: [75, 37, 28, 35] },
    gender: { yes: [40, 73, 82], no: [60, 27, 18] },
    race: { yes: [64, 57, 20, 82, 62, 82], no: [36, 43, 80, 18, 38, 18] },
    age: { yes: [40, 36, 37, 20, 50], no: [60, 64, 63, 80, 50] },
    region: { yes: [67, 76, 24, 25], no: [33, 24, 76, 75] },
    education: { yes: [60, 45], no: [50, 55] },
};

function Home() {
    const pollContents = [
        {
            id: 1,
            title: "Closing the Department of Education",
            date: "March 20, 2025",
            votes: "2647 votes",
            daysLeft: "12 days left",
            img: img1,
            voteTitle: "Should the Department of Education be abolished?",
            question: "Q1",
        },
        {
            id: 2,
            title: "Elon Musk Favorability",
            date: "February 20, 2025",
            votes: "3581 votes",
            daysLeft: "Closed Mar 22, 2025",
            img: img2,
            voteTitle: "Is your opinion of Elon Musk favorable or unfavorable?",
            question: "Q2",
        },
        {
            id: 3,
            title: "Trump Job Approval",
            date: "January 27, 2025",
            votes: "4011 votes",
            daysLeft: "Closed Feb 27, 2025",
            img: img3,
            voteTitle:
                "Do you approve or disapprove of the way Donald Trump is handling his job as President?",
            question: "Q3",
        },
        {
            id: 4,
            title: "Inauguration in Two Weeks",
            date: "January 3, 2025",
            votes: "1579 votes",
            daysLeft: "closed Feb 7, 2025",
            img: img4,
            voteTitle:
                "What do you think was the major cause for Kamala Harris losing the election?",
            question: "Q4",
        },
        {
            id: 5,
            title: "Trump's Attorney General Pick Shocks Washington",
            date: "November 15, 2024",
            votes: "2384 votes",
            daysLeft: "Closed Dec 15, 2024",
            img: img5,
            voteTitle:
                "Do you approve of Trump’s nomination of congressman Matt Gaetz to be his attorney general?",
            question: "Q5",
        },
    ];

    const buttons = [
        "Raw",
        "Weighted",
        "Party",
        "Gender",
        "Race",
        "Age",
        "Region",
        "Education",
    ];

    const [activeIndexes, setActiveIndexes] = useState<number[]>(
        new Array(pollContents.length).fill(0)
    );

    const handleButtonClick = (pollIndex: number, buttonIndex: number) => {
        const newActiveIndexes = [...activeIndexes];
        newActiveIndexes[pollIndex] = buttonIndex;
        setActiveIndexes(newActiveIndexes);
    };

    const getPollsForButton = (
        index: number,
        section: "yes" | "no"
    ): PollWithPercent[] => {
        const buttonLabel = buttons[activeIndexes[index]];
        const counts =
            percentages[buttonLabel.toLowerCase() as keyof typeof percentages][
                section
            ];
        return allPollOptions.slice(0, counts.length).map((poll, i) => ({
            ...poll,
            percent: counts[i],
        }));
    };

    return (
        <div className="px-4 md:px-20 lg:px-48 py-8">
            {pollContents.map((pollContent, pollIndex) => {
                const currentButton =
                    buttons[activeIndexes[pollIndex]].toLowerCase();
                const legendItems = legendLabels[currentButton] || [];

                return (
                    <div
                        key={pollContent.id}
                        className="bg-white rounded-lg py-8 mb-8"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-center gap-2">
                                <div className="w-[2rem] md:w-[3rem] h-[2rem] md:h-[3rem] rounded-full overflow-hidden">
                                    <img
                                        src={logo2}
                                        alt={pollContent.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>
                                    <h6 className="font-bold text-md">
                                        ncitizen
                                    </h6>
                                    <p className="text-neutral-500 text-md">
                                        {pollContent.date}
                                    </p>
                                </span>
                            </div>
                            <div>
                                <p className="text-neutral-700 font-normal text-md">
                                    {pollContent.votes}
                                </p>
                                <p className="text-neutral-700 font-normal text-md">
                                    {pollContent.daysLeft}
                                </p>
                            </div>
                        </div>

                        {/* Title and Image */}
                        <div className="p-4">
                            <h2 className="font-semibold text-lg text-neutral-700">
                                {pollContent.title}
                            </h2>
                        </div>
                        <span>
                            <img
                                src={pollContent.img}
                                alt={pollContent.title}
                                className="w-full"
                                onError={(e) => {
                                    e.currentTarget.src = "logo2";
                                }}
                            />
                        </span>

                        {/* Button Section */}
                        <div className="flex flex-wrap">
                            <div className="flex w-max flex-wrap justify-center items-center mx-auto mt-2 rounded-md border border-1 border-orange-500">
                                {buttons.map((label, buttonIndex) => (
                                    <button
                                        key={buttonIndex}
                                        onClick={() =>
                                            handleButtonClick(
                                                pollIndex,
                                                buttonIndex
                                            )
                                        }
                                        className={`${
                                            activeIndexes[pollIndex] ===
                                            buttonIndex
                                                ? "bg-orange-500 text-white"
                                                : "text-orange-500 hover:bg-gray-200"
                                        } text-[.7rem] font-medium px-6 py-2 rounded-md transition duration-300 cursor-pointer`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap w-full items-center justify-center gap-2 mt-4 px-6">
                            {legendItems.map((label, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center text-center gap-1"
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full ${
                                            allPollOptions[idx]?.color ||
                                            "bg-gray-300"
                                        }`}
                                    ></span>
                                    <span className="text-[.7rem] text-neutral-700">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-start items-center gap-4">
                            <div className="pl-10 pr-2 bg-[linear-gradient(to_right,_#ffffff_10%,_#f97316_90%)] py-2 text-white font-bold text-2xl leading-3xl">
                                <h1>{pollContent.question}</h1>
                            </div>
                            <h2> {pollContent.voteTitle} </h2>
                        </div>

                        {/* Poll Bars */}
                        <div className="px-10 py-4">
                            <div className="space-y-2">
                                <h2 className="font-bold text-[.9rem]">Yes</h2>
                                {getPollsForButton(pollIndex, "yes").map(
                                    (poll, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-[.7rem] font-medium">
                                                <div className="w-full bg-transparent rounded-full h-4 border border-orange-500 overflow-hidden relative">
                                                    <div
                                                        className={`${poll.color} h-full rounded-full transition-all duration-700`}
                                                        style={{
                                                            width: `${poll.percent}%`,
                                                        }}
                                                    />
                                                    <span className="absolute inset-0 flex items-center justify-center text-black font-medium">
                                                        {poll.percent}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="space-y-2">
                                <h2 className="font-bold text-[.9rem]">Yes</h2>
                                {getPollsForButton(pollIndex, "no").map(
                                    (poll, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-[.7rem] font-medium">
                                                <div className="w-full bg-transparent rounded-full h-4 border border-orange-500 overflow-hidden relative">
                                                    <div
                                                        className={`${poll.color} h-full rounded-full transition-all duration-700`}
                                                        style={{
                                                            width: `${poll.percent}%`,
                                                        }}
                                                    />
                                                    <span className="absolute inset-0 flex items-center justify-center text-black font-medium">
                                                        {poll.percent}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;

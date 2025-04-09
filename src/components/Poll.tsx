import React, { useState } from "react";

type PollOption = {
    label: string;
    color: string;
};

type PollWithPercent = PollOption & {
    percent: number;
};

const allPollOptions: PollOption[] = [
    { label: "Option A", color: "bg-red-500" },
    { label: "Option B", color: "bg-blue-500" },
    { label: "Option C", color: "bg-green-500" },
    { label: "Option D", color: "bg-yellow-500" },
    { label: "Option E", color: "bg-purple-500" },
    { label: "Option F", color: "bg-pink-500" },
    { label: "Option G", color: "bg-indigo-500" },
    { label: "Option H", color: "bg-orange-500" },
];

const PollingComponent: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const getPollsForButton = (index: number): PollWithPercent[] => {
        const count = index + 3; // 3 to 8
        const selected = allPollOptions.slice(0, count);
        const base = Math.floor(100 / count);
        const remainder = 100 - base * count;

        return selected.map((poll, i) => ({
            ...poll,
            percent: base + (i === 0 ? remainder : 0), // first item gets remainder
        }));
    };

    return (
        <div className="p-6">
            <div className="flex gap-2 mb-6">
                {Array.from({ length: 5 }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`px-4 py-2 rounded text-white transition duration-300 ${
                            activeIndex === idx
                                ? "bg-orange-500"
                                : "bg-gray-600"
                        }`}
                    >
                        Button {idx + 1}
                    </button>
                ))}
            </div>

            {activeIndex !== null && (
                <div className="space-y-4 transition-all duration-500">
                    {getPollsForButton(activeIndex).map((poll, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-1 text-sm font-medium">
                                <span>{poll.label}</span>
                                <span>{poll.percent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`${poll.color} h-4 rounded-full transition-all duration-700`}
                                    style={{ width: `${poll.percent}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PollingComponent;

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SimulationControls = ({
    onStart,
    onPause,
    onResume,
    onSeek,
    isSimulationRunning,
    isPaused,
    currentIndex,
    totalPathLength,
}) => {
    const [showControls, setShowControls] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex === totalPathLength - 1;

    const toggleControls = () => setShowControls(!showControls);

    const handleStartClick = () => {
        if (totalPathLength === 0) {
            setErrorMessage("Please enter valid coordinates or upload a JSON file to start the simulation.");
        } else {
            setErrorMessage("");
            onStart();
        }
    };

    return (
        <div className="w-full bg-gray-900 p-4 border-t-2 border-gray-700 mt-4 fixed bottom-0 left-0">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-400">Simulation Controls</h2>
                <button onClick={toggleControls} className="focus:outline-none">
                    {showControls ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                </button>
            </div>
            {showControls && (
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    {/* Start/Restart Button */}
                    <button
                        onClick={handleStartClick}
                        disabled={isSimulationRunning && !isPaused && !isAtEnd}
                        className={`w-full md:w-auto ${isSimulationRunning && !isPaused && !isAtEnd
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                            } text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    >
                        {isSimulationRunning && !isAtEnd ? "Restart Simulation" : "Start Simulation"}
                    </button>

                    {/* Pause Button */}
                    <button
                        onClick={onPause}
                        disabled={isPaused || isAtEnd || !isSimulationRunning}
                        className={`w-full md:w-auto ${isPaused || isAtEnd || !isSimulationRunning
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                            } text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-300 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2`}
                    >
                        Pause
                    </button>

                    {/* Resume Button */}
                    <button
                        onClick={onResume}
                        disabled={!isPaused || isAtStart || isAtEnd || !isSimulationRunning}
                        className={`w-full md:w-auto ${!isPaused || isAtStart || isAtEnd || !isSimulationRunning
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            } text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        Resume
                    </button>

                    {/* Seek Range */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full md:w-1/3 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => onSeek(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default SimulationControls;

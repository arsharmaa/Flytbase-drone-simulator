import React from "react";

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
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex === totalPathLength - 1;

    return (
        <div className="w-full bg-gray-900 p-4 border-t-2 border-gray-700 mt-4 fixed bottom-0 left-0">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                {/* Start/Restart Button */}
                <button
                    onClick={onStart}
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
        </div>
    );
};

export default SimulationControls;

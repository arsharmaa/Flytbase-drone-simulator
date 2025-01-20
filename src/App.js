import React, { useState, useEffect, useRef } from "react";
import MapComponent from "./components/MapComponent";
import InputForm from "./components/InputForm";
import SimulationControls from "./components/SimulationControls";
import droneImg from "./img1.png";

const App = () => {
  const [path, setPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalIdRef = useRef(null);
  const defaultPosition = { lat: 0, lng: 0 };
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    if (path.length > 0 && !isPaused) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < path.length - 1) {
            const nextIndex = prevIndex + 1;
            setCurrentPosition(path[nextIndex]);
            return nextIndex;
          } else {
            clearInterval(intervalIdRef.current);
            return prevIndex;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalIdRef.current);
  }, [path, isPaused]);

  const handleDataSubmit = (data) => {
    const isValid = data.every(({ lat, lng }) => !isNaN(lat) && !isNaN(lng));
    if (!isValid) {
      console.error("Invalid data format:", data);
      return;
    }
    setPath(data);
    setCurrentPosition(data[0]);
    setCurrentIndex(0);
    setIsPaused(true);
    clearInterval(intervalIdRef.current);
  };

  const handleStart = () => {
    if (path.length > 0) {
      setCurrentIndex(0);
      setCurrentPosition(path[0]);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(intervalIdRef.current);
  };

  const handleResume = () => {
    if (path.length > 0 && currentIndex < path.length - 1) {
      setIsPaused(false);
    }
  };

  const handleSeek = (value) => {
    const index = Math.floor((value / 100) * path.length);
    setCurrentPosition(path[index]);
    setCurrentIndex(index);
    if (!isPaused) {
      setIsPaused(true);
      clearInterval(intervalIdRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center">
            <img
              src={droneImg}
              alt="Drone Simulator Logo"
              className="h-20 w-20 md:h-72 md:w-72 object-contain mr-16"
            />
            <div className="ml-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-8">
                Drone Simulator
              </h1>
              <p className="text-gray-300 text-sm md:text-base mt-1">
                Simulate and track drone motion effortlessly
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map Section */}
          <section className={`${showForm ? "w-full md:w-2/3" : "w-full md:w-full"} relative mb-32 h-[calc(100vh-16rem)] bg-gray-700 rounded-md overflow-hidden shadow-md`}>
            <MapComponent
              path={path}
              currentPosition={currentPosition || defaultPosition}
            />
          </section>

          {/* Form Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <button
              onClick={toggleForm}
              className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-300"
            >
              {showForm ? "Hide Form" : "Show Form"}
            </button>
            {showForm && (
              <div className="p-4 bg-gray-700 rounded-lg shadow-md w-full">
                <InputForm onDataSubmit={handleDataSubmit} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Simulation Controls */}
      <footer className="mt-auto">
        <SimulationControls
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onSeek={handleSeek}
          isSimulationRunning={path.length > 0}
          isPaused={isPaused}
          currentIndex={currentIndex}
          totalPathLength={path.length}
        />
      </footer>
    </div>
  );
};

export default App;

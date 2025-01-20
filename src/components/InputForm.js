import React, { useState } from "react";

const InputForm = ({ onDataSubmit }) => {
    const [coordinates, setCoordinates] = useState([{ lat: "", lng: "" }]);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCoordinateChange = (index, event) => {
        const { name, value } = event.target;
        if (isNaN(value)) {
            setErrorMessage("Latitude and Longitude must be numbers.");
        } else {
            setErrorMessage("");
            const newCoordinates = coordinates.map((coordinate, idx) => {
                if (index === idx) {
                    return { ...coordinate, [name]: value };
                }
                return coordinate;
            });
            setCoordinates(newCoordinates);
        }
    };

    const handleAddCoordinate = () => {
        setCoordinates([...coordinates, { lat: "", lng: "" }]);
    };

    const handleRemoveCoordinate = (index) => {
        const newCoordinates = coordinates.filter((_, idx) => idx !== index);
        setCoordinates(newCoordinates);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "application/json" || file.type === "text/plain")) {
            setFile(file);
            setErrorMessage("");
        } else {
            setErrorMessage("Only JSON/Text files are allowed.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    const isValid = data.every(({ lat, lng }) => !isNaN(lat) && !isNaN(lng));
                    if (!isValid) {
                        setErrorMessage("Invalid data format in JSON file.");
                        return;
                    }
                    setErrorMessage("");
                    onDataSubmit(data);
                } catch (error) {
                    setErrorMessage("Failed to parse JSON file.");
                }
            };
            reader.readAsText(file);
        } else {
            const isValid = coordinates.every(({ lat, lng }) => !isNaN(lat) && !isNaN(lng));
            if (!isValid) {
                setErrorMessage("Latitude and Longitude must be numbers.");
                return;
            }
            const data = coordinates.map(coord => ({
                lat: parseFloat(coord.lat),
                lng: parseFloat(coord.lng),
            }));
            setErrorMessage("");
            onDataSubmit(data);
        }
    };

    const isSubmitDisabled = !file && coordinates.every(coord => coord.lat === "" || coord.lng === "");

    return (
        <div className="p-6 bg-gray-700 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                {coordinates.map((coordinate, index) => (
                    <div key={index} className="flex items-center mb-4">
                        <div className="flex-grow">
                            <label className="block text-gray-300 mb-2">Latitude:</label>
                            <input
                                type="text"
                                name="lat"
                                value={coordinate.lat}
                                onChange={(e) => handleCoordinateChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <label className="block text-gray-300 mb-2">Longitude:</label>
                            <input
                                type="text"
                                name="lng"
                                value={coordinate.lng}
                                onChange={(e) => handleCoordinateChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveCoordinate(index)}
                            className="mt-2 ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddCoordinate}
                    className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition duration-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Add More Coordinates
                </button>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload JSON File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full px-4 py-2 text-white font-medium rounded-md transition duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InputForm;

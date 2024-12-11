import { useState, useContext } from "react";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { userContext } from "../../User";

function AbsenceForm() {
    const [absenceType, setAbsenceType] = useState("Sick Leave");
    const [absenceDate, setAbsenceDate] = useState(new Date());
    const [proofFile, setProofFile] = useState(null);
    const { id, username } = useContext(userContext);
    const handleFileChange = (e) => {
        setProofFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!proofFile) {
            alert("Please upload a file.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", proofFile);

            const response = await axios.post("https://api.signnow.com/document", formData, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer bd1504a981a2b0a2ca4de662702e4e7fd4f19af40ad257047ccf5bf4c351c3a4",
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("File uploaded successfully:", "4332fab1e79645b882b7c9d09562f6ce2fbbf03c");
            alert("File uploaded successfully!");

        } catch (error) {
            console.error("Error uploading file:", error.response || error);
            alert("Failed to upload the file. Please try again.");
        }
    };

    function uploadPhoto(e) {
        alert("uploading");
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("file", files[i]);
        }
        data.append("id", id);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="absenceType"
                >
                    Absence Type:
                </label>
                <select
                    id="absenceType"
                    value={absenceType}
                    onChange={(e) => setAbsenceType(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Day">Personal Day</option>
                    <option value="Other">Other (specify)</option>
                </select>
                {absenceType === "Other" && (
                    <input
                        type="text"
                        placeholder="Specify absence type"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                )}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="absenceDate"
                >
                    Absence Date:
                </label>
                <DatePicker
                    selected={absenceDate}
                    onChange={(date) => {
                        setAbsenceDate(date);

                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const year = date.getFullYear();

                        console.log(`Month: ${month}, Day: ${day}, Year: ${year}`);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="proofFile"
                >
                    Proof Upload:
                </label>
                <input type="file" id="proofFile" onChange={handleFileChange} />
                {proofFile && (
                    <p className="mt-2 text-sm text-gray-600">{proofFile.name}</p>
                )}
            </div>


            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default AbsenceForm;

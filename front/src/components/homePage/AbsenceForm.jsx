import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AbsenceForm() {
    const [absenceType, setAbsenceType] = useState('Sick Leave');
    const [absenceDate, setAbsenceDate] = useState(new Date());
    const [proofFile, setProofFile] = useState(null);

    const handleFileChange = (e) => {
        setProofFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="absenceType">
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
                {absenceType === 'Other' && (
                    <input
                        type="text"
                        placeholder="Specify absence type"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="absenceDate">
                    Absence Date:
                </label>
                <DatePicker
                    selected={absenceDate}
                    onChange={(date) => setAbsenceDate(date)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proofFile">
                    Proof Upload:
                </label>
                <input
                    type="file"
                    id="proofFile"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {proofFile && <p className="mt-2 text-sm text-gray-600">{proofFile.name}</p>}
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
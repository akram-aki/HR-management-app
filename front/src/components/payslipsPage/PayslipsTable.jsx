import React from 'react'

import "react-datepicker/dist/react-datepicker.css";
const payslipsData = [

    {
        "date": "01/01/2021",
        "salaireDeBase": "100000",
        "retenuSecluSLE": "5000",
        "panier": "10000",
        "transport": "5000",
        "retenuIRG": "2000",
        "downloadLink": "http://localhost:8000/payslips/1"
    },
    {
        "date": "01/01/2021",
        "salaireDeBase": "100000",
        "retenuSecluSLE": "5000",
        "panier": "10000",
        "transport": "5000",
        "retenuIRG": "2000",
        "downloadLink": "http://localhost:8000/payslips/1"
    }
    ,
    {
        "date": "12/12/2024",
        "salaireDeBase": "100000",
        "retenuSecluSLE": "5000",
        "panier": "10000",
        "transport": "5000",
        "retenuIRG": "2000",
        "downloadLink": "http://localhost:8000/payslips/1"
    }


]
function PayslipsTable(startDate, endDate) {
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const filteredPayslips = payslipsData.filter(payslip => {
        const payslipDate = parseDate(payslip.date);
        return payslipDate >= new Date(startDate) && payslipDate <= new Date(endDate);
    });

    return (
        <table className="table-auto w-full mt-10 pb-6">
            <thead>
                <tr>
                    <th className="text-center pb-6">Date</th>
                    <th className="text-center pb-6">Salaire de Base</th>
                    <th className="text-center pb-6">Retenu Seclu. SLE</th>
                    <th className="text-center pb-6">Panier</th>
                    <th className="text-center pb-6">Transport</th>
                    <th className="text-center pb-6">Retenu IRG</th>
                    <th className="text-center pb-6">Download</th>
                </tr>
            </thead>
            <tbody>
                {filteredPayslips.map((payslip, index) => (
                    <tr key={index} className="pb-6">
                        <td className="text-center pb-6">{payslip.date}</td>
                        <td className="text-center pb-6">{payslip.salaireDeBase}</td>
                        <td className="text-center pb-6">{payslip.retenuSecluSLE}</td>
                        <td className="text-center pb-6">{payslip.panier}</td>
                        <td className="text-center pb-6">{payslip.transport}</td>
                        <td className="text-center pb-6">{payslip.retenuIRG}</td>
                        <td className="text-center pb-6">
                            <a href={payslip.downloadLink} download>
                                <div className="flex justify-center gap-8">
                                    <img src={pdfIcon} alt="pdf icon" className="w-6 h-6" />
                                    <img src={csvIcon} alt="csv icon" className="w-6 h-6" />
                                </div>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default PayslipsTable
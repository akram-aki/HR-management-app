import React from 'react'
import pdfIcon from './pdfIcon.svg'
import csvIcon from './csvIcon.svg'
export const payslipsData = [

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
function Payslips() {
  return (
    <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
      <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
        <h2 className="text-gray-500 text-lg font-semibold pb-1">Paychecks</h2>
        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
        <table className="table-auto w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-center py-2 px-4 border-b">Date</th>
              <th className="text-center py-2 px-4 border-b">Salaire de Base</th>
              <th className="text-center py-2 px-4 border-b">Retenu Seclu. SLE</th>
              <th className="text-center py-2 px-4 border-b">Panier</th>
              <th className="text-center py-2 px-4 border-b">Transport</th>
              <th className="text-center py-2 px-4 border-b">Retenu IRG</th>
              <th className="text-center py-2 px-4 border-b">Download</th>
            </tr>
          </thead>
          <tbody>
            {payslipsData.map((payslip, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="text-center py-2 px-4 border-b">{payslip.date}</td>
                <td className="text-center py-2 px-4 border-b">{payslip.salaireDeBase}</td>
                <td className="text-center py-2 px-4 border-b">{payslip.retenuSecluSLE}</td>
                <td className="text-center py-2 px-4 border-b">{payslip.panier}</td>
                <td className="text-center py-2 px-4 border-b">{payslip.transport}</td>
                <td className="text-center py-2 px-4 border-b">{payslip.retenuIRG}</td>
                <td className="text-center py-2 px-4 border-b">
                  <a href={payslip.downloadLink} download>
                    <div className="flex justify-center gap-2">
                      <img src={pdfIcon} alt="pdf icon" className="w-6 h-6" />
                      <img src={csvIcon} alt="csv icon" className="w-6 h-6" />
                    </div>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Payslips
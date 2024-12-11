import React from 'react'
import { absenceRequests } from './Absences'
import { payslipsData } from './Payslips'
function Overview() {
  return (
    <div>
      <div className="mt-8 space-y-4">
        <div className="bg-white p-4 shadow rounded-lg w-full">
          <h2 className="text-gray-500 text-lg font-semibold pb-1">Absences</h2>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
          {absenceRequests.map((request, index) => (
            <div key={index} className="flex items-center justify-between my-4 p-3 border rounded-lg hover:bg-gray-100">
              <div>
                <h3 className='text-lg font-bold'>{request.type}</h3>
                <p className='text-sm text-gray-500'>From <span className='text-black'>{request.startDate}</span> until <span className='text-black'>{request.endDate}</span></p>
              </div>
              <div className='flex items-center gap-8'>
                <p className={`text-sm ${request.status === 'Approved' ? 'text-green-500' : 'text-orange-500'}`}>{request.status}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 shadow rounded-lg w-full">
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
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Overview
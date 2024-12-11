import React from 'react'

function Absences() {
  const daysAbsented = 7;
  const maxDays = 10;
  return (
    <div>
      <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2 h-full">
          <h2 className="text-gray-500 text-lg font-semibold pb-1 text-center mx-20">Absences Summary</h2>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6">
            <div className='flex items-center'>
              <h3 className='text-lg font-bold my-4'>Leave Balance:&nbsp;</h3> <span className='text-orange-600'>{maxDays - daysAbsented}/{maxDays} days remaining.</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Absences
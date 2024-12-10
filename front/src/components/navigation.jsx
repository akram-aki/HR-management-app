import React from 'react'

function navigation(currentDir) {
    return (
        <div className='flex my-4'>
            <a href="./home">Home</a>
            <a href={currentDir}>{currentDir}</a>
        </div >
    )
}

export default navigation
import React, { useState } from 'react'
import './ArchivePageItem.css'

function ArchivePageItem({project}) {

    
    return (
        <div className='ArchiveItemContainer'>
                <p style={{fontSize:'48px'}}>{project.name}</p>
                <div className='Description'>{project.description}</div>
                <p className='CompletedIn'>Completed in:{(Math.ceil((Date.parse(project.finished_at)-Date.parse(project.created_at))/(1000*60*60*24)))} days</p>
        </div>
    )
}

export default ArchivePageItem

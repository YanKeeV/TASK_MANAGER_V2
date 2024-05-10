import React, { useState } from 'react'
import './Files.css'

function Files() {

    const [name,setName] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [description,setDescription] = useState('');
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('');

    const a = [{name:'file1.jpg'},{name:'file1.jpg'},{name:'file1.jpg'},{name:'file1.jpg'},{name:'file2.jpg'},{name:'file2.jpg'},{name:'file2.jpg'},]

    return (
        <div className='FilesContainer'>
            <form className='FilesContentContainer'>
                <div className='FilesTopPart'>
                    <div  className='TopFormUserInfo'>
                        <div style={{width:"150px",height:"150px",border:'1px solid black',borderRadius:'50%',display:'flex',justifyContent:"center",alignItems:'center'}}>
                            66%
                        </div>
                        <div>
                            Storage <br/>
                            <span style={{fontSize:'32px'}}>12.3/15 GB</span>
                        </div>
                    </div>
                    <div className='TopFormActions'>
                        <input placeholder='Search' className='FilesSearchInput'/>
                    </div>
                </div>
                <div className='FilesHeading'>Uploads</div>
                <div className='BottomFilesPart'>
                    {/* MAP HERE */}
                    {a.map(item=>(
                        <div className='FileItem'>
                            {item.name}
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default Files

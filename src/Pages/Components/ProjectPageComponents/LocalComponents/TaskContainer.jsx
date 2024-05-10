import React, { useState,useCallback } from 'react'
import './TaskContainer.css'
import TaskComponent from './TaskComponent'

function TaskContainer({color,type, tasks, deleteTask, children, getTasks}) {

    return (
    <div className='MainTaskContainer' style={{color:`#${color}`, borderColor:`#${color}`}}> 
        <div className='TasksContainerHeader'>
            <p>{type}</p>
            {children}
        </div>
        <div className='TasksContainer'>
            {tasks.map(task=>(
                <TaskComponent key={task.pk} task={task} deleteTask={deleteTask} getTasks={getTasks}/>
            ))}
        </div>
    </div>
    )
}

export default TaskContainer

import React from 'react';
import ListItem from './listitem';

const ToDoContainer = ({todoItems, clickCheck, clickDelete}) => {
    return(
        <div className="toDoContainer">
            {todoItems.map(itemInfo=> (
                <ListItem info={itemInfo} clickCheck={clickCheck} clickDelete={clickDelete}/>
            ))}
        </div>
    )
}

export default ToDoContainer;
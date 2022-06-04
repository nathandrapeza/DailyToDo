import React from 'react';
import '../style/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ListItem = ({info, clickCheck, clickDelete}) => {

    const daysRemaining = (days) => {

        /* 
        Code used to compare difference in amount of days:
        Source: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
        */
        var duedate = new Date(info.duedate);
        //console.log(date);

        // One day Time in ms (milliseconds)
        var one_day = 1000 * 60 * 60 * 24
    
        // To set present_dates to two variables
        var present_date = new Date();
        
        if (present_date.getMonth() == 11 && present_date.getdate() > 25)
        duedate.setFullYear(duedate.getFullYear() + 1)

        // For some reason it's off by one day
        duedate.setDate(duedate.getDate() + 1);
        
        // To Calculate the result in milliseconds and then converting into days
        var Result = Math.round(duedate.getTime() - present_date.getTime()) / (one_day);
        
        // To remove the decimals from the (Result) resulting days value
        var Final_Result = Result.toFixed(0);


        
        /* used for testing
        console.log("===")
        console.log(Final_Result)
        console.log(duedate)
        console.log(present_date)
        console.log("===")
        */

        //console.log(duedate)

        let ret_str = ""

        if (info.complete) {
            if (Final_Result == 0) {
                ret_str += " (due today - ";
            } else if (Final_Result == 1) {
                ret_str += " (due 1 day ago - ";
            }else if (Final_Result==-1) {
                ret_str += " (due 1 day ago - ";
            } else if (Final_Result > 0) {
                ret_str += ` (due in ${Final_Result} days - `;
            } else {
                ret_str += ` (due ${-1*Final_Result} days ago - `;
            }
        } else {
            if (Final_Result == 0) {
                ret_str += "Due today (";
            } else if (Final_Result==-1) {
                ret_str += `Overdue by 1 day (`;
            } else if (Final_Result == 1) {
                ret_str += "Due in 1 day (";
            } else if (Final_Result > 0) {
                ret_str += `Due in ${Final_Result} days (`;
            } else {
                ret_str += `Overdue by ${-1*Final_Result} days (`;
            }
        }

        return ret_str + String(duedate).slice(0,15) + ").";

        
    }

    const changeBackground = (e) => {
        e.target.style.background='red';
    }

    

    return (
        <div className="todoListItem">
            <div className="leftSide">
                <span onClick={() => { (clickCheck(info.id)) }}>
                    <FontAwesomeIcon className="progressIcon" icon={info.complete ? faSquareCheck : faSquare}/>
                </span>
                <span className="todoDescription">{info.description}</span>
            </div>
            <div className="leftSide">
                {info.complete ? <span className='completedText'>Completed!&nbsp;</span> : ""}<span className="duedate">{daysRemaining(info.duedate)}</span>
                <span onClick={() => { (clickDelete(info.id)) }}>
                    <FontAwesomeIcon className="progressIcon" icon={faTrashCan} />
                </span>
            </div>
        </div>
    )
}

export default ListItem;
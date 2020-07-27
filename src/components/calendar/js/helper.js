import {monthNames, weekDayNames, monthShortNames} from '../../../variables/commons';

const populateEvents=(day, data, year)=>{
    data.forEach(el => {
        const case1 = (el.month ===day.dateMonth ||el.month === '') 
            && (el.year === day.year)
            && (day.dateNum === el.date ||el.date === '')
        const case2 = (el.year === '' && year <= day.year)
            && el.month === day.dateMonth 
            && el.date === day.dateNum

        if(case1){
            day.data.push(el)
        }else if(case2){
            day.data.push(el)
        }
    });
    return day
}
const getYearsList=(year)=>{
    const years = [];
    for(let i=year-50; i<=year+50; i++){
        years.push(i);
    }
    return years;
};
const getFirstDay=(date, startDay=0)=>{
    if(date.getDay() === startDay){
        return date; 
    }else{
        date = date.setDate(date.getDate()-1);
        return getFirstDay(new Date(date));
    };
};
const getLastDay=(date, month, endDay=6)=>{
    
    if((date.getDay() === endDay && date.getMonth()>month) || (date.getDay() === endDay && date.getMonth()===0)){
        return date;
    }else{
        date = date.setDate(date.getDate()+1);
        return getLastDay(new Date(date), month);
    };
};
const checkCurrentMonth=(month, monthInState)=>{
    if(month===monthInState){
        return true
    }else{
        return false
    } 
}

const getDates=(month=1, selectedYear,propsdata, selectedDay=new Date().getDate())=>{
    const startDate = new Date(selectedYear,month, 1);
    const lastOfMonth = new Date(selectedYear, month, new Date(selectedYear,month+1, -1).getDate());
    const endDate = helper.getLastDay(lastOfMonth, month);
    let i=helper.getFirstDay(startDate);
    let week = [];
    let monthDates = [];
    let count = 0;
    for(i;i<= endDate; i.setDate(i.getDate()+1)){
        count++;
        let selectedDate = new Date(i);
        let dateNum = selectedDate.getDate();
        let weeknum = 1;
        let data = [];
        let focused;
        if(selectedDay===dateNum){
            focused=true;
        }else{
            focused=false;
        };
        let day = {
            id:count,
            dateNum:selectedDate.getDate(),
            selectedDate,
            dateMonth:selectedDate.getMonth(),
            monthName:monthNames[selectedDate.getMonth()], 
            monthShortName:monthShortNames[selectedDate.getMonth()],
            year:selectedDate.getFullYear(), 
            weekday:weekDayNames[selectedDate.getDay()],
            weeknum,
            focused,
            data
        };
        if(propsdata !== undefined && propsdata !== null){
            week.push(populateEvents(day, propsdata, selectedYear));
        }else{
            week.push(day);
        }
        
        if(count%7===0){
            monthDates.push(week)
            weeknum++ 
            week = [];
        };    
    };
    return monthDates;
}

let helper = {
    populateEvents:populateEvents,
    getYearsList:getYearsList,
    getFirstDay:getFirstDay,
    getLastDay:getLastDay,
    checkCurrentMonth:checkCurrentMonth,
    getDates:getDates
};

export {helper}
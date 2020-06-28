const moment = require('moment');

export const getDestinationName = () => {
    let destinationName = document.getElementById("destination").value;

    destinationName = destinationName.toLowerCase();
    destinationName = destinationName[0].toUpperCase()+destinationName.slice(1);

    return destinationName;
}

export const tripDates = () => {
    const departureDate = document.getElementById("departure_date").value;
    const returnDate = document.getElementById("return_date").value;
    return [departureDate, returnDate];
}

export const duration = (start, end) =>{
    return Math.ceil((new Date(end).getTime() - new Date(start).getTime())/(1000*60*60*24));
}

export const dateFormat = (date) =>{
    return moment(new Date(date)).format('ll');
}

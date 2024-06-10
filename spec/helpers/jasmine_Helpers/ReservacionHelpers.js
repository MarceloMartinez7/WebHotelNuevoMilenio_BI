// reservationHelper.js


function registerReservation(guestName, checkInDate, checkOutDate, roomType) {
    
    const reservation = {
        guestName: guestName,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        roomType: roomType,
        reservationId: generateReservationId() 
    };
    reservations.push(reservation); 
    return reservation;
}


function generateReservationId() {
    
    return Math.floor(Math.random() * 1000000);
}


function getReservationDetails(reservationId) {
    
    return reservations.find(reservation => reservation.reservationId === reservationId) || null;
}


const reservations = [];


module.exports = {
    registerReservation,
    getReservationDetails,
    reservations 
};

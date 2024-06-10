// ReservationSystem.js
class ReservationSystem {
    constructor() {
        this.reservations = [];
    }

    registerReservation(name, date, time) {
        if (this.isDateAvailable(date, time)) {
            this.reservations.push({ name: name, date: date, time: time });
            return true;
        } else {
            return false;
        }
    }

    isDateAvailable(date, time) {
        return !this.reservations.some(reservation => reservation.date === date && reservation.time === time);
    }
}

module.exports = ReservationSystem;

class ReservationSystem {
    constructor() {
        this.reservations = [];
    }

    /**
     * Registra una nueva reservación si la fecha y hora están disponibles.
     * @param {string} name - Nombre del huésped.
     * @param {Date} checkInDate - Fecha de check-in.
     * @param {Date} checkOutDate - Fecha de check-out.
     * @param {string} roomType - Tipo de habitación.
     * @returns {boolean} - `true` si la reservación fue registrada exitosamente, `false` de lo contrario.
     */
    registerReservation(name, checkInDate, checkOutDate, roomType) {
        if (this.isDateAvailable(checkInDate, checkOutDate)) {
            this.reservations.push({ name: name, checkInDate: checkInDate, checkOutDate: checkOutDate, roomType: roomType });
            return true;
        } else {
            return false;
        }
    }

    /**
     * Verifica si una fecha y hora están disponibles.
     * @param {Date} checkInDate - Fecha de check-in.
     * @param {Date} checkOutDate - Fecha de check-out.
     * @returns {boolean} - `true` si la fecha y hora están disponibles, `false` de lo contrario.
     */
    isDateAvailable(checkInDate, checkOutDate) {
        return !this.reservations.some(reservation => reservation.checkInDate === checkInDate && reservation.checkOutDate === checkOutDate);
    }
}

module.exports = ReservationSystem;

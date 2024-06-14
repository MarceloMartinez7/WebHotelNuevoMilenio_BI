class ReservationHelper {
    constructor() {
        this.reservations = [];
    }

    /**
     * Registra una nueva reservación.
     * @param {string} guestName - Nombre del huésped.
     * @param {Date} checkInDate - Fecha de check-in.
     * @param {Date} checkOutDate - Fecha de check-out.
     * @param {string} roomType - Tipo de habitación.
     * @returns {Object} - La reservación registrada.
     */
    registerReservation(guestName, checkInDate, checkOutDate, roomType) {
        if (!guestName || !checkInDate || !checkOutDate || !roomType) {
            throw new Error("Datos de la reservación no válidos.");
        }

        if (checkInDate >= checkOutDate) {
            throw new Error("Fecha de check-out debe ser después de la fecha de check-in.");
        }

        const reservation = {
            guestName: guestName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomType: roomType,
            reservationId: this.generateReservationId()
        };

        this.reservations.push(reservation);
        return reservation;
    }

    /**
     * Genera un ID único para la reservación.
     * @returns {number} - ID único de la reservación.
     */
    generateReservationId() {
        return Math.floor(Math.random() * 1000000);
    }

    /**
     * Obtiene los detalles de una reservación.
     * @param {number} reservationId - ID de la reservación.
     * @returns {Object|null} - La reservación correspondiente o null si no se encuentra.
     */
    getReservationDetails(reservationId) {
        return this.reservations.find(reservation => reservation.reservationId === reservationId) || null;
    }

    /**
     * Verifica si una fecha está disponible.
     * @param {Date} checkInDate - Fecha de check-in.
     * @param {Date} checkOutDate - Fecha de check-out.
     * @returns {boolean} - `true` si la fecha está disponible, `false` de lo contrario.
     */
    isDateAvailable(checkInDate, checkOutDate) {
        return !this.reservations.some(reservation => 
            (checkInDate < reservation.checkOutDate && checkOutDate > reservation.checkInDate)
        );
    }
}

module.exports = ReservationHelper;

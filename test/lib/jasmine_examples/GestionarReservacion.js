// ReservationService.js
class ReservationService {
    constructor() {
        this.reservations = [];
    }

    /**
     * @param {string} customerName 
     * @param {number} roomNumber 
     * @param {string} startDate 
     * @param {string} endDate 
     * @returns {Object} 
     */
    registerReservation(customerName, roomNumber, startDate, endDate) {
        if (this.isRoomAvailable(roomNumber, startDate, endDate)) {
            const reservation = { customerName, roomNumber, startDate, endDate };
            this.reservations.push(reservation);
            return { success: true, message: "Reservación realizada exitosamente." };
        } else {
            return { success: false, message: "La habitación no está disponible para el período especificado." };
        }
    }

    /**
    
     * @param {number} roomNumber 
     * @param {string} startDate 
     * @param {string} endDate 
     * @returns {boolean}
     */
    isRoomAvailable(roomNumber, startDate, endDate) {
      
        const reservationsForRoom = this.reservations.filter(reservation => reservation.roomNumber === roomNumber);

        
        for (let i = 0; i < reservationsForRoom.length; i++) {
            const reservation = reservationsForRoom[i];
            if (this.isOverlap(startDate, endDate, reservation.startDate, reservation.endDate)) {
              
                return false;
            }
        }

      
        return true;
    }

    /**
   
      @param {string} startA 
      @param {string} endA 
      @param {string} startB 
      @param {string} endB 
      @returns {boolean}
     */
    isOverlap(startA, endA, startB, endB) {
        return (startA <= endB && endA >= startB);
    }
}

module.exports = ReservationService;

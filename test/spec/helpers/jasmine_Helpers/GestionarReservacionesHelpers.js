// reservationHelper.js

class ReservationHelper {
    constructor() {
    }

    /**
    
     * @param {string} startA 
     * @param {string} endA 
     * @param {string} startB 
     * @param {string} endB 
     * @returns {boolean} 
     */
    isOverlap(startA, endA, startB, endB) {
        return (startA <= endB && endA >= startB);
    }

}

module.exports = ReservationHelper;

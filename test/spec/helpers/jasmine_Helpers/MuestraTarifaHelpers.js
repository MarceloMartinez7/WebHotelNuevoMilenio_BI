// TariffService.js
class TariffHelper {
    /**
     
     * @param {string} date 
     * @returns {boolean} 
     */
    static isValidDate(date) {
        return /\d{4}-\d{2}-\d{2}/.test(date);
    }

    /**
    
     * @param {number} price 
     * @returns {boolean} 
     */
    static isValidPrice(price) {
        return price > 0;
    }

    /**
     
     * @param {string} startDate 
     * @param {string} endDate 
     * @param {number} price 
     * @returns {boolean} 
     */
    static isTariffValid(startDate, endDate, price) {
        return this.isValidDate(startDate) && this.isValidDate(endDate) && this.isValidPrice(price);
    }

    /**
    
      @param {Array} tariffs 
     * @param {number} roomNumber 
     * @param {string} date 
     * @returns {Object|null} 
     */
    static findTariff(tariffs, roomNumber, date) {
        return tariffs.find(tariff =>
            tariff.roomNumber === roomNumber && date >= tariff.startDate && date <= tariff.endDate
        ) || null;
    }
}

class TariffService {
    constructor() {
        this.tariffs = [];
    }

    /**
     
     * @param {number} roomNumber 
     * @param {string} startDate 
     * @param {string} endDate 
     * @param {number} price 
     * @returns {Object} 
     */
    addTariff(roomNumber, startDate, endDate, price) {
        if (!TariffHelper.isTariffValid(startDate, endDate, price)) {
            return { success: false, message: "Datos de tarifa no válidos." };
        }

        const tariff = { roomNumber, startDate, endDate, price };
        this.tariffs.push(tariff);
        return { success: true, message: "Tarifa agregada exitosamente." };
    }

    /**
     
     * @param {number} roomNumber 
     * @param {string} date 
     * @returns {number|null} 
     */
    getTariff(roomNumber, date) {
        const tariff = TariffHelper.findTariff(this.tariffs, roomNumber, date);
        return tariff ? tariff.price : null;
    }
}
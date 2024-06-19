// TariffService.js
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
        if (!this.isTariffValid(startDate, endDate, price)) {
            return { success: false, message: "Datos de tarifa no válidos." };
        }

        const tariff = { roomNumber, startDate, endDate, price };
        this.tariffs.push(tariff);
        return { success: true, message: "Tarifa agregada exitosamente." };
    }

    /**
    
     * @param {string} startDate 
     * @param {string} endDate 
     * @param {number} price 
     * @returns {boolean}
     */
    isTariffValid(startDate, endDate, price) {
        const isValidDate = date => /\d{4}-\d{2}-\d{2}/.test(date);
        const isValidPrice = price => price > 0;

        return isValidDate(startDate) && isValidDate(endDate) && isValidPrice(price);
    }

    /**
    
     * @param {number} roomNumber 
     * @param {string} date 
     * @returns {number|null} 
     */
    getTariff(roomNumber, date) {
        const tariff = this.tariffs.find(tariff =>
            tariff.roomNumber === roomNumber && date >= tariff.startDate && date <= tariff.endDate
        );
        return tariff ? tariff.price : null;
    }
}

module.exports = TariffService;

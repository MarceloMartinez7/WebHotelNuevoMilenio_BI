// tariffServiceSpec.js

const TariffService = require('../../lib/jasmine_examples/MuestraTarifa');

describe('TariffService', function() {
    let tariffService;

    beforeEach(function() {
        tariffService = new TariffService();
    });

    it('should add a tariff successfully with valid data', function() {
        const result = tariffService.addTariff(101, '2024-06-01', '2024-06-10', 100);
        expect(result.success).toBe(true);
        expect(result.message).toBe("Tarifa agregada exitosamente.");
        expect(tariffService.tariffs.length).toBe(1);
    });

    it('should not add a tariff with invalid dates or price', function() {
        let result = tariffService.addTariff(101, 'invalid-date', '2024-06-10', 100);
        expect(result.success).toBe(false);
        expect(result.message).toBe("Datos de tarifa no válidos.");
        expect(tariffService.tariffs.length).toBe(0);

        result = tariffService.addTariff(101, '2024-06-01', '2024-06-10', -50);
        expect(result.success).toBe(false);
        expect(result.message).toBe("Datos de tarifa no válidos.");
        expect(tariffService.tariffs.length).toBe(0);
    });

    it('should get the correct tariff for a given room and date', function() {
        tariffService.addTariff(101, '2024-06-01', '2024-06-10', 100);
        const price = tariffService.getTariff(101, '2024-06-05');
        expect(price).toBe(100);
    });

    it('should return null if no tariff is available for a given room and date', function() {
        tariffService.addTariff(101, '2024-06-01', '2024-06-10', 100);
        const price = tariffService.getTariff(101, '2024-06-11');
        expect(price).toBeNull();
    });
});

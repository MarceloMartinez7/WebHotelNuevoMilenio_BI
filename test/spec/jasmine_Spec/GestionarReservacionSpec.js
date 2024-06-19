// reservationServiceFunctionalSpec.js

const ReservationService = require('../../lib/jasmine_examples/GestionarReservacion');

describe('ReservationService', function() {
    let reservationService;

    beforeEach(function() {
        reservationService = new ReservationService();
    });

    it('should register a reservation successfully when room is available', function() {
        
        reservationService.reservations.push({ customerName: 'Jane Doe', roomNumber: 101, startDate: '2024-05-01', endDate: '2024-05-10' });

       
        const result = reservationService.registerReservation('John Doe', 101, '2024-06-01', '2024-06-05');
        
       
        expect(result.success).toBe(true);
    });

    it('should not register a reservation when room is not available', function() {
        
        reservationService.reservations.push({ customerName: 'Jane Doe', roomNumber: 101, startDate: '2024-06-01', endDate: '2024-06-10' });

       
        const result = reservationService.registerReservation('John Doe', 101, '2024-06-01', '2024-06-05');
        
        
        expect(result.success).toBe(false);
    });

   
});
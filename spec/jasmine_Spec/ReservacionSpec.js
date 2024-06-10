// reservationSystemSpec.js
const ReservationSystem = require('../../lib/jasmine_examples/ReservacionP');

describe('ReservationSystem', function() {
    let reservationSystem;

    beforeEach(function() {
        reservationSystem = new ReservationSystem();
    });

    it('should register a reservation successfully when date and time are available', function() {
        let result = reservationSystem.registerReservation('Alice', '2024-06-01', '18:00');
        expect(result).toBe(true);
        expect(reservationSystem.reservations.length).toBe(1);
        expect(reservationSystem.reservations[0].name).toBe('Alice');
        expect(reservationSystem.reservations[0].date).toBe('2024-06-01');
        expect(reservationSystem.reservations[0].time).toBe('18:00');
    });

    it('should not register a reservation when date and time are not available', function() {
        reservationSystem.registerReservation('Alice', '2024-06-01', '18:00');
        let result = reservationSystem.registerReservation('Bob', '2024-06-01', '18:00');
        expect(result).toBe(false);
        expect(reservationSystem.reservations.length).toBe(1); // Should still be only one reservation
    });

    it('should correctly check if a date and time are available', function() {
        expect(reservationSystem.isDateAvailable('2024-06-01', '18:00')).toBe(true);
        reservationSystem.registerReservation('Alice', '2024-06-01', '18:00');
        expect(reservationSystem.isDateAvailable('2024-06-01', '18:00')).toBe(false);
    });
});

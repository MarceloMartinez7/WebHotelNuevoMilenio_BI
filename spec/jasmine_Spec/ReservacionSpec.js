const ReservationHelper = require('../../spec/helpers/jasmine_Helpers/ReservacionHelpers');

describe('ReservationHelper', function() {
    let reservationHelper;

    beforeEach(function() {
        reservationHelper = new ReservationHelper();
    });

    it('should register a reservation successfully with valid data', function() {
        const reservation = reservationHelper.registerReservation('John Doe', new Date('2024-06-01'), new Date('2024-06-10'), 'Suite');
        expect(reservation.guestName).toBe('John Doe');
        expect(reservation.checkInDate).toEqual(new Date('2024-06-01'));
        expect(reservation.checkOutDate).toEqual(new Date('2024-06-10'));
        expect(reservation.roomType).toBe('Suite');
        expect(reservation.reservationId).toBeDefined();
    });

    it('should throw an error if check-out date is before check-in date', function() {
        expect(() => {
            reservationHelper.registerReservation('John Doe', new Date('2024-06-10'), new Date('2024-06-01'), 'Suite');
        }).toThrowError("Fecha de check-out debe ser después de la fecha de check-in.");
    });

    it('should throw an error if any data is missing', function() {
        expect(() => {
            reservationHelper.registerReservation('', new Date('2024-06-01'), new Date('2024-06-10'), 'Suite');
        }).toThrowError("Datos de la reservación no válidos.");
    });

    it('should return reservation details by ID', function() {
        const reservation = reservationHelper.registerReservation('John Doe', new Date('2024-06-01'), new Date('2024-06-10'), 'Suite');
        const retrievedReservation = reservationHelper.getReservationDetails(reservation.reservationId);
        expect(retrievedReservation).toEqual(reservation);
    });

    it('should return null for non-existent reservation ID', function() {
        const retrievedReservation = reservationHelper.getReservationDetails(999999);
        expect(retrievedReservation).toBeNull();
    });

    it('should check date availability correctly', function() {
        reservationHelper.registerReservation('John Doe', new Date('2024-06-01'), new Date('2024-06-10'), 'Suite');
        const isAvailable = reservationHelper.isDateAvailable(new Date('2024-06-01'), new Date('2024-06-10'));
        expect(isAvailable).toBe(false);
    });
});

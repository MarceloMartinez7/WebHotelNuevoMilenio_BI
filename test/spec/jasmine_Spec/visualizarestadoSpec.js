// visualizarestadoSpec.js
const roomStateHelper = require('./roomStateHelper');

describe('Room State Viewer', function() {

    it('should return the correct status for a given room number', function() {
        expect(roomStateHelper.getRoomStatus(101)).toBe('available');
        expect(roomStateHelper.getRoomStatus(102)).toBe('occupied');
        expect(roomStateHelper.getRoomStatus(999)).toBe(null); // Room does not exist
    });

    it('should update the status of a given room number', function() {
        let result = roomStateHelper.setRoomStatus(103, 'available');
        expect(result).toBe(true);
        expect(roomStateHelper.getRoomStatus(103)).toBe('available');

        result = roomStateHelper.setRoomStatus(999, 'occupied'); // Room does not exist
        expect(result).toBe(false);
    });

    it('should return the status of all rooms', function() {
        const allRoomsStatus = roomStateHelper.getAllRoomsStatus();
        expect(allRoomsStatus.length).toBe(5);
        expect(allRoomsStatus).toEqual([
            { roomNumber: 101, status: 'available' },
            { roomNumber: 102, status: 'occupied' },
            { roomNumber: 103, status: 'available' },
            { roomNumber: 104, status: 'maintenance' },
            { roomNumber: 105, status: 'available' }
        ]);
    });

});

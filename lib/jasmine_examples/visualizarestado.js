class RoomStatusService {
    constructor() {
        this.rooms = [
            { roomNumber: 101, status: 'available' },
            { roomNumber: 102, status: 'occupied' },
            // ... otras habitaciones
        ];
    }

    getRoomStatus(roomNumber) {
        const room = this.rooms.find(room => room.roomNumber === roomNumber);
        return room ? room.status : 'not found';
    }
}

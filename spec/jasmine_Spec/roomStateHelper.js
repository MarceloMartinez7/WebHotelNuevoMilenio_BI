// roomStateHelper.js

const rooms = [
    { roomNumber: 101, status: 'available' },
    { roomNumber: 102, status: 'occupied' },
    { roomNumber: 103, status: 'cleaning' },
    { roomNumber: 104, status: 'maintenance' },
    { roomNumber: 105, status: 'available' }
];

function getRoomStatus(roomNumber) {
    const room = rooms.find(room => room.roomNumber === roomNumber);
    return room ? room.status : null;
}

function setRoomStatus(roomNumber, status) {
    const room = rooms.find(room => room.roomNumber === roomNumber);
    if (room) {
        room.status = status;
        return true;
    }
    return false;
}

function getAllRoomsStatus() {
    return rooms;
}

module.exports = {
    getRoomStatus,
    setRoomStatus,
    getAllRoomsStatus
};

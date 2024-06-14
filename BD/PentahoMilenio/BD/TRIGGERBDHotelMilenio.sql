/* Actualizar el estado de la habitación después de una reserva */
DELIMITER //
CREATE TRIGGER ActualizarEstadoHabitacionDespuesDeReserva
AFTER INSERT ON ReservacionEstancia
FOR EACH ROW
BEGIN
    UPDATE Habitacion
    SET ID_Estado = 2  -- Debes ajustar el valor correspondiente al estado "Ocupada" en tu tabla Estado
    WHERE ID_Habitacion = NEW.ID_Habitacion;
END;
//
DELIMITER ;

/* Registro de auditoría para cambios en las reservas:
Este trigger registra automáticamente los cambios en las reservas, incluyendo quién hizo el cambio y cuándo. */
DELIMITER //
CREATE TRIGGER RegistroAuditoriaReservas
AFTER UPDATE ON ReservacionEstancia
FOR EACH ROW
BEGIN
    INSERT INTO AuditoriaReservas (ID_Reserva, Usuario, FechaCambio)
    VALUES (NEW.ID_ReservaEstancia, CURRENT_USER(), NOW());
END;
//
DELIMITER ;

/* Validación de fechas de reserva:
Este trigger asegura que la fecha de entrada de una reserva no sea anterior a la fecha actual. */
DELIMITER //
CREATE TRIGGER ValidarFechaEntradaReserva
BEFORE INSERT ON ReservacionEstancia
FOR EACH ROW
BEGIN
    IF NEW.F_entrada < NOW() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se puede reservar para una fecha pasada';
    END IF;
END;
//
DELIMITER ;






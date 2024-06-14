-- Inserciones aleatorias en la tabla ReservacionEstancia para 100 registros
INSERT INTO ReservacionEstancia (ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva)
SELECT 
    FLOOR(1 + RAND() * 5), -- ID_cliente aleatorio entre 1 y 5
    DATE_ADD(NOW(), INTERVAL FLOOR(RAND() * 30) DAY), -- Fecha de entrada aleatoria en los próximos 30 días
    DATE_ADD(NOW(), INTERVAL FLOOR(RAND() * 30) DAY), -- Fecha de salida aleatoria en los próximos 30 días
    FLOOR(1 + RAND() * 2), -- ID_Empleado aleatorio entre 1 y 2
    CASE FLOOR(1 + RAND() * 2) 
        WHEN 1 THEN 'Estancia'
        ELSE 'Reserva'
    END, -- TipoServicio aleatorio entre 'Básico' y 'Premium'
    CASE FLOOR(1 + RAND() * 3)
        WHEN 1 THEN 'Activo'
        ELSE 'Cancelado'
    END -- EstadoReserva aleatorio entre 'Pendiente', 'Confirmada' y 'Cancelada'
FROM 
    information_schema.tables 
LIMIT 
    100;

-- Inserciones aleatorias en la tabla DetalleReservacion para 100 registros
INSERT INTO DetalleReservacion (ID_ReservaEstancia, ID_Habitacion)
SELECT 
    ID_ReservaEstancia,
    FLOOR(1 + RAND() * 10) -- ID_Habitacion aleatorio entre 1 y 10
FROM 
    ReservacionEstancia
ORDER BY 
    RAND() -- Ordenar aleatoriamente las reservaciones
LIMIT 
    100;


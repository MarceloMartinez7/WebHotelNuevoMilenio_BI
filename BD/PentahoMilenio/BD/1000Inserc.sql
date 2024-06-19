-- Esto se ejecuta de primero
-- Inserciones en la tabla Persona para clientes
INSERT INTO Persona (Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono)
VALUES 
('123456789', 'Juan', 'Carlos', 'Perez', 'Gomez', '123456789'),
('987654321', 'Maria', 'Isabel', 'Garcia', 'Lopez', '987654321'),
('456123789', 'Pedro', 'Antonio', 'Martinez', 'Rodriguez', '456123789'),
('654321987', 'Ana', 'Luisa', 'Lopez', 'Fernandez', '654321987'),
('789123456', 'Carlos', 'Alberto', 'Gonzalez', 'Martinez', '789123456');

-- Inserciones en la tabla Persona para empleados
INSERT INTO Persona (Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono)
VALUES 
('321654987', 'Luis', 'Miguel', 'Ramirez', 'Gutierrez', '321654987'),
('654987321', 'Laura', 'Elena', 'Diaz', 'Gomez', '654987321');

-- Inserciones en la tabla Cliente
INSERT INTO Cliente (ID_Persona, Procedencia)
VALUES 
(1, 'Ciudad de México'),
(2, 'Guadalajara'),
(3, 'Monterrey'),
(4, 'Puebla'),
(5, 'Tijuana');

-- Inserciones en la tabla Empleado
INSERT INTO Empleado (ID_Persona, Usuario, Contraseña)
VALUES 
(6, 'usuario1', 'contraseña1'),
(7, 'usuario2', 'contraseña2');

-- Inserciones en la tabla Estado
INSERT INTO Estado (NombreEstado)
VALUES 
('Disponible'),
('Ocupado');

-- Inserciones en la tabla Tipo_de_habitacion
INSERT INTO Tipo_de_habitacion (Nombre, Descripcion)
VALUES 
('Individual', 'Habitación con una sola cama individual'),
('Doble', 'Habitación con dos camas individuales'),
('Suite', 'Habitación lujosa con sala de estar y comedor'),
('Triple', 'Habitación con tres camas individuales'),
('Familiar', 'Habitación espaciosa para familias'),
('Presidencial', 'La habitación más lujosa del hotel');

-- Inserciones en la tabla Habitacion
INSERT INTO Habitacion (ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio, Imagenes)
VALUES 
(1, 101, 1, 1, 1, 100, 'imagen1.jpg'),
(2, 102, 2, 2, 1, 150, 'imagen2.jpg'),
(3, 103, 3, 1, 1, 300, 'imagen3.jpg'),
(4, 104, 4, 3, 1, 200, 'imagen4.jpg'),
(5, 105, 5, 2, 1, 250, 'imagen5.jpg'),
(6, 106, 6, 1, 1, 500, 'imagen6.jpg'),
(7, 107, 1, 1, 1, 180, 'imagen7.jpg'),
(8, 108, 2, 1, 1, 280, 'imagen8.jpg'),
(9, 109, 3, 4, 1, 120, 'imagen9.jpg'),
(10, 110, 4, 2, 1, 200, 'imagen10.jpg');

-- Inserciones aleatorias en la tabla ReservacionEstancia para 11 registros
INSERT INTO ReservacionEstancia (ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva)
SELECT 
    FLOOR(1 + RAND() * 5), -- ID_cliente aleatorio entre 1 y 5
    CASE 
        WHEN Temporada = 'Verano' THEN DATE_ADD(NOW(), INTERVAL FLOOR(RAND() * 30) DAY)
        WHEN Temporada = 'Otoño' THEN DATE_ADD(NOW(), INTERVAL 30 + FLOOR(RAND() * 30) DAY)
        WHEN Temporada = 'Invierno' THEN DATE_ADD(NOW(), INTERVAL 60 + FLOOR(RAND() * 30) DAY)
        ELSE DATE_ADD(NOW(), INTERVAL 90 + FLOOR(RAND() * 30) DAY)
    END AS F_entrada, -- Fecha de entrada aleatoria dentro de la temporada correspondiente
    CASE 
        WHEN Temporada = 'Verano' THEN DATE_ADD(NOW(), INTERVAL 31 + FLOOR(RAND() * 7) DAY)
        WHEN Temporada = 'Otoño' THEN DATE_ADD(NOW(), INTERVAL 61 + FLOOR(RAND() * 7) DAY)
        WHEN Temporada = 'Invierno' THEN DATE_ADD(NOW(), INTERVAL 91 + FLOOR(RAND() * 7) DAY)
        ELSE DATE_ADD(NOW(), INTERVAL 121 + FLOOR(RAND() * 7) DAY)
    END AS F_salida, -- Fecha de salida aleatoria dentro de la temporada correspondiente
    FLOOR(1 + RAND() * 2), -- ID_Empleado aleatorio entre 1 y 2
    CASE FLOOR(1 + RAND() * 2) 
        WHEN 1 THEN 'Estancia'
        ELSE 'Reserva'
    END, -- TipoServicio aleatorio entre 'Estancia' y 'Reserva'
    CASE FLOOR(1 + RAND() * 3)
        WHEN 1 THEN 'Activo'
        ELSE 'Cancelado'
    END -- EstadoReserva aleatorio entre 'Activo' y 'Cancelado'
FROM 
    (SELECT 'Verano' AS Temporada UNION ALL SELECT 'Otoño' UNION ALL SELECT 'Invierno' UNION ALL SELECT 'Primavera') AS Temporadas
CROSS JOIN 
    (SELECT 1 AS dummy UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) AS x 
CROSS JOIN 
    (SELECT 1 AS dummy UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) AS y 
LIMIT 
    11;

-- Inserciones en la tabla DetalleReservacion para 11 registros, asegurando que las habitaciones no estén ocupadas
INSERT INTO DetalleReservacion (ID_ReservaEstancia, ID_Habitacion)
SELECT 
    re.ID_ReservaEstancia,
    h.ID_Habitacion
FROM 
    (SELECT ID_ReservaEstancia, F_entrada, F_salida FROM ReservacionEstancia ORDER BY RAND() LIMIT 11) AS re
JOIN 
    (SELECT ID_Habitacion FROM Habitacion WHERE ID_Estado = 1 ORDER BY RAND() LIMIT 11) AS h
ON
    NOT EXISTS (
        SELECT 1 
        FROM DetalleReservacion dr 
        JOIN ReservacionEstancia re2 ON dr.ID_ReservaEstancia = re2.ID_ReservaEstancia 
        WHERE dr.ID_Habitacion = h.ID_Habitacion 
        AND re2.F_entrada < re.F_salida 
        AND re2.F_salida > re.F_entrada
    )
LIMIT 11;

-- Actualizar el estado de las habitaciones a "Ocupado"
UPDATE Habitacion h
JOIN DetalleReservacion dr ON h.ID_Habitacion = dr.ID_Habitacion
JOIN ReservacionEstancia re ON dr.ID_ReservaEstancia = re.ID_ReservaEstancia
SET h.ID_Estado = 2;

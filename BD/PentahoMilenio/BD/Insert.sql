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


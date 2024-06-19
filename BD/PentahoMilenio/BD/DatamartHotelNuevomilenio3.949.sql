CREATE DATABASE HechosMilenio;

USE HechosMilenio;

CREATE TABLE Dim_Empleado (
    ID_Empleado INT PRIMARY KEY,
    Nombres VARCHAR(30),
    Apellidos VARCHAR(30)
);

CREATE TABLE Dim_Cliente (
    ID_Cliente INT PRIMARY KEY,
    Nombres VARCHAR(30),
    Apellidos VARCHAR(30),
    Cedula VARCHAR(19),
    Procedencia VARCHAR(80)
);


CREATE TABLE Dim_Habitaciones (
    ID_Habitacion INT PRIMARY KEY,
    N_de_habitacion INT,
    Tipo_Habitacion VARCHAR(50),
    Num_Cama INT,
    Estado VARCHAR(15),
    Precio INT
);


CREATE TABLE Dim_Tiempo (
    ID_Tiempo INT PRIMARY KEY,
    Fecha Date,
    Dia INT,
    Semana INT,
    Mes INT,
    Anio INT,
    Temporada VARCHAR(15),
    DiaSemana VARCHAR(15)
);




CREATE TABLE Dim_ReservaEstancia (
    ID_ReservaEstancia INT PRIMARY KEY,
    ID_Cliente INT,
    F_entrada Date,
    F_Salida Date,
    ID_Empleado INT,
    EstadoReserva VARCHAR(15),
    TipoServicio VARCHAR(10)
);


CREATE TABLE Hecho_DetalleReservaciones (
    ID_DetalleReservacion INT PRIMARY KEY,
    ID_ReservaEstancia INT,
    ID_Habitacion INT,
    ID_Cliente INT,
    ID_Empleado INT,
    ID_Tiempo INT,
    ID_Fsalida INT,
    Precio INT,
    F_entrada Date,
    F_salida Date,
    FOREIGN KEY (ID_ReservaEstancia) REFERENCES Dim_ReservaEstancia(ID_ReservaEstancia),
    FOREIGN KEY (ID_Habitacion) REFERENCES Dim_Habitaciones(ID_Habitacion),
    FOREIGN KEY (ID_Tiempo) REFERENCES Dim_Tiempo(ID_Tiempo),
    FOREIGN KEY (ID_Cliente) REFERENCES Dim_Cliente(ID_Cliente),
    FOREIGN KEY (ID_Empleado) REFERENCES Dim_Empleado(ID_Empleado)
);





UPDATE Dim_Tiempo
SET Temporada = 
    CASE 
        WHEN Mes IN (6, 7, 8) THEN 'Verano'
        WHEN Mes IN (9, 10, 11) THEN 'Otoño'
        WHEN Mes IN (12, 1, 2) THEN 'Invierno'
        WHEN Mes IN (3, 4, 5) THEN 'Primavera'
        ELSE 'Desconocido' -- Maneja cualquier caso no contemplado
    END;

SELECT Temporada, 
    SUM(hdr.ID_ReservaEstancia) AS NumeroTotalReservas,
    SUM(dh.N_de_Habitaciones) AS NumeroTotalHabitacionesDisponibles,
    (SUM(hdr.ID_ReservaEstancia) / SUM(dh.N_de_Habitaciones)) * 100 AS TasaOcupacionPorTemporada
FROM Dim_Tiempo dt
JOIN Hecho_DetalleReservaciones hdr ON dt.ID_Tiempo = hdr.ID_Tiempo
JOIN Dim_Habitaciones dh ON hdr.ID_Habitacion = dh.ID_Habitacion
GROUP BY Temporada;


------------------------------------------------------------------------------------------------


-- Actualizar el campo DiaSemana utilizando la función WEEKDAY
UPDATE Dim_Tiempo
SET DiaSemana =
    CASE 
        WHEN WEEKDAY(Fecha) = 1 THEN 'Domingo'
        WHEN WEEKDAY(Fecha) = 2 THEN 'Lunes'
        WHEN WEEKDAY(Fecha) = 3 THEN 'Martes'
        WHEN WEEKDAY(Fecha) = 4 THEN 'Miércoles'
        WHEN WEEKDAY(Fecha) = 5 THEN 'Jueves'
        WHEN WEEKDAY(Fecha) = 6 THEN 'Viernes'
        WHEN WEEKDAY(Fecha) = 7 THEN 'Sábado'
        ELSE 'Desconocido'
    END;

-- Calcular la tasa de ocupación por día de la semana
SELECT DiaSemana,
    SUM(hdr.ID_ReservaEstancia) AS NumeroTotalReservas,
    SUM(dh.N_de_Habitaciones) AS NumeroTotalHabitacionesDisponibles,
    (SUM(hdr.ID_ReservaEstancia) / SUM(dh.N_de_Habitaciones)) * 100 AS TasaOcupacionPorDiaSemana
FROM Dim_Tiempo dt
JOIN Hecho_DetalleReservaciones hdr ON dt.ID_Tiempo = hdr.ID_Tiempo
JOIN Dim_Habitaciones dh ON hdr.ID_Habitacion = dh.ID_Habitacion
GROUP BY DiaSemana;




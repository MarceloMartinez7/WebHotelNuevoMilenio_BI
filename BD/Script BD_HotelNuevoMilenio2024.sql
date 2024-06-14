CREATE DATABASE HechosMilenio;

USE HechosMilenio;

CREATE TABLE Dim_Empleado (
    ID_Empleado INT PRIMARY KEY,
    Nombre1 VARCHAR(15),
    Nombre2 VARCHAR(15),
    Apellido1 VARCHAR(15),
    Apellido2 VARCHAR(15),
    Telefono INT
);

CREATE TABLE Dim_Cliente (
    ID_Cliente INT PRIMARY KEY,
    Nombre1 VARCHAR(15),
    Nombre2 VARCHAR(15),
    Apellido1 VARCHAR(15),
    Apellido2 VARCHAR(15),
    Cedula VARCHAR(19),
    Procedencia VARCHAR(15)
);

CREATE TABLE Dim_Habitaciones (
    ID_Habitaciones INT PRIMARY KEY,
    N_de_Habitaciones INT,
    Tipo_Habitacion VARCHAR(50),
    Num_Cama INT,
    Estado VARCHAR(15),
    Precio INT
);

CREATE TABLE Dim_Tiempo (
    ID_Tiempo INT PRIMARY KEY,
    Fecha INT,
    Dia INT,
    Semana INT,
    Mes INT,
    Anio INT
);

CREATE TABLE Dim_ReservaEstancia (
    ID_ReservaEstancia INT PRIMARY KEY,
    ID_Cliente INT,
    ID_Tiempo INT,
    F_entrada TIME,
    F_Salida TIME,
    ID_Empleado INT,
    EstadoReserva VARCHAR(15)
);

CREATE TABLE Hecho_DetalleReservaciones (
    ID_DetalleReservacion INT PRIMARY KEY,
    ID_ReservaEstancia INT,
    ID_Habitaciones INT,
    ID_Cliente INT,
    ID_Empleado INT,
    ID_Tiempo INT,
    FOREIGN KEY (ID_ReservaEstancia) REFERENCES Dim_ReservaEstancia(ID_ReservaEstancia),
    FOREIGN KEY (ID_Habitaciones) REFERENCES Dim_Habitaciones(ID_Habitaciones),
    FOREIGN KEY (ID_Tiempo) REFERENCES Dim_Tiempo(ID_Tiempo),
    FOREIGN KEY (ID_Cliente) REFERENCES Dim_Cliente(ID_Cliente),
    FOREIGN KEY (ID_Empleado) REFERENCES Dim_Empleado(ID_Empleado)
);

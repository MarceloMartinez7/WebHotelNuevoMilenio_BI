const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Ruta para calcular la tasa de ocupación por temporada
  router.get('/TasaOcupacionPorTemporada', (req, res) => {
    const sql = `
      SELECT Temporada, 
        COUNT(hdr.ID_ReservaEstancia) AS NumeroTotalReservas,
        SUM(dh.N_de_habitacion) AS NumeroTotalHabitacionesDisponibles,
        (COUNT(hdr.ID_ReservaEstancia) / SUM(dh.N_de_habitacion)) * 100 AS TasaOcupacionPorTemporada
      FROM Dim_Tiempo dt
      JOIN Hecho_DetalleReservaciones hdr ON dt.ID_Tiempo = hdr.ID_Tiempo
      JOIN Dim_Habitaciones dh ON hdr.ID_Habitacion = dh.ID_Habitacion
      GROUP BY Temporada
      LIMIT 0, 1000;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al calcular la tasa de ocupación por temporada:', err);
        res.status(500).json({ error: 'Error al calcular la tasa de ocupación por temporada' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para calcular la tasa de ocupación por día de la semana
  router.get('/TasaOcupacionPorDiaSemana', (req, res) => {
    const sql = `
      SELECT DiaSemana,
        COUNT(hdr.ID_ReservaEstancia) AS NumeroTotalReservas,
        SUM(dh.N_de_habitacion) AS NumeroTotalHabitacionesDisponibles,
        (COUNT(hdr.ID_ReservaEstancia) / SUM(dh.N_de_habitacion)) * 100 AS TasaOcupacionPorDiaSemana
      FROM Dim_Tiempo dt
      JOIN Hecho_DetalleReservaciones hdr ON dt.ID_Tiempo = hdr.ID_Tiempo
      JOIN Dim_Habitaciones dh ON hdr.ID_Habitacion = dh.ID_Habitacion
      GROUP BY DiaSemana
      LIMIT 0, 1000;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al calcular la tasa de ocupación por día de la semana:', err);
        res.status(500).json({ error: 'Error al calcular la tasa de ocupación por día de la semana' });
      } else {
        res.status(200).json(result);
      }
    });
  });


// Ruta para calcular el promedio de estancia por cliente
  router.get('/PromedioDiasEstanciaPorCliente', (req, res) => {
    const sql = `
      SELECT ID_Cliente,
        AVG(DATEDIFF(F_Salida, F_entrada)) AS PromedioDiasEstancia
      FROM Dim_ReservaEstancia
      GROUP BY ID_Cliente;
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al calcular el promedio de días de estancia por cliente:', err);
        res.status(500).json({ error: 'Error al calcular el promedio de días de estancia por cliente' });
      } else {
        res.status(200).json(result);
      }
    });
  });

// Ruta para obtener el número de reservas por habitación
router.get('/NumeroReservasPorHabitacion', (req, res) => {
  const sql = `
    SELECT ID_Habitacion,
      COUNT(*) AS NumeroReservas
    FROM Hecho_DetalleReservaciones
    GROUP BY ID_Habitacion
    ORDER BY COUNT(*) DESC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al calcular el número de reservas por habitación:', err);
      res.status(500).json({ error: 'Error al calcular el número de reservas por habitación' });
    } else {
      res.status(200).json(result);
    }
  });
});


// Ruta para obtener los ingresos totales por temporada
router.get('/IngresosTotalesPorTemporada', (req, res) => {
  const sql = `
    SELECT Temporada, 
      SUM(hdr.Precio) AS IngresosTotales
    FROM Dim_Tiempo t
    JOIN Hecho_DetalleReservaciones hdr ON t.ID_Tiempo = hdr.ID_Tiempo
    JOIN Dim_Habitaciones dh ON hdr.ID_Habitacion = dh.ID_Habitacion
    GROUP BY Temporada
    LIMIT 0, 1000;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al calcular los ingresos totales por temporada:', err);
      res.status(500).json({ error: 'Error al calcular los ingresos totales por temporada' });
    } else {
      res.status(200).json(result);
    }
  });
});

 // Obtener todas las habitaciones disponibles
 router.get('/HabitacionesDisponibles', (req, res) => {
  const sql = `
    SELECT *
    FROM Dim_Habitaciones
    WHERE Estado = 'Disponible';
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener las habitaciones disponibles:', err);
      res.status(500).json({ error: 'Error al obtener las habitaciones disponibles' });
    } else {
      res.status(200).json(result);
    }
  });
});


// Obtener el total de ingresos por año
router.get('/IngresosTotalesPorAnio', (req, res) => {
  const sql = `
    SELECT Anio,
      SUM(Precio) AS IngresosTotales
    FROM Dim_Tiempo t
    JOIN Hecho_DetalleReservaciones hdr ON t.ID_Tiempo = hdr.ID_Tiempo
    GROUP BY Anio;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener los ingresos totales por año:', err);
      res.status(500).json({ error: 'Error al obtener los ingresos totales por año' });
    } else {
      res.status(200).json(result);
    }
  });
});


// Obtener el número de reservas por mes
router.get('/NumeroReservasPorMes', (req, res) => {
  const sql = `
    SELECT Mes,
      COUNT(*) AS NumeroReservas
    FROM Dim_Tiempo t
    JOIN Hecho_DetalleReservaciones hdr ON t.ID_Tiempo = hdr.ID_Tiempo
    GROUP BY Mes;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener el número de reservas por mes:', err);
      res.status(500).json({ error: 'Error al obtener el número de reservas por mes' });
    } else {
      res.status(200).json(result);
    }
  });
});



  // Obtener el número de reservas por tipo de habitación
  router.get('/NumeroReservasPorTipoHabitacion', (req, res) => {
    const sql = `
      SELECT Tipo_Habitacion,
        COUNT(*) AS NumeroReservas
      FROM Dim_Habitaciones
      JOIN Hecho_DetalleReservaciones hdr ON Dim_Habitaciones.ID_Habitacion = hdr.ID_Habitacion
      GROUP BY Tipo_Habitacion;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener el número de reservas por tipo de habitación:', err);
        res.status(500).json({ error: 'Error al obtener el número de reservas por tipo de habitación' });
      } else {
        res.status(200).json(result);
      }
    });
  });



  // Obtener la tasa de ocupación mensual
  router.get('/TasaOcupacionMensual', (req, res) => {
    const sql = `
      SELECT Mes,
        (COUNT(hdr.ID_ReservaEstancia) / (SELECT COUNT(*) FROM Dim_Tiempo WHERE Mes = t.Mes)) * 100 AS TasaOcupacionMensual
      FROM Dim_Tiempo t
      JOIN Hecho_DetalleReservaciones hdr ON t.ID_Tiempo = hdr.ID_Tiempo
      GROUP BY Mes;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener la tasa de ocupación mensual:', err);
        res.status(500).json({ error: 'Error al obtener la tasa de ocupación mensual' });
      } else {
        res.status(200).json(result);
      }
    });
  });




//URL: Para consultas
//http://localhost:5000/crudDb2/NombreDeLaConsulta

  return router;
};



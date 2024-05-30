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

  return router;
};

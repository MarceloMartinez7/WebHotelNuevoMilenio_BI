import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Chart from 'chart.js/auto';

function Estadisticas() {
  const [productos, setProductos] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [reservacionesPorCliente, setReservacionesPorCliente] = useState([]);
  const [tasaOcupacionPorTemporada, setTasaOcupacionPorTemporada] = useState([]);
  const [tasaOcupacionPorDiaSemana, setTasaOcupacionPorDiaSemana] = useState([]);
  const [ingresosPorTemporada, setIngresosPorTemporada] = useState([]);
  const [ingresosPorAnio, setIngresosPorAnio] = useState([]);
  const reservationsChartRef = useRef(null);
  const ocupacionChartRef = useRef(null);
  const ocupacionPorDiaSemanaChartRef = useRef(null);
  const ingresosCharTemptRef = useRef(null);
  const ingresosAnioChartRef = useRef(null);
  const [promedioDiasEstanciaPorCliente, setPromedioDiasEstanciaPorCliente] = useState([]);
  const promedioDiasEstanciaChartRef = useRef(null);
  const [numeroReservasPorHabitacion, setNumeroReservasPorHabitacion] = useState([]);
  const numeroReservasChartRef = useRef(null);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const habitacionesChartRef = useRef(null);
  const [reservasPorMes, setReservasPorMes] = useState([]);
  const reservasPorMesChartRef = useRef(null);
  const [reservasPorTipo, setReservasPorTipo] = useState([]);
  const reservasPorTipoChartRef = useRef(null);
  const [tasaOcupacionMensual, setTasaOcupacionMensual] = useState([]);
  const tasaOcupacionMensualChartRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionMensual')
      .then(response => response.json())
      .then(data => setTasaOcupacionMensual(data))
      .catch(error => console.error('Error al obtener la tasa de ocupación mensual:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorTipoHabitacion')
      .then(response => response.json())
      .then(data => setReservasPorTipo(data))
      .catch(error => console.error('Error al obtener el número de reservas por tipo de habitación:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorMes')
      .then(response => response.json())
      .then(data => setReservasPorMes(data))
      .catch(error => console.error('Error al obtener el número de reservas por mes:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/HabitacionesDisponibles')
      .then(response => response.json())
      .then(data => setHabitacionesDisponibles(data))
      .catch(error => console.error('Error al obtener las habitaciones disponibles:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorHabitacion')
      .then(response => response.json())
      .then(data => setNumeroReservasPorHabitacion(data))
      .catch(error => console.error('Error al obtener el número de reservas por habitación:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/PromedioDiasEstanciaPorCliente')
      .then(response => response.json())
      .then(data => setPromedioDiasEstanciaPorCliente(data))
      .catch(error => console.error('Error al obtener el promedio de días de estancia por cliente:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crud/ReservacionesPorCliente')
      .then((response) => response.json())
      .then((data) => setReservacionesPorCliente(data))
      .catch((error) => console.error('Error al obtener los datos de estadísticas:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crud/RegistroEstadistica')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los datos de estadísticas:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionPorTemporada')
      .then((response) => response.json())
      .then((data) => setTasaOcupacionPorTemporada(data))
      .catch((error) => console.error('Error al obtener los datos de estadísticas:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionPorDiaSemana')
      .then((response) => response.json())
      .then((data) => setTasaOcupacionPorDiaSemana(data))
      .catch((error) => console.error('Error al obtener los datos de estadísticas por día de la semana:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/IngresosTotalesPorTemporada')
      .then((response) => response.json())
      .then((data) => setIngresosPorTemporada(data))
      .catch((error) => console.error('Error al obtener los datos de ingresos por temporada:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/IngresosTotalesPorAnio')
      .then((response) => response.json())
      .then((data) => setIngresosPorAnio(data))
      .catch((error) => console.error('Error al obtener los datos de ingresos por año:', error));
  }, []);


  useEffect(() => {
    if (tasaOcupacionMensual.length > 0) {
      if (tasaOcupacionMensualChartRef.current !== null) {
        tasaOcupacionMensualChartRef.current.destroy();
      }
      createTasaOcupacionMensualChart();
    }
  }, [tasaOcupacionMensual]);

  const createTasaOcupacionMensualChart = () => {
    const ctx = document.getElementById('tasaOcupacionMensualChart');
    const labels = tasaOcupacionMensual.map(item => item.Mes);
    const data = tasaOcupacionMensual.map(item => item.TasaOcupacionMensual);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasa de Ocupación Mensual (%)',
          data: data,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tasa de Ocupación Mensual'
          }
        }
      }
    });

    tasaOcupacionMensualChartRef.current = chart;
  };



  useEffect(() => {
    if (reservasPorTipo.length > 0) {
      if (reservasPorTipoChartRef.current !== null) {
        reservasPorTipoChartRef.current.destroy();
      }
      createReservasPorTipoChart();
    }
  }, [reservasPorTipo]);

  const createReservasPorTipoChart = () => {
    const ctx = document.getElementById('reservasPorTipoChart');
    const labels = reservasPorTipo.map(item => item.Tipo_Habitacion);
    const data = reservasPorTipo.map(item => item.NumeroReservas);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Reservas por Tipo de Habitación',
          data: data,
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Número de Reservas por Tipo de Habitación'
          }
        }
      }
    });

    reservasPorTipoChartRef.current = chart;
  };





  useEffect(() => {
    if (reservasPorMes.length > 0) {
      if (reservasPorMesChartRef.current !== null) {
        reservasPorMesChartRef.current.destroy();
      }
      createReservasPorMesChart();
    }
  }, [reservasPorMes]);

  const createReservasPorMesChart = () => {
    const ctx = document.getElementById('reservasPorMesChart');
    const labels = reservasPorMes.map(item => item.Mes);
    const data = reservasPorMes.map(item => item.NumeroReservas);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Reservas por Mes',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Número de Reservas por Mes'
          }
        }
      }
    });

    reservasPorMesChartRef.current = chart;
  };




  useEffect(() => {
    if (habitacionesDisponibles.length > 0) {
      if (habitacionesChartRef.current !== null) {
        habitacionesChartRef.current.destroy();
      }
      createHabitacionesChart();
    }
  }, [habitacionesDisponibles]);

  const createHabitacionesChart = () => {
    const ctx = document.getElementById('habitacionesChart');
    const labels = habitacionesDisponibles.map(habitacion => habitacion.N_de_habitacion);
    const data = habitacionesDisponibles.map(habitacion => habitacion.Precio);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Precio de Habitaciones Disponibles',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Precio de Habitaciones Disponibles'
          }
        }
      }
    });

    habitacionesChartRef.current = chart;
  };





  useEffect(() => {
    if (numeroReservasPorHabitacion.length > 0) {
      if (numeroReservasChartRef.current !== null) {
        numeroReservasChartRef.current.destroy();
      }
      createNumeroReservasChart();
    }
  }, [numeroReservasPorHabitacion]);

  const createNumeroReservasChart = () => {
    const ctx = document.getElementById('numeroReservasChart');
    const labels = numeroReservasPorHabitacion.map(item => item.ID_Habitacion);
    const data = numeroReservasPorHabitacion.map(item => item.NumeroReservas);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Reservas por Habitación',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Número de Reservas por Habitación'
          }
        }
      }
    });

    numeroReservasChartRef.current = chart;
  };


  useEffect(() => {
    if (promedioDiasEstanciaPorCliente.length > 0) {
      if (promedioDiasEstanciaChartRef.current !== null) {
        promedioDiasEstanciaChartRef.current.destroy();
      }
      createPromedioDiasEstanciaChart();
    }
  }, [promedioDiasEstanciaPorCliente]);

  const createPromedioDiasEstanciaChart = () => {
    const ctx = document.getElementById('promedioDiasEstanciaChart');
    const labels = promedioDiasEstanciaPorCliente.map(item => item.Nombre_Completo);
    const data = promedioDiasEstanciaPorCliente.map(item => item.PromedioDiasEstancia);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Promedio de Días de Estancia',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Promedio de Días de Estancia por Cliente'
          }
        }
      }
    });

    promedioDiasEstanciaChartRef.current = chart;
  };


  useEffect(() => {
    if (productos.length > 0) {
      const ctx = document.getElementById('myChart');

      if (myChart !== null) {
        myChart.destroy();
      }

      const nombresProductos = productos.map((producto) => producto.DiaSemana);
      const cantidades = productos.map((producto) => producto.TotalReservaciones);

      const almacen = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Total de Reservaciones',
            data: cantidades,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setMyChart(almacen);
    }
  }, [productos]);

  useEffect(() => {
    if (reservacionesPorCliente.length > 0) {
      if (reservationsChartRef.current !== null) {
        reservationsChartRef.current.destroy();
      }
      createReservationsChart();
    }
  }, [reservacionesPorCliente]);

  const createReservationsChart = () => {
    const ctx = document.getElementById('myReservations');
    const labels = reservacionesPorCliente.map((cliente) => cliente.Nombre + ' ' + cliente.Apellido);
    const data = reservacionesPorCliente.map((cliente) => cliente.CantidadReservaciones);

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de reservaciones por cliente',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Cantidad de reservaciones por cliente'
          }
        }
      }
    });

    reservationsChartRef.current = chart;
  };

  useEffect(() => {
    if (tasaOcupacionPorTemporada.length > 0) {
      if (ocupacionChartRef.current !== null) {
        ocupacionChartRef.current.destroy();
      }
      createOcupacionChart();
    }
  }, [tasaOcupacionPorTemporada]);

  const createOcupacionChart = () => {
    const ctx = document.getElementById('ocupacionChart');
    const labels = tasaOcupacionPorTemporada.map((item) => item.Temporada);
    const data = tasaOcupacionPorTemporada.map((item) => item.TasaOcupacionPorTemporada);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasa de Ocupación por Temporada (%)',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tasa de Ocupación por Temporada'
          }
        }
      }
    });

    ocupacionChartRef.current = chart;
  };

  useEffect(() => {
    if (tasaOcupacionPorDiaSemana.length > 0) {
      if (ocupacionPorDiaSemanaChartRef.current !== null) {
        ocupacionPorDiaSemanaChartRef.current.destroy();
      }
      createOcupacionPorDiaSemanaChart();
    }
  }, [tasaOcupacionPorDiaSemana]);

  const createOcupacionPorDiaSemanaChart = () => {
    const ctx = document.getElementById('ocupacionPorDiaSemanaChart');
    const labels = tasaOcupacionPorDiaSemana.map((item) => item.DiaSemana);
    const data = tasaOcupacionPorDiaSemana.map((item) => item.TasaOcupacionPorDiaSemana);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasa de Ocupación por Día de la Semana (%)',
          data: data,
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tasa de Ocupación por Día de la Semana'
          }
        }
      }
    });

    ocupacionPorDiaSemanaChartRef.current = chart;
  };

  useEffect(() => {
    if (ingresosPorTemporada.length > 0) {
      const ctx = document.getElementById('ingresosChart');

      if (ingresosCharTemptRef.current !== null) {
        ingresosCharTemptRef.current.destroy();
      }

      const temporadas = ingresosPorTemporada.map((item) => item.Temporada);
      const ingresos = ingresosPorTemporada.map((item) => item.IngresosTotales);

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: temporadas,
          datasets: [{
            label: 'Ingresos Totales',
            data: ingresos,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      ingresosCharTemptRef.current = chart;
    }
  }, [ingresosPorTemporada]);

  useEffect(() => {
    if (ingresosPorAnio.length > 0) {
      const ctx = document.getElementById('ingresosAnioChart');

      if (ingresosAnioChartRef.current !== null) {
        ingresosAnioChartRef.current.destroy();
      }

      const anios = ingresosPorAnio.map((item) => item.Anio);
      const ingresos = ingresosPorAnio.map((item) => item.IngresosTotales);

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: anios,
          datasets: [{
            label: 'Ingresos Totales',
            data: ingresos,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      ingresosAnioChartRef.current = chart;
    }
  }, [ingresosPorAnio]);


  const generarReporteTasaOcupacionMensual = () => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionMensual')
      .then(response => response.json())
      .then(tasaOcupacionMensual => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Tasa de Ocupación Mensual", 20, 10);

        tasaOcupacionMensual.forEach(item => {
          doc.text(`Mes: ${item.Mes}`, 20, y);
          doc.text(`Tasa de Ocupación Mensual (%): ${item.TasaOcupacionMensual.toFixed(2)}`, 20, y + 10);

          y += 20;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_tasa_ocupacion_mensual.pdf");
      })
      .catch(error => console.error('Error al obtener los datos de tasa de ocupación mensual:', error));
  };

  const generarReporteTasaOcupacionMensualImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('tasaOcupacionMensualChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Tasa de Ocupación Mensual", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_tasa_ocupacion_mensual_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteReservasPorTipo = () => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorTipoHabitacion')
      .then(response => response.json())
      .then(reservasPorTipo => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Número de Reservas por Tipo de Habitación", 20, 10);

        reservasPorTipo.forEach(item => {
          doc.text(`Tipo de Habitación: ${item.Tipo_Habitacion}`, 20, y);
          doc.text(`Número de Reservas: ${item.NumeroReservas}`, 20, y + 10);

          y += 20;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_reservas_por_tipo_habitacion.pdf");
      })
      .catch(error => console.error('Error al obtener los datos de reservas por tipo de habitación:', error));
  };

  const generarReporteReservasPorTipoImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('reservasPorTipoChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Número de Reservas por Tipo de Habitación", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_reservas_por_tipo_habitacion_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };


  const generarReporteReservasPorMes = () => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorMes')
      .then(response => response.json())
      .then(reservasPorMes => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Número de Reservas por Mes", 20, 10);

        reservasPorMes.forEach(item => {
          doc.text(`Mes: ${item.Mes}`, 20, y);
          doc.text(`Número de Reservas: ${item.NumeroReservas}`, 20, y + 10);

          y += 20;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_reservas_por_mes.pdf");
      })
      .catch(error => console.error('Error al obtener los datos de reservas por mes:', error));
  };

  const generarReporteReservasPorMesImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('reservasPorMesChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Número de Reservas por Mes", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_reservas_por_mes_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };




  const generarReporteHabitaciones = () => {
    fetch('http://localhost:5000/crudDb2/HabitacionesDisponibles')
      .then(response => response.json())
      .then(habitacionesDisponibles => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Habitaciones Disponibles", 20, 10);

        habitacionesDisponibles.forEach(habitacion => {
          doc.text(`Número de Habitación: ${habitacion.N_Habitacion}`, 20, y);
          doc.text(`Precio: ${habitacion.Precio}`, 20, y + 10);
          doc.text(`Estado: ${habitacion.Estado}`, 20, y + 20);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_habitaciones_disponibles.pdf");
      })
      .catch(error => console.error('Error al obtener los datos de habitaciones disponibles:', error));
  };

  const generarReporteHabitacionesImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('habitacionesChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Precio de Habitaciones Disponibles", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_habitaciones_disponibles_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };


  const generarReporteNumeroReservas = () => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorHabitacion')
      .then(response => response.json())
      .then(numeroReservasPorHabitacion => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Número de Reservas por Habitación", 20, 10);

        numeroReservasPorHabitacion.forEach(habitacion => {
          doc.text(`Habitación ID: ${habitacion.ID_Habitacion}`, 20, y);
          doc.text(`Número de Reservas: ${habitacion.NumeroReservas}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_numero_reservas.pdf");
      })
      .catch(error => console.error('Error al obtener los datos del número de reservas:', error));
  };

  const generarReporteNumeroReservasImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('numeroReservasChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Número de Reservas por Habitación", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_numero_reservas_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };



  const generarReportePromedioDiasEstancia = () => {
    fetch('http://localhost:5000/crudDb2/PromedioDiasEstanciaPorCliente')
      .then(response => response.json())
      .then(promedioDiasEstanciaPorCliente => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Promedio de Días de Estancia por Cliente", 20, 10);

        promedioDiasEstanciaPorCliente.forEach(cliente => {
          doc.text(`Cliente: ${cliente.Nombre_Completo}`, 20, y);
          doc.text(`Promedio de Días de Estancia: ${cliente.PromedioDiasEstancia}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_promedio_dias_estancia.pdf");
      })
      .catch(error => console.error('Error al obtener los datos del promedio de días de estancia:', error));
  };

  const generarReportePromedioDiasEstanciaImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('promedioDiasEstanciaChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Promedio de Días de Estancia por Cliente", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_promedio_dias_estancia_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteIngresosAnio = () => {
    fetch('http://localhost:5000/crudDb2/IngresosTotalesPorAnio')
      .then((response) => response.json())
      .then((ingresosPorAnio) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Ingresos Totales por Año", 20, 10);

        ingresosPorAnio.forEach((anio) => {
          doc.text(`Año: ${anio.Anio}`, 20, y);
          doc.text(`Ingresos Totales: ${anio.IngresosTotales}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_ingresos_anio.pdf");
      })
      .catch((error) => console.error('Error al obtener los ingresos por año:', error));
  };

  const generarReporteIngresosAnioImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('ingresosAnioChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Ingresos Totales por Año", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_ingresos_anio_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };






  const generarReporteIngresosTemporada = () => {
    fetch('http://localhost:5000/crudDb2/IngresosTotalesPorTemporada')
      .then((response) => response.json())
      .then((ingresosPorTemporada) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Ingresos Totales por Temporada", 20, 10);

        ingresosPorTemporada.forEach((temporada) => {
          doc.text(`Temporada: ${temporada.Temporada}`, 20, y);
          doc.text(`Ingresos Totales: ${temporada.IngresosTotales}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_ingresos_temporada.pdf");
      })
      .catch((error) => console.error('Error al obtener los ingresos por temporada:', error));
  };


  const generarReporteIngresosTemporadaImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('ingresosChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Ingresos Totales por Temporada", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_ingresos_temporada_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };



  const generarReporteOcupacionTemporada = () => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionPorTemporada')
      .then((response) => response.json())
      .then((tasaOcupacionPorTemporada) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Tasa de Ocupación por Temporada", 20, 10);

        tasaOcupacionPorTemporada.forEach((temporada) => {
          doc.text(`Temporada: ${temporada.Temporada}`, 20, y);
          doc.text(`Tasa de Ocupación: ${temporada.TasaOcupacionPorTemporada}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_tasa_ocupacion_temporada.pdf");
      })
      .catch((error) => console.error('Error al obtener la tasa de ocupación por temporada:', error));
  };




  const generarReporteOcupacionDiaSemana = () => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionPorDiaSemana')
      .then((response) => response.json())
      .then((tasaOcupacionPorDiaSemana) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Tasa de Ocupación por Día de la Semana", 20, 10);

        tasaOcupacionPorDiaSemana.forEach((diaSemana) => {
          doc.text(`Día de la semana: ${diaSemana.DiaSemana}`, 20, y);
          doc.text(`Tasa de Ocupación: ${diaSemana.TasaOcupacionPorDiaSemana}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_tasa_ocupacion_dia_semana.pdf");
      })
      .catch((error) => console.error('Error al obtener la tasa de ocupación por día de la semana:', error));
  };



  const generarReporteOcupacionDiaSemanaImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('ocupacionPorDiaSemanaChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Tasa de Ocupación por Día de la Semana", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_ocupacion_dia_semana_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };


  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/RegistroEstadistica')
      .then((response) => response.json())
      .then((productos) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Estado de Almacén", 20, 10);

        productos.forEach((producto) => {
          doc.text(`Nombre: ${producto.DiaSemana}`, 20, y);
          doc.text(`Cantidad: ${producto.TotalReservaciones}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_almacen.pdf");
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  const generarReporteClientes = () => {
    fetch('http://localhost:5000/crud/ReservacionesPorCliente')
      .then((response) => response.json())
      .then((reservaciones) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Reservaciones por Cliente", 20, 10);

        reservaciones.forEach((reservacion) => {
          doc.text(`Nombre: ${reservacion.Nombre} ${reservacion.Apellido}`, 20, y);
          doc.text(`Cantidad de reservaciones: ${reservacion.CantidadReservaciones}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc
              .addPage();
            y = 15;
          }
        });

        doc.save("reporte_reservaciones_clientes.pdf");
      })
      .catch((error) => console.error('Error al obtener las reservaciones:', error));
  };

  const generarReporteAlmacenImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('myChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Estado de Almacén", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_almacen_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteReservacionesImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('myReservations'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Reservaciones por Cliente", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_reservaciones_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteOcupacionImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('ocupacionChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Tasa de Ocupación por Temporada", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_ocupacion_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };
  return (
    <div>
      <Header />
      <Container className="margen-contenedor">
        <Row className="g-3">
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Estado de Reserva</Card.Title>
                <canvas id="myChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button
                  onClick={generarReporteAlmacen}
                  className="btn btn-primary"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteAlmacenImg}
                  className="btn btn-success"
                >
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Reservaciones cliente</Card.Title>
                <canvas id="myReservations" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button
                  onClick={generarReporteClientes}
                  className="btn btn-primary"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteReservacionesImg}
                  className="btn btn-success"
                >
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Tasa de Ocupación por Temporada</Card.Title>
                <canvas id="ocupacionChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button
                  onClick={generarReporteOcupacionTemporada}
                  className="btn btn-primary"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteOcupacionImg}
                  className="btn btn-success"
                >
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Tasa de Ocupación por Día de la Semana</Card.Title>
                <canvas id="ocupacionPorDiaSemanaChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button
                  onClick={generarReporteOcupacionDiaSemana}
                  className="btn btn-primary"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteOcupacionDiaSemanaImg}
                  className="btn btn-success"
                >
                  Generar reporte imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Ingresos Totales por Temporada</Card.Title>
                <canvas id="ingresosChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button
                  onClick={generarReporteIngresosTemporada}
                  className="btn btn-primary"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteIngresosTemporadaImg}
                  className="btn btn-success"
                >
                  Generar reporte imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Ingresos Totales por Año</Card.Title>
                <canvas id="ingresosAnioChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button
                  onClick={generarReporteIngresosAnio}
                  className="btn btn-primary"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteIngresosAnioImg}
                  className="btn btn-success"
                >
                  Generar reporte imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Promedio de Días de Estancia por Cliente</Card.Title>
                <canvas id="promedioDiasEstanciaChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button onClick={generarReportePromedioDiasEstancia} className="btn btn-primary">
                  Generar reporte
                </Button>
                <Button onClick={generarReportePromedioDiasEstanciaImg} className="btn btn-primary">
                  Generar reporte con gráfico
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Número de Reservas por Habitación</Card.Title>
                <canvas id="numeroReservasChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button onClick={generarReporteNumeroReservas} className="btn btn-primary">
                  Generar reporte
                </Button>
                <Button onClick={generarReporteNumeroReservasImg} className="btn btn-success">
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>


          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Habitaciones Disponibles</Card.Title>
                <canvas id="habitacionesChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button onClick={generarReporteHabitaciones} className="btn btn-primary">
                  Generar reporte
                </Button>
                <Button onClick={generarReporteHabitacionesImg} className="btn btn-success">
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>



          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Número de Reservas por Mes</Card.Title>
                <canvas id="reservasPorMesChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button onClick={generarReporteReservasPorMes} className="btn btn-primary">
                  Generar reporte
                </Button>
                <Button onClick={generarReporteReservasPorMesImg} className="btn btn-success">
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>


          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Número de Reservas por Tipo de Habitación</Card.Title>
                <canvas id="reservasPorTipoChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button onClick={generarReporteReservasPorTipo} className="btn btn-primary">
                  Generar reporte
                </Button>
                <Button onClick={generarReporteReservasPorTipoImg} className="btn btn-success">
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Tasa de Ocupación Mensual</Card.Title>
                <canvas id="tasaOcupacionMensualChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Button onClick={generarReporteTasaOcupacionMensual} className="btn btn-primary">
                  Generar reporte
                </Button>
                <Button onClick={generarReporteTasaOcupacionMensualImg} className="btn btn-success">
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );

}
export default Estadisticas;


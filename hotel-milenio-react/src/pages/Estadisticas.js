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
  const [ocupacionPorDia, setOcupacionPorDia] = useState([]);
  const reservationsChartRef = useRef(null);
  const ocupacionChartRef = useRef(null);
  const [tasaOcupacionPorTemporada, setTasaOcupacionPorTemporada] = useState([]);
  const [reservasPorTipoHabitacion, setReservasPorTipoHabitacion] = useState([]);
  const [ingresosTotalesPorTemporada, setIngresosTotalesPorTemporada] = useState([]);


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
    fetch('http://localhost:5000/crudDb2/TasaOcupacionPorDiaSemana')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de ocupación recibidos:', data);
        setOcupacionPorDia(data);
      })
      .catch((error) => console.error('Error al obtener los datos de ocupación por día:', error));
  }, []);

  useEffect(() => {
    if (ocupacionPorDia.length > 0) {
      if (ocupacionChartRef.current !== null) {
        ocupacionChartRef.current.destroy();
      }
      createOcupacionChart();
    }
  }, [ocupacionPorDia]);

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/TasaOcupacionPorTemporada')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de tasa de ocupación por temporada recibidos:', data);
        setTasaOcupacionPorTemporada(data);
      })
      .catch((error) => console.error('Error al obtener los datos de tasa de ocupación por temporada:', error));
  }, []);

  useEffect(() => {
    if (tasaOcupacionPorTemporada.length > 0) {
      createTasaOcupacionPorTemporadaChart();
    }
  }, [tasaOcupacionPorTemporada]);
  

  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/NumeroReservasPorTipoHabitacion')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de reservas por tipo de habitación recibidos:', data);
        setReservasPorTipoHabitacion(data);
      })
      .catch((error) => console.error('Error al obtener los datos de reservas por tipo de habitación:', error));
  }, []);
  
  useEffect(() => {
    if (reservasPorTipoHabitacion.length > 0) {
      createReservasPorTipoHabitacionChart();
    }
  }, [reservasPorTipoHabitacion]);
  


  useEffect(() => {
    fetch('http://localhost:5000/crudDb2/IngresosTotalesPorTemporada')
      .then(response => response.json())
      .then(data => {
        setIngresosTotalesPorTemporada(data);
      })
      .catch(error => console.error('Error al obtener los datos de ingresos totales por temporada:', error));
  }, []);
  


  const createOcupacionChart = () => {
    const ctx = document.getElementById('ocupacionChart');
    const labels = ocupacionPorDia.map((dia) => dia.DiaSemana);
    const data = ocupacionPorDia.map((dia) => dia.TasaOcupacionPorDiaSemana);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasa de Ocupación por Día de la Semana (%)',
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
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}%`
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

    ocupacionChartRef.current = chart;
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
            doc.addPage();
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

  const createTasaOcupacionPorTemporadaChart = () => {
    const ctx = document.getElementById('tasaOcupacionPorTemporadaChart');
    const labels = tasaOcupacionPorTemporada.map((item) => item.Temporada);
    const data = tasaOcupacionPorTemporada.map((item) => item.TasaOcupacionPorTemporada);
  
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasa de Ocupación por Temporada (%)',
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
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}%`
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
  };
  
  const createReservasPorTipoHabitacionChart = () => {
    const ctx = document.getElementById('reservasPorTipoHabitacionChart');
    const labels = reservasPorTipoHabitacion.map((item) => item.Tipo_Habitacion);
    const data = reservasPorTipoHabitacion.map((item) => item.NumeroReservas);
  
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Reservas',
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
            text: 'Número de Reservas por Tipo de Habitación'
          }
        }
      }
    });
  };
  
  useEffect(() => {
    if (ingresosTotalesPorTemporada.length > 0) {
      const ctx = document.getElementById('ingresosTotalesPorTemporadaChart');
      const labels = ingresosTotalesPorTemporada.map((item) => item.Temporada);
      const data = ingresosTotalesPorTemporada.map((item) => item.IngresosTotales);
  
      const ingresosChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ingresos Totales',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
              text: 'Ingresos Totales por Temporada'
            }
          }
        }
      });
  
      return () => {
        ingresosChart.destroy();
      };
    }
  }, [ingresosTotalesPorTemporada]);
  


  return (
    <div>
      <Header />
      <Container className="margen-contenedor">
        <Row className="g-3">
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Estado de Reserva</Card.Title>
                <canvas id="myChart" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
                <Button onClick={generarReporteAlmacenImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Reservaciones cliente</Card.Title>
                <canvas id="myReservations" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteClientes}>
                  Generar reporte
                </Button>
                <Button onClick={generarReporteReservacionesImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Tasa de Ocupación por Día de la Semana</Card.Title>
                <canvas id="ocupacionChart" height="300"></canvas>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4">
          <Card>
            <Card.Body>
              <Card.Title>Tasa de Ocupación por Temporada</Card.Title>
              <canvas id="tasaOcupacionPorTemporadaChart" height="300"></canvas>
            </Card.Body>
          </Card>
        </Col>

              <Col sm="6" md="6" lg="4">
        <Card>
          <Card.Body>
            <Card.Title>Número de Reservas por Tipo de Habitación</Card.Title>
            <canvas id="reservasPorTipoHabitacionChart" height="300"></canvas>
          </Card.Body>
        </Card>
      </Col>


            <Col sm="6" md="6" lg="4">
        <Card>
          <Card.Body>
            <Card.Title>Ingresos Totales por Temporada</Card.Title>
            <canvas id="ingresosTotalesPorTemporadaChart" height="300"></canvas>
          </Card.Body>
        </Card>
      </Col>


          <Col sm="12" md="12" lg="12">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>
                <iframe
                  title="HotelMilenioKpiPrueba1"
                  width="100%"
                  height="600"
                  src="https://app.powerbi.com/view?r=eyJrIjoiNTRmY2IyYWMtMTQ1OC00NDQ3LTg0YTMtYzJjODM2NjUzMDQxIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
                  frameborder="0"
                  allowFullScreen="true"
                  style={{ display: 'block', margin: '0 auto' }}
                ></iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Estadisticas;

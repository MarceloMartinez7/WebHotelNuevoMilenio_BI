import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Chart from "chart.js/auto";
import emailjs from "emailjs-com";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa6";

function Estadisticas() {
  const [productos, setProductos] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [reservacionesPorCliente, setReservacionesPorCliente] = useState([]);
  const [tasaOcupacionPorTemporada, setTasaOcupacionPorTemporada] = useState(
    []
  );
  const [tasaOcupacionPorDiaSemana, setTasaOcupacionPorDiaSemana] = useState(
    []
  );
  const [ingresosPorTemporada, setIngresosPorTemporada] = useState([]);
  const [ingresosPorAnio, setIngresosPorAnio] = useState([]);
  const reservationsChartRef = useRef(null);
  const ocupacionChartRef = useRef(null);
  const ocupacionPorDiaSemanaChartRef = useRef(null);
  const ingresosCharTemptRef = useRef(null);
  const ingresosAnioChartRef = useRef(null);
  const [promedioDiasEstanciaPorCliente, setPromedioDiasEstanciaPorCliente] =
    useState([]);
  const promedioDiasEstanciaChartRef = useRef(null);
  const [numeroReservasPorHabitacion, setNumeroReservasPorHabitacion] =
    useState([]);
  const numeroReservasChartRef = useRef(null);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const habitacionesChartRef = useRef(null);
  const [reservasPorMes, setReservasPorMes] = useState([]);
  const reservasPorMesChartRef = useRef(null);
  const [reservasPorTipo, setReservasPorTipo] = useState([]);
  const reservasPorTipoChartRef = useRef(null);
  const [tasaOcupacionMensual, setTasaOcupacionMensual] = useState([]);
  const tasaOcupacionMensualChartRef = useRef(null);

  const exportarAExcel = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(productos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rerservas");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "Rerservas.xlsx");
  };



  const exportarAExcel2 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(reservacionesPorCliente);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RerservasCliente");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "RerservasCliente.xlsx");
  };



  const exportarAExcel3 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(tasaOcupacionPorTemporada);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "OcupacionTemporada");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "OcupacionTemporada.xlsx");
  };


  const exportarAExcel4 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(ingresosPorTemporada);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "IngresosTemporada");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "IngresosTemporada.xlsx");
  };

  const exportarAExcel5 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(ingresosPorAnio);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "IngresosAnio");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "IngresosAnio.xlsx");
  };


  const exportarAExcel6 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(tasaOcupacionPorDiaSemana);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "tasaOcupacionPorDiaSemana");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "tasaOcupacionPorDiaSemana.xlsx");
  };

  const exportarAExcel7 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(promedioDiasEstanciaPorCliente);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "promedioDiasEstanciaPorCliente");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "promedioDiasEstanciaPorCliente.xlsx");
  };


  const exportarAExcel8 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(numeroReservasPorHabitacion);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "numeroReservasPorHabitacion");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "numeroReservasPorHabitacion.xlsx");
  };




  
  const exportarAExcel9 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(habitacionesDisponibles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "habitacionesDisponibles");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "habitacionesDisponibles.xlsx");
  };

  const exportarAExcel10 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(habitacionesDisponibles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "habitacionesDisponibles");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "habitacionesDisponibles.xlsx");
  };

  const exportarAExcel11 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(reservasPorMes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "reservasPorMes");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "reservasPorMes.xlsx");
  };


  const exportarAExcel12 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(reservasPorTipo);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "reservasPorTipo");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "reservasPorTipo.xlsx");
  };

  const formatearProductos = (productos) => {
    return productos
      .map((producto) => {
        return `Nombre: ${producto.DiaSemana} \nTotal de reservaciones: ${producto.TotalReservaciones}`;
      })
      .join("\n\n");
  };

  const enviarCorreo = () => {
    // Formateo de datos
    const ProductosFormateados = formatearProductos(productos);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Estado de reserva",
      title: "Estas son las reservas por dia",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: ProductosFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearReservaCliente = (reserClientes) => {
    return reserClientes
      .map((reserCliente) => {
        return `Nombre: ${reserCliente.Nombre}${reserCliente.Apellido} \nCantidad de reservaciones: ${reserCliente.CantidadReservaciones}`;
      })
      .join("\n\n");
  };

  const enviarCorreo2 = () => {
    // Formateo de datos
    const reserclienFormateados = formatearReservaCliente(
      reservacionesPorCliente
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: reserclienFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_p64c0bl", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearTasaocupaciontemporada = (tasoctemporadas) => {
    return tasoctemporadas
      .map((tasoctemporada) => {
        return `Nombre temporada: ${tasoctemporada.Temporada}\nTasa de ocupacion: ${tasoctemporada.TasaOcupacionPorTemporada}`;
      })
      .join("\n\n");
  };

  const enviarCorreo3 = () => {
    // Formateo de datos
    const TasaTempoFormateados = formatearTasaocupaciontemporada(
      tasaOcupacionPorTemporada
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Tasa de ocupacion",
      title: "Estas son las tasas de Ocupaciones por Temporada",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: TasaTempoFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearTasaocupacionDiasemana = (tasocDiSemanas) => {
    return tasocDiSemanas
      .map((tasocDiSemana) => {
        return `Dia: ${tasocDiSemana.DiaSemana}\nTasa de ocupacion: ${tasocDiSemana.TasaOcupacionPorDiaSemana}`;
      })
      .join("\n\n");
  };

  const enviarCorreo4 = () => {
    // Formateo de datos
    const TasaDiaFormateados = formatearTasaocupacionDiasemana(
      tasaOcupacionPorDiaSemana
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Tasa de ocupacion",
      title: "Estas son las tasas de Ocupaciones por Dia",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: TasaDiaFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearIngresoTemporada = (ingresotemporadas) => {
    return ingresotemporadas
      .map((ingresotemporada) => {
        return `Temporada: ${ingresotemporada.Temporada}\nIngreso Total: ${ingresotemporada.IngresosTotales}`;
      })
      .join("\n\n");
  };

  const enviarCorreo5 = () => {
    // Formateo de datos
    const IngresosFormateados = formatearIngresoTemporada(ingresosPorTemporada);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Ingresos Temporada",
      title: "Estas son los registro de ingresos por temporada",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: IngresosFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearIngresoanio = (ingresoanios) => {
    return ingresoanios
      .map((ingresoanio) => {
        return `Año: ${ingresoanio.Anio}\nIngreso Total: ${ingresoanio.IngresosTotales}`;
      })
      .join("\n\n");
  };

  const enviarCorreo6 = () => {
    // Formateo de datos
    const IngresosanioFormateados = formatearIngresoanio(ingresosPorAnio);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Ingresos Año",
      title: "Estas son los registro de ingresos por año",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: IngresosanioFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearPromEstaCliente = (PromEstaclientes) => {
    return PromEstaclientes.map((PromEstacliente) => {
      return `Nombre: ${PromEstacliente.Nombre_Completo}\nPromedio de estancia: ${PromEstacliente.PromedioDiasEstancia}`;
    }).join("\n\n");
  };

  const enviarCorreo7 = () => {
    // Formateo de datos
    const PromeEstanciaClienteFormateado = formatearPromEstaCliente(
      promedioDiasEstanciaPorCliente
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Promedio Estancia de clientes",
      title: "Estas son los promedio de estancia de los cliente",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: PromeEstanciaClienteFormateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearReservaHabitacion = (ReservaHabitacions) => {
    return ReservaHabitacions.map((ReservaHabitacion) => {
      return `Numero de habitacion: ${ReservaHabitacion.ID_Habitacion}\nPromedio de estancia: ${ReservaHabitacion.NumeroReservas}`;
    }).join("\n\n");
  };

  const enviarCorreo8 = () => {
    // Formateo de datos
    const ReservaHabitFormateado = formatearReservaHabitacion(
      numeroReservasPorHabitacion
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Reserva por habitacion",
      title: "Estas son las reserva por habitacion",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: ReservaHabitFormateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearPrecHabitacionesDispo = (HabitaDisponibles) => {
    return HabitaDisponibles.map((HabitaDisponible) => {
      return `Numero de habitacion: ${HabitaDisponible.N_de_habitacion}\nPrecio: ${HabitaDisponible.Precio}`;
    }).join("\n\n");
  };

  const enviarCorreo9 = () => {
    // Formateo de datos
    const HabitaDispoFormateado = formatearPrecHabitacionesDispo(
      habitacionesDisponibles
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Precio Habitacion disponible",
      title: "Estas son los precio de las habitaciones disponible",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: HabitaDispoFormateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearNumReservames = (Reservames) => {
    return Reservames.map((Reservame) => {
      return `Mes: ${Reservame.Mes}\nNumero de reserva: ${Reservame.NumeroReservas}`;
    }).join("\n\n");
  };

  const enviarCorreo10 = () => {
    // Formateo de datos
    const Numreservameformateado = formatearNumReservames(reservasPorMes);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Reserva por mes",
      title: "Estos son los numero de reserva por mes",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: Numreservameformateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearNumReservTipohabitacion = (ReservTipohabis) => {
    return ReservTipohabis.map((ReservTipohabi) => {
      return `Tipo de habitacion: ${ReservTipohabi.Tipo_Habitacion}\nNumero de reserva: ${ReservTipohabi.NumeroReservas}`;
    }).join("\n\n");
  };

  const enviarCorreo11 = () => {
    // Formateo de datos
    const NumreservameTipohabiformateado =
      formatearNumReservTipohabitacion(reservasPorTipo);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Reserva por Tipo",
      title: "Estos son los numero de reserva por Tipo de habitacion",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: NumreservameTipohabiformateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const formatearTasaOcupMensual = (TasaMensuals) => {
    return TasaMensuals.map((TasaMensual) => {
      return `Mes: ${TasaMensual.Mes}\nTasa de ocupacion Mensual: ${TasaMensual.TasaOcupacionMensual}`;
    }).join("\n\n");
  };

  const enviarCorreo12 = () => {
    // Formateo de datos
    const TasaMensualOcupFormateado =
      formatearTasaOcupMensual(tasaOcupacionMensual);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      subject: "Tasa de ocupacion mensual",
      title: "Estos son las tasa de ocupacion mensual",
      to_name: "Yamil",
      user_email: "yg97507@gmail.com",
      message: TasaMensualOcupFormateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_4eaqwgf", "template_7u1g0ws", data, "voWjHjK7IiuJZpcKp")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/TasaOcupacionMensual")
      .then((response) => response.json())
      .then((data) => setTasaOcupacionMensual(data))
      .catch((error) =>
        console.error("Error al obtener la tasa de ocupación mensual:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/NumeroReservasPorTipoHabitacion")
      .then((response) => response.json())
      .then((data) => setReservasPorTipo(data))
      .catch((error) =>
        console.error(
          "Error al obtener el número de reservas por tipo de habitación:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/NumeroReservasPorMes")
      .then((response) => response.json())
      .then((data) => setReservasPorMes(data))
      .catch((error) =>
        console.error("Error al obtener el número de reservas por mes:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/HabitacionesDisponibles")
      .then((response) => response.json())
      .then((data) => setHabitacionesDisponibles(data))
      .catch((error) =>
        console.error("Error al obtener las habitaciones disponibles:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/NumeroReservasPorHabitacion")
      .then((response) => response.json())
      .then((data) => setNumeroReservasPorHabitacion(data))
      .catch((error) =>
        console.error(
          "Error al obtener el número de reservas por habitación:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/PromedioDiasEstanciaPorCliente")
      .then((response) => response.json())
      .then((data) => setPromedioDiasEstanciaPorCliente(data))
      .catch((error) =>
        console.error(
          "Error al obtener el promedio de días de estancia por cliente:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud/ReservacionesPorCliente")
      .then((response) => response.json())
      .then((data) => setReservacionesPorCliente(data))
      .catch((error) =>
        console.error("Error al obtener los datos de estadísticas:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud/RegistroEstadistica")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) =>
        console.error("Error al obtener los datos de estadísticas:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/TasaOcupacionPorTemporada")
      .then((response) => response.json())
      .then((data) => setTasaOcupacionPorTemporada(data))
      .catch((error) =>
        console.error("Error al obtener los datos de estadísticas:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/TasaOcupacionPorDiaSemana")
      .then((response) => response.json())
      .then((data) => setTasaOcupacionPorDiaSemana(data))
      .catch((error) =>
        console.error(
          "Error al obtener los datos de estadísticas por día de la semana:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/IngresosTotalesPorTemporada")
      .then((response) => response.json())
      .then((data) => setIngresosPorTemporada(data))
      .catch((error) =>
        console.error(
          "Error al obtener los datos de ingresos por temporada:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crudDb2/IngresosTotalesPorAnio")
      .then((response) => response.json())
      .then((data) => setIngresosPorAnio(data))
      .catch((error) =>
        console.error("Error al obtener los datos de ingresos por año:", error)
      );
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
    const ctx = document.getElementById("tasaOcupacionMensualChart");
    const labels = tasaOcupacionMensual.map((item) => item.Mes);
    const data = tasaOcupacionMensual.map((item) => item.TasaOcupacionMensual);

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tasa de Ocupación Mensual (%)",
            data: data,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Tasa de Ocupación Mensual",
          },
        },
      },
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
    const ctx = document.getElementById("reservasPorTipoChart");
    const labels = reservasPorTipo.map((item) => item.Tipo_Habitacion);
    const data = reservasPorTipo.map((item) => item.NumeroReservas);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Número de Reservas por Tipo de Habitación",
            data: data,
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Número de Reservas por Tipo de Habitación",
          },
        },
      },
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
    const ctx = document.getElementById("reservasPorMesChart");
    const labels = reservasPorMes.map((item) => item.Mes);
    const data = reservasPorMes.map((item) => item.NumeroReservas);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Número de Reservas por Mes",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Número de Reservas por Mes",
          },
        },
      },
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
    const ctx = document.getElementById("habitacionesChart");
    const labels = habitacionesDisponibles.map(
      (habitacion) => habitacion.N_de_habitacion
    );
    const data = habitacionesDisponibles.map((habitacion) => habitacion.Precio);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Precio de Habitaciones Disponibles",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Precio de Habitaciones Disponibles",
          },
        },
      },
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
    const ctx = document.getElementById("numeroReservasChart");
    const labels = numeroReservasPorHabitacion.map(
      (item) => item.ID_Habitacion
    );
    const data = numeroReservasPorHabitacion.map((item) => item.NumeroReservas);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Número de Reservas por Habitación",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Número de Reservas por Habitación",
          },
        },
      },
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
    const ctx = document.getElementById("promedioDiasEstanciaChart");
    const labels = promedioDiasEstanciaPorCliente.map(
      (item) => item.Nombre_Completo
    );
    const data = promedioDiasEstanciaPorCliente.map(
      (item) => item.PromedioDiasEstancia
    );

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Promedio de Días de Estancia",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Promedio de Días de Estancia por Cliente",
          },
        },
      },
    });

    promedioDiasEstanciaChartRef.current = chart;
  };

  useEffect(() => {
    if (productos.length > 0) {
      const ctx = document.getElementById("myChart");

      if (myChart !== null) {
        myChart.destroy();
      }

      const nombresProductos = productos.map((producto) => producto.DiaSemana);
      const cantidades = productos.map(
        (producto) => producto.TotalReservaciones
      );

      const almacen = new Chart(ctx, {
        type: "bar",
        data: {
          labels: nombresProductos,
          datasets: [
            {
              label: "Total de Reservaciones",
              data: cantidades,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
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
    const ctx = document.getElementById("myReservations");
    const labels = reservacionesPorCliente.map(
      (cliente) => cliente.Nombre + " " + cliente.Apellido
    );
    const data = reservacionesPorCliente.map(
      (cliente) => cliente.CantidadReservaciones
    );

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cantidad de reservaciones por cliente",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Cantidad de reservaciones por cliente",
          },
        },
      },
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
    const ctx = document.getElementById("ocupacionChart");
    const labels = tasaOcupacionPorTemporada.map((item) => item.Temporada);
    const data = tasaOcupacionPorTemporada.map(
      (item) => item.TasaOcupacionPorTemporada
    );

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tasa de Ocupación por Temporada (%)",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Tasa de Ocupación por Temporada",
          },
        },
      },
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
    const ctx = document.getElementById("ocupacionPorDiaSemanaChart");
    const labels = tasaOcupacionPorDiaSemana.map((item) => item.DiaSemana);
    const data = tasaOcupacionPorDiaSemana.map(
      (item) => item.TasaOcupacionPorDiaSemana
    );

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tasa de Ocupación por Día de la Semana (%)",
            data: data,
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Tasa de Ocupación por Día de la Semana",
          },
        },
      },
    });

    ocupacionPorDiaSemanaChartRef.current = chart;
  };

  useEffect(() => {
    if (ingresosPorTemporada.length > 0) {
      const ctx = document.getElementById("ingresosChart");

      if (ingresosCharTemptRef.current !== null) {
        ingresosCharTemptRef.current.destroy();
      }

      const temporadas = ingresosPorTemporada.map((item) => item.Temporada);
      const ingresos = ingresosPorTemporada.map((item) => item.IngresosTotales);

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: temporadas,
          datasets: [
            {
              label: "Ingresos Totales",
              data: ingresos,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      ingresosCharTemptRef.current = chart;
    }
  }, [ingresosPorTemporada]);

  useEffect(() => {
    if (ingresosPorAnio.length > 0) {
      const ctx = document.getElementById("ingresosAnioChart");

      if (ingresosAnioChartRef.current !== null) {
        ingresosAnioChartRef.current.destroy();
      }

      const anios = ingresosPorAnio.map((item) => item.Anio);
      const ingresos = ingresosPorAnio.map((item) => item.IngresosTotales);

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: anios,
          datasets: [
            {
              label: "Ingresos Totales",
              data: ingresos,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      ingresosAnioChartRef.current = chart;
    }
  }, [ingresosPorAnio]);

  const generarReporteTasaOcupacionMensual = () => {
    fetch("http://localhost:5000/crudDb2/TasaOcupacionMensual")
      .then((response) => response.json())
      .then((tasaOcupacionMensual) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Tasa de Ocupación Mensual", 20, 10);

        tasaOcupacionMensual.forEach((item) => {
          doc.text(`Mes: ${item.Mes}`, 20, y);
          doc.text(
            `Tasa de Ocupación Mensual (%): ${item.TasaOcupacionMensual.toFixed(
              2
            )}`,
            20,
            y + 10
          );

          y += 20;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_tasa_ocupacion_mensual.pdf");
      })
      .catch((error) =>
        console.error(
          "Error al obtener los datos de tasa de ocupación mensual:",
          error
        )
      );
  };

  const generarReporteTasaOcupacionMensualImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("tasaOcupacionMensualChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Tasa de Ocupación Mensual", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_tasa_ocupacion_mensual_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteReservasPorTipo = () => {
    fetch("http://localhost:5000/crudDb2/NumeroReservasPorTipoHabitacion")
      .then((response) => response.json())
      .then((reservasPorTipo) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text(
          "Reporte de Número de Reservas por Tipo de Habitación",
          20,
          10
        );

        reservasPorTipo.forEach((item) => {
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
      .catch((error) =>
        console.error(
          "Error al obtener los datos de reservas por tipo de habitación:",
          error
        )
      );
  };

  const generarReporteReservasPorTipoImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("reservasPorTipoChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Número de Reservas por Tipo de Habitación", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_reservas_por_tipo_habitacion_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteReservasPorMes = () => {
    fetch("http://localhost:5000/crudDb2/NumeroReservasPorMes")
      .then((response) => response.json())
      .then((reservasPorMes) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Número de Reservas por Mes", 20, 10);

        reservasPorMes.forEach((item) => {
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
      .catch((error) =>
        console.error("Error al obtener los datos de reservas por mes:", error)
      );
  };

  const generarReporteReservasPorMesImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("reservasPorMesChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Número de Reservas por Mes", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_reservas_por_mes_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteHabitaciones = () => {
    fetch("http://localhost:5000/crudDb2/HabitacionesDisponibles")
      .then((response) => response.json())
      .then((habitacionesDisponibles) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Habitaciones Disponibles", 20, 10);

        habitacionesDisponibles.forEach((habitacion) => {
          doc.text(
            `Número de Habitación: ${habitacion.N_de_habitacion}`,
            20,
            y
          );
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
      .catch((error) =>
        console.error(
          "Error al obtener los datos de habitaciones disponibles:",
          error
        )
      );
  };

  const generarReporteHabitacionesImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("habitacionesChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Precio de Habitaciones Disponibles", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_habitaciones_disponibles_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteNumeroReservas = () => {
    fetch("http://localhost:5000/crudDb2/NumeroReservasPorHabitacion")
      .then((response) => response.json())
      .then((numeroReservasPorHabitacion) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Número de Reservas por Habitación", 20, 10);

        numeroReservasPorHabitacion.forEach((habitacion) => {
          doc.text(`Habitación ID: ${habitacion.ID_Habitacion}`, 20, y);
          doc.text(
            `Número de Reservas: ${habitacion.NumeroReservas}`,
            20,
            y + 10
          );

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_numero_reservas.pdf");
      })
      .catch((error) =>
        console.error(
          "Error al obtener los datos del número de reservas:",
          error
        )
      );
  };

  const generarReporteNumeroReservasImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("numeroReservasChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Número de Reservas por Habitación", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_numero_reservas_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReportePromedioDiasEstancia = () => {
    fetch("http://localhost:5000/crudDb2/PromedioDiasEstanciaPorCliente")
      .then((response) => response.json())
      .then((promedioDiasEstanciaPorCliente) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Promedio de Días de Estancia por Cliente", 20, 10);

        promedioDiasEstanciaPorCliente.forEach((cliente) => {
          doc.text(`Cliente: ${cliente.Nombre_Completo}`, 20, y);
          doc.text(
            `Promedio de Días de Estancia: ${cliente.PromedioDiasEstancia}`,
            20,
            y + 10
          );

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_promedio_dias_estancia.pdf");
      })
      .catch((error) =>
        console.error(
          "Error al obtener los datos del promedio de días de estancia:",
          error
        )
      );
  };

  const generarReportePromedioDiasEstanciaImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("promedioDiasEstanciaChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Promedio de Días de Estancia por Cliente", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_promedio_dias_estancia_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteIngresosAnio = () => {
    fetch("http://localhost:5000/crudDb2/IngresosTotalesPorAnio")
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
      .catch((error) =>
        console.error("Error al obtener los ingresos por año:", error)
      );
  };

  const generarReporteIngresosAnioImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("ingresosAnioChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Ingresos Totales por Año", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_ingresos_anio_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteIngresosTemporada = () => {
    fetch("http://localhost:5000/crudDb2/IngresosTotalesPorTemporada")
      .then((response) => response.json())
      .then((ingresosPorTemporada) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Ingresos Totales por Temporada", 20, 10);

        ingresosPorTemporada.forEach((temporada) => {
          doc.text(`Temporada: ${temporada.Temporada}`, 20, y);
          doc.text(
            `Ingresos Totales: ${temporada.IngresosTotales}`,
            20,
            y + 10
          );

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_ingresos_temporada.pdf");
      })
      .catch((error) =>
        console.error("Error al obtener los ingresos por temporada:", error)
      );
  };

  const generarReporteIngresosTemporadaImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("ingresosChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Ingresos Totales por Temporada", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_ingresos_temporada_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteOcupacionTemporada = () => {
    fetch("http://localhost:5000/crudDb2/TasaOcupacionPorTemporada")
      .then((response) => response.json())
      .then((tasaOcupacionPorTemporada) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Tasa de Ocupación por Temporada", 20, 10);

        tasaOcupacionPorTemporada.forEach((temporada) => {
          doc.text(`Temporada: ${temporada.Temporada}`, 20, y);
          doc.text(
            `Tasa de Ocupación: ${temporada.TasaOcupacionPorTemporada}`,
            20,
            y + 10
          );

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_tasa_ocupacion_temporada.pdf");
      })
      .catch((error) =>
        console.error(
          "Error al obtener la tasa de ocupación por temporada:",
          error
        )
      );
  };

  const generarReporteOcupacionDiaSemana = () => {
    fetch("http://localhost:5000/crudDb2/TasaOcupacionPorDiaSemana")
      .then((response) => response.json())
      .then((tasaOcupacionPorDiaSemana) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Tasa de Ocupación por Día de la Semana", 20, 10);

        tasaOcupacionPorDiaSemana.forEach((diaSemana) => {
          doc.text(`Día de la semana: ${diaSemana.DiaSemana}`, 20, y);
          doc.text(
            `Tasa de Ocupación: ${diaSemana.TasaOcupacionPorDiaSemana}`,
            20,
            y + 10
          );

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_tasa_ocupacion_dia_semana.pdf");
      })
      .catch((error) =>
        console.error(
          "Error al obtener la tasa de ocupación por día de la semana:",
          error
        )
      );
  };

  const generarReporteOcupacionDiaSemanaImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("ocupacionPorDiaSemanaChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Tasa de Ocupación por Día de la Semana", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_ocupacion_dia_semana_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteAlmacen = () => {
    fetch("http://localhost:5000/crud/RegistroEstadistica")
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
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  };

  const generarReporteClientes = () => {
    fetch("http://localhost:5000/crud/ReservacionesPorCliente")
      .then((response) => response.json())
      .then((reservaciones) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Reservaciones por Cliente", 20, 10);

        reservaciones.forEach((reservacion) => {
          doc.text(
            `Nombre: ${reservacion.Nombre} ${reservacion.Apellido}`,
            20,
            y
          );
          doc.text(
            `Cantidad de reservaciones: ${reservacion.CantidadReservaciones}`,
            20,
            y + 10
          );

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_reservaciones_clientes.pdf");
      })
      .catch((error) =>
        console.error("Error al obtener las reservaciones:", error)
      );
  };

  const generarReporteAlmacenImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById("myChart"));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Estado de Almacén", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_almacen_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteReservacionesImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("myReservations")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Reservaciones por Cliente", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_reservaciones_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
    }
  };

  const generarReporteOcupacionImg = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementById("ocupacionChart")
      );
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.text("Reporte de Tasa de Ocupación por Temporada", 20, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
      pdf.save("reporte_ocupacion_con_grafico.pdf");
    } catch (error) {
      console.error("Error al generar el reporte con imagen:", error);
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteAlmacen}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteAlmacenImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>

                <Button
                  variant="success"
                  onClick={exportarAExcel}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteClientes}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteReservacionesImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo2}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>

                <Button
                  variant="success"
                  onClick={exportarAExcel2}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteOcupacionTemporada}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteOcupacionImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo3}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel3}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteOcupacionDiaSemana}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteOcupacionDiaSemanaImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo4}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>



                

                <Button
                  variant="success"
                  onClick={exportarAExcel4}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteIngresosTemporada}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteIngresosTemporadaImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo5}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>

                

                <Button
                  variant="success"
                  onClick={exportarAExcel5}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteIngresosAnio}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteIngresosAnioImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo6}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel6}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>
                  Promedio de Días de Estancia por Cliente
                </Card.Title>
                <canvas id="promedioDiasEstanciaChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReportePromedioDiasEstancia}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReportePromedioDiasEstanciaImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con gráfico
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo7}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel7}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteNumeroReservas}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteNumeroReservasImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo8}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel8}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteHabitaciones}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteHabitacionesImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo9}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel9}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteReservasPorMes}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteReservasPorMesImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo10}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel10}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>
                  Número de Reservas por Tipo de Habitación
                </Card.Title>
                <canvas id="reservasPorTipoChart" height="250"></canvas>
              </Card.Body>
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteReservasPorTipo}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteReservasPorTipoImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo11}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel11}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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
              <Card.Body className="d-flex flex-column align-items-stretch">
                <Button
                  onClick={generarReporteTasaOcupacionMensual}
                  className="btn btn-primary mb-2"
                >
                  Generar reporte
                </Button>
                <Button
                  onClick={generarReporteTasaOcupacionMensualImg}
                  className="btn btn-success mb-2"
                >
                  Generar reporte con imagen
                </Button>
                <Button
                  variant="secondary"
                  onClick={enviarCorreo12}
                  className="mt-2"
                >
                  Enviar por Correo
                </Button>
                

                <Button
                  variant="success"
                  onClick={exportarAExcel12}
                  className="m-1"
                >
                  <FaFileExcel style={{ color: "white" }} />
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

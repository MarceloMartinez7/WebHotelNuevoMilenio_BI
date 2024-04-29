import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/Reservacion.css';

function ReservacionEstancia() {

    const [formData, setFormData] = useState({
        ID_cliente: "",
        F_entrada: "",
        F_salida: "",
        ID_Empleado: "",
        TipoServicio: "",
    });

    const [habitaciones, setHabitaciones] = useState([]);
    const [Habitacion, setHabitacion] = useState('');

    const [empleados, setEmpleados] = useState([]);
    const [Empleado, setEmpleado] = useState('');

    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState([]);
    const [duracionEstancia, setDuracionEstancia] = useState(0);

    const [searchQueryCliente, setSearchQueryCliente] = useState('');
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [showClientesModal, setShowClientesModal] = useState(false);

    const loadClientes = () => {
        fetch('http://localhost:5000/crud/ListarClientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error('Error al obtener los clientes y personas:', error));
    };

    useEffect(() => {
        loadClientes();
    }, []);

    const openBrandModal = () => {
        setShowClientesModal(true);
    };

    const closeBrandModal = () => {
        setSearchQueryCliente('');
        setShowClientesModal(false);
    };

    const handleSearchCliente = (e) => {
        setSearchQueryCliente(e.target.value);
    };

    const filterClientes = clientes.filter((cliente) => {
        const nombre1 = cliente.Nombre1 ? cliente.Nombre1.toLowerCase() : '';
        const apellido1 = cliente.Apellido ? cliente.Apellido.toLowerCase() : '';
        const cedula = cliente.Cedula ? cliente.Cedula.toLowerCase() : '';
        const search = searchQueryCliente.toLowerCase();
        return nombre1.includes(search) || apellido1.includes(search) || cedula.includes(search);
    });


    const handleClienteSelect = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
            ...formData,
            ID_cliente: cliente.ID_cliente,
        });
        closeBrandModal();
    };

    useEffect(() => {
        fetch('http://localhost:5000/crud/ComboHabitacion')
            .then(response => response.json())
            .then(data => {
                setHabitaciones(data);
            })
            .catch(error => {
                console.error('Error al obtener las habitaciones', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/crud/ComboEmpleado')
            .then(response => response.json())
            .then(data => {
                setEmpleados(data);
            })
            .catch(error => {
                console.error('Error al obtener los empleados', error);
            });
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleHabitacionSelect = (e) => {
        setHabitacion(e.target.value);
    };

    const addHabitacionToTable = () => {
        if (Habitacion) {
            const habitacionSeleccionada = habitaciones.find(habitacion => habitacion.NombreHabitacion === Habitacion);

            if (habitacionSeleccionada) {
                setHabitacionesSeleccionadas([...habitacionesSeleccionadas, habitacionSeleccionada]);
                setHabitaciones(habitaciones.filter(habitacion => habitacion.ID_Habitacion !== habitacionSeleccionada.ID_Habitacion));
                setHabitacion('');
            }
        }
    };

    const handleFechaSalidaChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (formData.F_entrada && value) {
            const fechaEntrada = new Date(formData.F_entrada);
            const fechaSalida = new Date(value);
            const tiempoDiferencia = fechaSalida - fechaEntrada;
            const diasEstancia = Math.ceil(tiempoDiferencia / (1000 * 60 * 60 * 24)) + 1;
            setDuracionEstancia(diasEstancia);
        }
    };

    const eliminarHabitacion = (idHabitacion) => {
        const habitacionAEliminar = habitacionesSeleccionadas.find(habitacion => habitacion.ID_Habitacion === idHabitacion);
        setHabitaciones([...habitaciones, habitacionAEliminar]);
        setHabitacionesSeleccionadas(habitacionesSeleccionadas.filter(habitacion => habitacion.ID_Habitacion !== idHabitacion));
    };

    const calcularCostoHabitaciones = () => {
        let costoTotalHabitaciones = 0;
        for (const habitacion of habitacionesSeleccionadas) {
            costoTotalHabitaciones += habitacion.Precio;
        }
        return costoTotalHabitaciones;
    };

    const calcularCostoEstancia = () => {
        const costoHabitaciones = calcularCostoHabitaciones();
        return costoHabitaciones * duracionEstancia;
    };

    const formattedEntrada = formData.F_entrada ? formatDate(formData.F_entrada) : '';
    const formattedSalida = formData.F_salida ? formatDate(formData.F_salida) : '';

    const reservaData = {
        ID_cliente: selectedCliente ? selectedCliente.ID_cliente : '',
        F_entrada: formattedEntrada,
        F_salida: formattedSalida,
        ID_Empleado: Empleado,
        TipoServicio: formData.TipoServicio,
        habitaciones: habitacionesSeleccionadas.map((habitacion) => habitacion.ID_Habitacion),
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si las habitaciones seleccionadas están ocupadas
        const habitacionOcupada = habitacionesSeleccionadas.some(habitacion => habitacion.EstadoHabitacion === "Ocupado");

        if (habitacionOcupada) {
            alert('Una o más habitaciones seleccionadas están ocupadas y no se pueden registrar.');
            return; // Evitar continuar con el registro
        }

        console.log('handleSubmit iniciado');
        console.log('formData:', formData);
        console.log('reservaData:', reservaData);

        try {
            const response = await fetch('http://localhost:5000/crud/reservacionCreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservaData),
            });

            if (response.ok) {
                alert('Registro exitoso');
            } else {
                alert('No se pudo guardar la reserva. Por favor, inténtelo nuevamente.');
            }
        } catch (error) {
            console.error('Error al guardar la reserva', error);
            alert('Hubo un error al enviar la solicitud.');
        };
    };
    return (
        <div>
            <Header />
            <Container>
                <Card className="mt-30">
                    <Card.Body>
                        <Card.Title>Registro de Reservación de Estancia</Card.Title>
                        <Form className="mt-30" onSubmit={handleSubmit}>
                            <Row className="g-3">





                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="cliente" label="Cliente">
                                        <Form.Control
                                            type="text"
                                            placeholder="Cliente seleccionado"
                                            value={selectedCliente ? `${selectedCliente.Nombre1} ${selectedCliente.Apellido1}` : ''}
                                            readOnly
                                        />
                                        <div className="button-container">
                                            <Button className="show-button w-100" variant="primary" onClick={openBrandModal}>
                                                Seleccionar cliente
                                            </Button>
                                        </div>
                                    </FloatingLabel>
                                </Col>









                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="fechaEntrada" label="Fecha de Entrada">
                                        <Form.Control
                                            type="date"
                                            name="F_entrada"
                                            value={formData.F_entrada}
                                            onChange={handleFormChange}
                                        />
                                    </FloatingLabel>
                                </Col>


                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="fechaSalida" label="Fecha de Salida">
                                        <Form.Control
                                            type="date"
                                            name="F_salida"
                                            value={formData.F_salida}
                                            onChange={handleFechaSalidaChange}
                                        />
                                    </FloatingLabel>
                                </Col>


                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="idEmpleado" label="Empleado">
                                        <Form.Select
                                            aria-label="idEmpleado"
                                            value={Empleado}
                                            onChange={(e) => setEmpleado(e.target.value)}
                                        >
                                            <option>Seleccione el empleado</option>
                                            {empleados.map((empleado) => (
                                                <option key={empleado.ID_Empleado} value={empleado.ID_Empleado}>
                                                    {empleado.NombreEmpleado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>


                                <Col sm="6" md="6" lg="6">
                                    <label>Tipo de Servicio:</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Reserva"
                                            name="TipoServicio"
                                            value="Reserva"
                                            checked={formData.TipoServicio === "Reserva"}
                                            onChange={handleFormChange}
                                            style={{ display: 'inline-block', marginRight: '10px' }}
                                        />
                                        <label htmlFor="Reserva">Reserva</label>
                                    </div>


                                    <div>
                                        <input
                                            type="radio"
                                            id="Estancia"
                                            name="TipoServicio"
                                            value="Estancia"
                                            checked={formData.TipoServicio === "Estancia"}
                                            onChange={handleFormChange}
                                            style={{ display: 'inline-block', marginRight: '10px' }}
                                        />
                                        <label htmlFor="Estancia">Estancia</label>
                                    </div>


                                </Col>
                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="idHabitacion" label="Habitacion">
                                        <Form.Select
                                            aria-label="idHabitacion"
                                            value={Habitacion}
                                            onChange={handleHabitacionSelect}
                                        >
                                            <option>Seleccione la habitacion</option>
                                            {habitaciones.map((habitacion) => (
                                                <option key={habitacion.ID_Habitacion} value={habitacion.NombreHabitacion}>
                                                    {habitacion.NombreHabitacion}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                    <Button variant="primary" onClick={addHabitacionToTable}>Agregar Habitación</Button>
                                </Col>
                            </Row>
                            <Row className="g-3">
                                <Col sm="12" md="12" lg="12">
                                    <FloatingLabel controlId="duracionEstancia" label="Duración de la Estancia (días)">
                                        <Form.Control
                                            type="text"
                                            value={duracionEstancia}
                                            readOnly
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="g-3">
                                <Col sm="12" md="12" lg="12">
                                    <FloatingLabel controlId="costoTotal" label="Costo Total a Pagar C$ ">
                                        <Form.Control
                                            type="text"
                                            value={calcularCostoEstancia()}
                                            readOnly
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <div className="center-button">
                                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>


            <Modal show={showClientesModal} onHide={closeBrandModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicSearch">
                            <Form.Control
                                type="text"
                                placeholder="Buscar"
                                value={searchQueryCliente}
                                onChange={handleSearchCliente}
                            />
                        </Form.Group>
                    </Form>
                    <div className="cliente-list">
                        {filterClientes.map((cliente) => (
                            <div className="cliente-item" key={cliente.ID_cliente} onClick={() => handleClienteSelect(cliente)}>
                                <span>{cliente.Nombre1} {cliente.Apellido} {cliente.Apellido2} - {cliente.Cedula}</span>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>





            <Container>
                <h2 className='NameHabitacionesTabla'>Habitaciones Seleccionadas:</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID_Habitación</th>
                            <th>Numero de Habitación</th>
                            <th>Habitación</th>
                            <th>Numero de cama</th>
                            <th>Estado</th>
                            <th>Precio</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitacionesSeleccionadas.map((habitacion) => (
                            <tr key={habitacion.ID_Habitacion}>
                                <td>{habitacion.ID_Habitacion}</td>
                                <td>{habitacion.N_de_habitacion}</td>
                                <td>{habitacion.NombreHabitacion}</td>
                                <td>{habitacion.Num_Cama}</td>
                                <td>{habitacion.EstadoHabitacion}</td>
                                <td> C$ {habitacion.Precio}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => eliminarHabitacion(habitacion.ID_Habitacion)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </div>
    );
}

export default ReservacionEstancia;

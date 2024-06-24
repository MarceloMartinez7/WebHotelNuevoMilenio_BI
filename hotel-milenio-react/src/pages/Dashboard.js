import { Container, Row, Col, Card} from 'react-bootstrap';
import Header from '../components/Header';


function Dashboard() {
  

  return (
    <div>
      <Header />
      <Container className="margen-contenedor">
        <Row className="g-3">
          
  
          <Col sm="12" md="12" lg="12">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>
                <iframe
                  title="HotelMilenioKpiPrueba1"
                  width="100%"
                  height="600"
                  src="https://app.powerbi.com/reportEmbed?reportId=787ad203-c018-46f3-adbf-176bca47757e&autoAuth=true&ctid=e47646fe-da27-4518-8436-5f8b158ba127"
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

export default Dashboard;

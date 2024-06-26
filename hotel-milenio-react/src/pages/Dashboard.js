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
                <Card.Title>Estado del Hotel</Card.Title>
                <iframe
                  title="HotelMilenioKpiPrueba1"
                  width="100%"
                  height="600"
                  src="https://app.powerbi.com/reportEmbed?reportId=c91c57b9-7e5d-4c66-8609-439b26176908&autoAuth=true&ctid=e47646fe-da27-4518-8436-5f8b158ba127"
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

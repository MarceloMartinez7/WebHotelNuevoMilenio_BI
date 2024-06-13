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

export default Dashboard;

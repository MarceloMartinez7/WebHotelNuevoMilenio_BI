import React from 'react';
import Header from '../components/Header';
import './About.css';
import YouTube from 'react-youtube';

function About() {
  return (
    <div className="About">
      <Header />
      <div className="Informacion">
        <h1>Bienvenido a Nuestro Sistema de Gestión de Hoteles</h1>
        <p>
        En un mundo cada vez más interconectado, la labor del ingeniero en sistemas se erige como fundamental para el progreso tecnológico y la resolución de desafíos complejos. Imagina a José Yamil García Romero, Marcelo Martinez Rocha y Daniela Baltodano, tres apasionados ingenieros en sistemas con visiones innovadoras y fervor por la excelencia tecnológica.
        </p>
        <p>
        Desde sus primeros días de estudios en la Universidad Autonoma de Nicaragua, José, Marcelo y Daniela demostraron talento excepcional para el diseño de software. Su curiosidad insaciable los llevó a explorar las últimas tendencias en inteligencia artificial, desarrollo web y ciberseguridad.
        </p>
        <p>
        José, con su enfoque meticuloso, se destacó en la optimización de algoritmos, contribuyendo a la eficiencia de sistemas de gestión de bases de datos. Por otro lado, Marcelo, con su creatividad sin límites, se destacó en la creación de interfaces intuitivas que mejoraron la experiencia del usuario a quien va dirigido este sistema web. Daniela, conocida por su orden y responsabilidad, aportó nuevas ideas y perspectivas frescas al equipo, asegurando la eficacia y la puntualidad en la ejecución de los proyectos.
        </p>
        <div className="media">
          <div className="profile">
          <img src={`${process.env.PUBLIC_URL}/images/Yuru.jpg`} alt="José Yamil García Romero" className="profile-pic" />
            <p>José Yamil García Romero</p>
          </div>
          <div className="profile">
            <img src={`${process.env.PUBLIC_URL}/images/Gekko.jpg`} alt="Marcelo Enrique Martinez Rocha" className="profile-pic" />
            <p>Marcelo Enrique Martinez Rocha</p>
          </div>
          <div className="profile">
            <img src={`${process.env.PUBLIC_URL}/images/HD-wallpaper-purple-hair-eyes-reyna-valorant.jpg`} alt="Daniela Alejandra Baltodano Lumbi" className="profile-pic" />
            <p>Daniela Alejandra Baltodano Lumbi</p>
          </div>
        </div>
        <h2>Preguntas Frecuentes</h2>
        <div className="faq">
          <div className="faq-item">
            <h3>¿Cómo puedo hacer una reserva?</h3>
            <p>Para hacer una reserva, siga estos pasos...</p>
          </div>
          <div className="faq-item">
            <h3>¿Cómo gestiono las habitaciones?</h3>
            <p>La gestión de habitaciones se realiza desde...</p>
          </div>
        </div>
        <h2>Tutoriales y Recursos</h2>
        <div className="tutorials">
          <div className="video">
            <YouTube videoId="N1wDuuY_8GA" />
            <p>Cómo realizar una reserva.</p>
          </div>
          {/* Más videos y recursos */}
        </div>
        <h2>Contacto y Soporte</h2>
        <p>Si necesita ayuda, contáctenos a través de:</p>
        <ul>
          <li>Emails:</li>
          <ul>
            <li>yamilg620@gmail.com</li>
            <li>mr5405750@gmail.com</li>
            <li>alejandrabaltodano67@gmail.com</li>
          </ul>
          <li>Teléfonos:</li>
          <ul>
            <li>+505 8440 4123</li>
            <li>+505 8429 7116</li>
            <li>+505 5879 3132</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default About;


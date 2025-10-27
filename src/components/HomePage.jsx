// components/HomePage.jsx
import { BookOpen, Clock, Users, Award, ChevronRight, Check,Target, User, Lightbulb, Mail, Phone, Send  } from 'lucide-react';
import '../base.css';
import './homepage.css';

function HomePage({ onCourseClick, courses }) {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
  <div className="container">
    <div className="header-content">
      {/* Logo + Nombre */}
      <div className="header-left">
        <div className="logo-circle">MA</div>
        <div>
          <a href="#" className="header-title">Mariana Abdala</a>
          <p className="header-subtitle">Mentora Certificada Senior</p>
        </div>
      </div>

      {/* Navegación */}
      <div className="header-right">
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#diagnostico" className="nav-link">Sobre mi</a></li>
            <li><a href="#servicios" className="nav-link">Cursos</a></li>
            <li><a href="#cursos" className="nav-link">Metodología</a></li>
            <li><a href="#contacto" className="nav-link">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</header>

      {/* Hero Section */}
{/* Hero Section */}
<section className="hero" id="inicio">
  <div className="container hero-container">
    <div className="hero-text">
      <h1 className="hero-title">Formar líderes éticos en investigación clínica</h1>
      <p className="hero-subtitle">
        Acompaño a profesionales y equipos a desarrollar competencias reales, integrando propósito, rigor y ética en cada paso.
      </p>

      <div className="hero-cta">
        <span>
        <a href="#sobre" className="btn-primary-hero">Conocer más</a>
        </span>
        <span>
        <a href="#cursos" className="btn-outline">Ver cursos</a>
        </span>
      </div>
    </div>

    <div className="hero-image">
      <img
        src="/mujer.jpg"
        alt="Mariana Abdala Mentora en investigación clínica"
      />
    </div>
  </div>
</section>


{/* About Section */}
<section className="about-section" id="sobre">
  <div className="container about-container">
    <div className="about-image">
      <img src="/mujer.jpg" alt="Mariana Abdala - Mentora en investigación clínica" />
    </div>

    <div className="about-text">
      <h3 className="section-title">Formar con propósito</h3>
      <p className="about-intro">
        Soy <strong>Mariana Abdala</strong>, mentora en investigación clínica con más de 25 años de experiencia
        en la industria farmacéutica, académica y regulatoria.
      </p>
      <p>
        Acompaño a profesionales y equipos que buscan avanzar en su carrera sin perder su eje ético ni su vocación.
        Mi enfoque combina rigor técnico con acompañamiento humano: formación con propósito, impacto y coherencia.
      </p>

      <div className="about-stats">
        <div className="stat-item">
          <span className="stat-number">25+</span>
          <span className="stat-label">Años de experiencia</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Profesionales guiados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">10+</span>
          <span className="stat-label">Programas certificados</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Methodology Section */}
<section className="methodology-section" id="metodologia">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">Metodología de formación</h3>
          <p className="section-description">
            Un modelo de aprendizaje ético, práctico y humano, diseñado para potenciar tu desarrollo profesional en investigación clínica.
          </p>
        </div>

        <div className="methodology-grid">
          <div className="methodology-card">
            <div className="methodology-icon">
              <Target size={32} strokeWidth={2.2} />
            </div>
            <h4>Propósito y dirección</h4>
            <p>
              Alineamos tus objetivos personales y profesionales con las oportunidades reales del sector clínico.
            </p>
          </div>

          <div className="methodology-card">
            <div className="methodology-icon">
              <User size={32} strokeWidth={2.2} />
            </div>
            <h4>Acompañamiento humano</h4>
            <p>
              Mentoría cercana y personalizada que integra guía técnica y apoyo ético durante todo el proceso formativo.
            </p>
          </div>

          <div className="methodology-card">
            <div className="methodology-icon">
              <Lightbulb size={32} strokeWidth={2.2} />
            </div>
            <h4>Aplicación práctica</h4>
            <p>
              Casos reales, simulaciones y reflexión crítica para transformar el conocimiento en experiencia profesional.
            </p>
          </div>
        </div>
      </div>
    </section>


      {/* Courses Grid */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Nuestros Cursos</h3>
            <p className="section-description">
              Programas especializados diseñados para profesionales de la investigación clínica y salud
            </p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card" onClick={() => onCourseClick(course)}>
                <div className="course-image-container">
                  <img src={course.image} alt={course.title} className="course-image" />
                  <div className="course-price">${course.price}</div>
                </div>

                <div className="course-content">
                  <div className="course-subtitle">{course.subtitle}</div>
                  <h4 className="course-title">{course.title}</h4>
                  <p className="course-description">{course.description}</p>

                  <div className="course-info">
                    <div className="info-item"><Clock className="info-icon" /><span>{course.duration}</span></div>
                    <div className="info-item"><Users className="info-icon" /><span>{course.students}</span></div>
                    <div className="info-item"><Award className="info-icon" /><span>Nivel: {course.level}</span></div>
                  </div>

                  <div className="course-features-section">
                   

                    <button className="btn-primary-courses">
                      Ver Curso
                      <ChevronRight className="btn-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       <section className="contact-section" id="contacto">
      <div className="container contact-container">
        <div className="contact-text">
          <h3 className="contact-title">¿Tienes preguntas o necesitas orientación?</h3>
          <p className="contact-description">
            Escríbenos y te ayudaremos a encontrar el curso o programa más adecuado para tu perfil profesional.
          </p>

          <div className="contact-info">
            <div className="contact-item">
              <Phone className="contact-icon" />
              <a href="https://wa.me/41414141" target="_blank" rel="noopener noreferrer">
                +51 994 114 304
              </a>
            </div>
            <div className="contact-item">
              <Mail className="contact-icon" />
              <a href="mailto:info@crystal-research.com.pe">
                mariana@gmail.com
              </a>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/xknkzqzq"
          method="POST"
        >
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Enviar mensaje <Send className="btn-icon" size={18} />
          </button>
        </form>
      </div>
    </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p className="footer-text">© 2025 Mariana Abdala. Todos los derechos reservados.</p>
        
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
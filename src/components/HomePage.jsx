import { BookOpen, Clock, Users, Award, ChevronRight, Check, Target, User, Lightbulb, Mail, Phone, Send } from 'lucide-react';
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
              <div className="logo-circle">CR</div>
              <div>
                <a href="#" className="header-title">Mariana Abdala  </a>
                <p className="header-subtitle">Mentora Senior Certificada</p>
              </div>
            </div>

            {/* Navegación */}
            <div className="header-right">
              <nav className="nav">
                <ul className="nav-list">
                  <li><a href="#sobre" className="nav-link">Sobre nosotros</a></li>
                  <li><a href="#cursos" className="nav-link">Cursos</a></li>
                  <li><a href="#metodologia" className="nav-link">Metodología</a></li>
                  <li><a href="#contacto" className="nav-link">Contacto</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="inicio">
        <div className="container hero-container">
          <div className="hero-text">
            <h1 className="hero-title">Fluidez y Confianza para Expresarte y Crecer</h1>
            <p className="hero-subtitle">
               Investigación Clínica - Celebrando 20 años de excelencia en formación especializada de inglés
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
            <img src="/mujer.jpg" alt="Mariana Abdala Mentora en investigación clínica" />
          </div>

          <div className="about-text">
            <h3 className="section-title">Formar con proposito</h3>
            <p className="about-intro">
              <strong>Soy Mariana Abdala </strong> líder en formación especializada de inglés para profesionales 
              de la investigación clínica y salud con más de 20 años de experiencia.
            </p>
            <p>
              Mi enfoque combina excelencia académica con metodologías innovadoras para desarrollar 
              competencias lingüísticas reales que potencien tu carrera profesional en el ámbito internacional.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Años de experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Profesionales certificados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Cursos especializados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="methodology-section" id="metodologia">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Nuestra Metodología</h3>
            <p className="section-description">
              Un modelo de aprendizaje especializado, práctico y efectivo, diseñado para profesionales 
              de la investigación clínica que necesitan dominar el inglés técnico.
            </p>
          </div>

          <div className="methodology-grid">
            <div className="methodology-card">
              <div className="methodology-icon">
                <Target size={32} strokeWidth={2.2} />
              </div>
              <h4>Enfoque especializado</h4>
              <p>
                Contenidos específicos para investigación clínica, protocolos médicos y comunicación 
                científica internacional.
              </p>
            </div>

            <div className="methodology-card">
              <div className="methodology-icon">
                <User size={32} strokeWidth={2.2} />
              </div>
              <h4>Grupos reducidos</h4>
              <p>
                Máximo 5 personas por grupo para garantizar atención personalizada y práctica intensiva 
                de speaking.
              </p>
            </div>

            <div className="methodology-card">
              <div className="methodology-icon">
                <Lightbulb size={32} strokeWidth={2.2} />
              </div>
              <h4>Aplicación práctica</h4>
              <p>
                Simulaciones de presentaciones científicas, redacción de papers y comunicación 
                en contextos clínicos reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-section" id="cursos">
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
                    <ul className="course-features">
                      {course.features && course.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <Check className="check-icon" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

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

      {/* Contact Section */}
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
                <a href="https://wa.me/51994114304" target="_blank" rel="noopener noreferrer">
                  (51) 994114304
                </a>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <a href="mailto:info@crystal-research.com.pe">
                  info@crystal-research.com.pe
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
          <p className="footer-subtext">Celebrating 20 years of excellence in specialized English training</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
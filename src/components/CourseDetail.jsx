// components/CourseDetail.jsx
import { ArrowLeft, Clock, Users, Award, BookOpen, Check } from 'lucide-react';
import '../base.css';
import './coursedetail.css';
function CourseDetail({ course, onBack, onEnroll }) {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <button onClick={onBack} className="back-button">
            <ArrowLeft className="back-icon" />
            Volver a Cursos
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="detail-hero">
        <img 
          src={course.image} 
          alt={course.title}
          className="detail-hero-image"
        />
        <div className="detail-hero-overlay"></div>
        <div className="detail-hero-content">
          <div className="container">
            <p className="detail-subtitle">{course.subtitle}</p>
            <h1 className="detail-title">{course.title}</h1>
            <p className="detail-description">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-content">
        <div className="container">
          <div className="detail-grid">
            {/* Left Column */}
            <div className="detail-main">
              {/* Overview */}
              <div className="detail-card">
                <h2 className="card-title">Información General</h2>
                <div className="info-grid">
                  <div className="info-box">
                    <div className="info-box-icon purple">
                      <Clock className="icon" />
                    </div>
                    <div>
                      <p className="info-box-title">Duración</p>
                      <p className="info-box-text">{course.duration}</p>
                    </div>
                  </div>
                  <div className="info-box">
                    <div className="info-box-icon teal">
                      <Users className="icon" />
                    </div>
                    <div>
                      <p className="info-box-title">Modalidad</p>
                      <p className="info-box-text">{course.students}</p>
                    </div>
                  </div>
                  <div className="info-box">
                    <div className="info-box-icon purple">
                      <Award className="icon" />
                    </div>
                    <div>
                      <p className="info-box-title">Nivel</p>
                      <p className="info-box-text">{course.level}</p>
                    </div>
                  </div>
                  <div className="info-box">
                    <div className="info-box-icon teal">
                      <BookOpen className="icon" />
                    </div>
                    <div>
                      <p className="info-box-title">Formato</p>
                      <p className="info-box-text">Virtual Training</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modules */}
              <div className="detail-card">
                <h2 className="card-title">Módulos del Curso</h2>
                <div className="modules-list">
                  {course.modules.map((module, idx) => (
                    <div key={idx} className="module-item">
                      <h3 className="module-title">{module.title}</h3>
                      <ul className="module-topics">
                        {module.topics.map((topic, topicIdx) => (
                          <li key={topicIdx} className="topic-item">
                            <Check className="topic-check" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="detail-card">
                <h2 className="card-title">El Curso Incluye</h2>
                <div className="includes-grid">
                  {course.includes.map((item, idx) => (
                    <div key={idx} className="include-item">
                      <Check className="include-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing */}
            <div className="detail-sidebar">
              <div className="pricing-card">
                <div className="pricing-header">
                  <p className="pricing-label">Inversión</p>
                  <div className="pricing-amount">${course.price}</div>
                  <p className="pricing-note">Precio especial de lanzamiento</p>
                </div>

                <button 
                  className="btn-enroll"
                  onClick={() => onEnroll(course)}
                >
                  Inscribirme Ahora
                </button>

                <div className="pricing-features">
                  <h3 className="pricing-features-title">Características Destacadas</h3>
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="pricing-feature">
                      <Check className="pricing-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pricing-contact">
                  <p className="pricing-contact-text">¿Tienes preguntas?</p>
                  <a 
                    href="https://wa.me/51994114304"
                    className="btn-whatsapp"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p className="footer-text">© 2025 Crystal Research. Todos los derechos reservados.</p>
          <p className="footer-subtext">Celebrating 20 years of excellence in specialized English training</p>
        </div>
      </footer>
    </div>
  );
}

export default CourseDetail;

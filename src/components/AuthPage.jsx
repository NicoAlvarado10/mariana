// components/AuthPage.jsx
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import '../base.css';
import './authpage.css';
function AuthPage({ course, onAuth, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="container">
          <button onClick={onBack} className="back-button">
            <ArrowLeft className="back-icon" />
            Volver al Curso
          </button>
        </div>
      </header>

      <div className="auth-container">
        <div className="container">
          <div className="auth-grid">
            {/* Left Side - Course Info */}
            <div className="auth-course-info">
              <div className="auth-card-course">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="auth-course-image"
                />
                <div className="auth-course-content">
                  <p className="auth-course-subtitle">{course.subtitle}</p>
                  <h2 className="auth-course-title">{course.title}</h2>
                  <p className="auth-course-price">${course.price}</p>
                  <p className="auth-course-text">
                    Estás a un paso de comenzar tu transformación profesional
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="auth-form-container">
              <div className="auth-card">
                <div className="auth-header">
                  <h1 className="auth-title">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </h1>
                  <p className="auth-description">
                    {isLogin 
                      ? 'Ingresa tus credenciales para continuar' 
                      : 'Completa tus datos para registrarte'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <div className="form-group">
                      <label className="form-label">Nombre Completo</label>
                      <div className="input-group">
                        <User className="input-icon" />
                        <input
                          type="text"
                          name="name"
                          className="form-input"
                          placeholder="Juan Pérez"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <Mail className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <div className="input-group">
                        <Phone className="input-icon" />
                        <input
                          type="tel"
                          name="phone"
                          className="form-input"
                          placeholder="+54 9 11 1234-5678"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Contraseña</label>
                    <div className="input-group">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-submit">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </button>
                </form>

                <div className="auth-divider">
                  <span>o</span>
                </div>

                <button 
                  type="button"
                  className="btn-toggle"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin 
                    ? '¿No tienes cuenta? Regístrate' 
                    : '¿Ya tienes cuenta? Inicia sesión'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer-content">
          <p className="footer-text">© 2025 Crystal Research. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default AuthPage;
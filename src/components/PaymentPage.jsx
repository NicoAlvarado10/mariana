// components/PaymentPage.jsx
import { useState } from 'react';
import { ArrowLeft, CreditCard, Calendar, Lock, Check } from 'lucide-react';
import '../base.css';
import './paymentpage.css';

function PaymentPage({ course, user, onBack, onComplete }) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    country: 'Argentina',
    postalCode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete();
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="container">
          <button onClick={onBack} className="back-button">
            <ArrowLeft className="back-icon" />
            Volver
          </button>
        </div>
      </header>

      <div className="payment-container">
        <div className="container">
          <div className="payment-header-section">
            <h1 className="payment-main-title">Finalizar Inscripción</h1>
            <p className="payment-main-description">
              Completa tu pago de forma segura
            </p>
          </div>

          <div className="payment-grid">
            {/* Left Side - Payment Form */}
            <div className="payment-form-section">
              <div className="payment-card">
                <div className="payment-security-badge">
                  <Lock className="security-icon" />
                  <span>Pago 100% seguro y encriptado</span>
                </div>

                <form onSubmit={handleSubmit} className="payment-form">
                  <div className="form-section">
                    <h3 className="form-section-title">Información de Pago</h3>
                    
                    <div className="form-group">
                      <label className="form-label">Número de Tarjeta</label>
                      <div className="input-group">
                        <CreditCard className="input-icon" />
                        <input
                          type="text"
                          name="cardNumber"
                          className="form-input"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={handleChange}
                          maxLength="19"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nombre en la Tarjeta</label>
                      <input
                        type="text"
                        name="cardName"
                        className="form-input"
                        placeholder="JUAN PEREZ"
                        value={paymentData.cardName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Fecha de Vencimiento</label>
                        <div className="input-group">
                          <Calendar className="input-icon" />
                          <input
                            type="text"
                            name="expiryDate"
                            className="form-input"
                            placeholder="MM/AA"
                            value={paymentData.expiryDate}
                            onChange={handleChange}
                            maxLength="5"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <div className="input-group">
                          <Lock className="input-icon" />
                          <input
                            type="text"
                            name="cvv"
                            className="form-input"
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={handleChange}
                            maxLength="4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3 className="form-section-title">Información de Facturación</h3>
                    
                    <div className="form-group">
                      <label className="form-label">País</label>
                      <select
                        name="country"
                        className="form-select"
                        value={paymentData.country}
                        onChange={handleChange}
                      >
                        <option>Argentina</option>
                        <option>México</option>
                        <option>Colombia</option>
                        <option>Chile</option>
                        <option>Perú</option>
                        <option>España</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Código Postal</label>
                      <input
                        type="text"
                        name="postalCode"
                        className="form-input"
                        placeholder="1234"
                        value={paymentData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-pay">
                    Pagar ${course.price}
                  </button>

                  <p className="payment-terms">
                    Al hacer clic en "Pagar", aceptas nuestros términos y condiciones
                  </p>
                </form>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="payment-summary-section">
              <div className="summary-card">
                <h3 className="summary-title">Resumen del Pedido</h3>

                <div className="summary-course">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="summary-course-image"
                  />
                  <div className="summary-course-info">
                    <p className="summary-course-subtitle">{course.subtitle}</p>
                    <h4 className="summary-course-title">{course.title}</h4>
                  </div>
                </div>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${course.price}</span>
                  </div>
                  <div className="summary-row">
                    <span>Descuento</span>
                    <span className="text-green">-$0</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>${course.price}</span>
                  </div>
                </div>

                <div className="summary-benefits">
                  <p className="summary-benefits-title">Este curso incluye:</p>
                  <ul className="summary-benefits-list">
                    {course.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="summary-benefit-item">
                        <Check className="benefit-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="summary-guarantee">
                  <div className="guarantee-badge">
                    <Check className="guarantee-icon" />
                  </div>
                  <div>
                    <p className="guarantee-title">Garantía de 30 días</p>
                    <p className="guarantee-text">
                      Si no estás satisfecho, te devolvemos tu dinero
                    </p>
                  </div>
                </div>
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

export default PaymentPage;

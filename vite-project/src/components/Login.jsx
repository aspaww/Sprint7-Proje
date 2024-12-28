import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?!.*[@!])[A-Za-z0-9]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRegex.test(email) && passwordRegex.test(password) && termsAccepted) {
      setErrorMessage('');
      alert('Başarılı giriş!');
    } else {
      if (!emailRegex.test(email)) {
        setErrorMessage('Geçerli bir email adresi girin.');
      } else if (!passwordRegex.test(password)) {
        setErrorMessage('Şifreniz en az 8 karakter olmalı, büyük harf, küçük harf ve rakam içermelidir. Özel karakterler kullanılamaz.');
      } else if (!termsAccepted) {
        setErrorMessage('Şartları kabul etmeniz gerekiyor.');
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm(e.target.value, password, termsAccepted);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm(email, e.target.value, termsAccepted);
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    validateForm(email, password, e.target.checked);
  };

  const validateForm = (email, password, termsAccepted) => {
    if (emailRegex.test(email) && passwordRegex.test(password) && termsAccepted) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  return (
    <div>
      <h2>Login Formu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {email && !emailRegex.test(email) && (
            <span style={{ color: 'red' }}>Geçerli bir email adresi girin.</span>
          )}
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {password && !passwordRegex.test(password) && (
            <span style={{ color: 'red' }}>Şifreniz en az 8 karakter olmalı, büyük harf, küçük harf ve rakam içermelidir. Özel karakterler kullanılamaz.</span>
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
            />
            Şartları kabul ediyorum
          </label>
          {!termsAccepted && <span style={{ color: 'red' }}>Şartları kabul etmeniz gerekiyor.</span>}
        </div>
        <div>
          <button type="submit" disabled={!formValid}>
            Giriş 
          </button>
        </div>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;

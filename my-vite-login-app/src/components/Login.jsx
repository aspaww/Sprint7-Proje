import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // Regex'ler:
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Örnek: en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermeli
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  useEffect(() => {
    const newErrors = [];

    if (!emailRegex.test(email)) {
      newErrors.push("Lütfen geçerli bir email adresi giriniz.");
    }
    if (!passwordRegex.test(password)) {
      newErrors.push("Lütfen güçlü bir şifre giriniz (en az 8 karakter, büyük/küçük harf, rakam, özel karakter).");
    }
    if (!terms) {
      newErrors.push("Devam edebilmek için şartları kabul etmelisiniz.");
    }

    setErrors(newErrors);
    setIsValid(newErrors.length === 0);
  }, [email, password, terms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      // Giriş başarılı ise success sayfasına yönlendir.
      navigate("/success");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login Formu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email-input"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="password">Şifre:</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            data-testid="terms-checkbox"
          />
          <label htmlFor="terms"> Şartları kabul ediyorum</label>
        </div>
        {errors.length > 0 && (
          <div style={{ color: "red", marginTop: "10px" }} data-testid="error-messages">
            {errors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}
        <button type="submit" disabled={!isValid} data-testid="submit-button" style={{ marginTop: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

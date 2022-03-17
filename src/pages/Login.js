import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../assets/images/icons/login-img.png';

function Login() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = form;

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setForm(values => ({ ...values, error: 'All Fields Are Required' }));
    }

    try {
      setForm(values => ({ ...values, error: null, loading: true }));
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
    } catch (err) {
      setForm(values => ({
        email: '',
        password: '',
        error: err.message,
        loading: false,
      }));
    }
  };

  return (
    <section className="container login">
      <div className="form-wrapper">
        <div className="form-intro">
          <div className="form-intro-text">
            <h4>Welcome Back !</h4>
            <p>Sign In To Continue Using This Chat.</p>
            <small className="fw-bolder">
              Make sure to be registered first!
            </small>
          </div>

          <img src={Img} alt="Login Image" className="form-intro-image" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {form.error ? <p className="error">{form.error}</p> : null}
          <div className="btn-container">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Logging-in ...' : 'Login'}
            </button>
          </div>

          <p className="text-center mt-2 fw-bolder">
            Didn't register yet?{' '}
            <Link to="/register" className="register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;

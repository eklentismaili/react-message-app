import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../assets/images/icons/login-img.png';

function Register() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const { name, email, password, error, loading } = form;

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setForm(values => ({ ...values, error: 'All Fields Are Required' }));
    }

    try {
      setForm(values => ({ ...values, error: null, loading: true }));
      const result = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
    } catch (err) {
      setForm(values => ({
        name: '',
        email: '',
        password: '',
        error: err.message,
        loading: false,
      }));
    }

    console.log(form);
  };

  return (
    <section className="container register">
      <div className="form-wrapper">
        <div className="form-intro">
          <div className="form-intro-text">
            <h4>Free Register!</h4>
            <p>Get Your Free Chat Account Now.</p>
            <small className="fw-bolder">
              Make sure to fill all fields first!
            </small>
          </div>

          <img src={Img} alt="Login Image" className="form-intro-image" />
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
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
              {loading ? 'Creating ...' : 'Register'}
            </button>
          </div>

          <p className="text-center mt-2 fw-bolder">
            Already have an account?{' '}
            <Link to="/login" className="login">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;

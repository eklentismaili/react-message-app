import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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

    console.log(form);
  };

  return (
    <section>
      <h3>Log Into Your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {form.error ? <p className="error">{form.error}</p> : null}
        <div className="btn-container">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Logging-in ...' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;

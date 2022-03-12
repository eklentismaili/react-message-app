import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
    <section>
      <h3>Create An Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
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
            {loading ? 'Creating ...' : 'Register'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;

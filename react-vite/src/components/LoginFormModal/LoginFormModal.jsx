import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const demoLogin = (e) => {
    e.preventDefault;
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <div className="login-modal-whole">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


        {errors.email && <p className="login-modal-errors">{errors.email}</p>}

        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


        {errors.password && <p className="login-modal-errors">{errors.password}</p>}
        <button type="submit">Log In</button>
        <button onClick={demoLogin}>Login as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;

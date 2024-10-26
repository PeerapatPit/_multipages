import { verifyUser } from "../../data/users";
import { useRef } from "react";
import "./Login.css";
import Form from "react-bootstrap/Form";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passRef = useRef();
  return (
    <div className="login-container">
      <div className="box1"></div>
      <div className="box2">
        <h2>Login</h2>
        <Form>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            style={{ marginBottom: "1rem" }}
            placeholder="Enter username"
            ref={userRef}
          />
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Enter password"
            ref={passRef}
          />
          <button
            className="login-btn"
            onClick={() => {
              const user = userRef.current.value.trim();
              const pass = passRef.current.value.trim();
              userRef.current.value = "";
              passRef.current.value = "";
              const userInfo = verifyUser(user, pass);

              if (userInfo === null) {
                alert("Wrong username or password");
                userRef.current.focus();
              } else {
                setToken(userInfo.token);
              }
            }}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;

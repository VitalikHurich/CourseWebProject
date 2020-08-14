import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./style/Login.css";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      isLoged: false,
    };

    this.Authorize = this.Authorize.bind(this);
  }

  Authorize = () => {
    const loginUrl = "http://localhost:5000/api/auth/authenticate";

    let credentials = {
      Login: this.state.login,
      Password: this.state.password,
    };

    // let infoBlock = document.querySelector("#infoBlock");

     fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((x) => x.json())
      .then((result) => {
        if (!result.success) {
          console.log("Error!");
        } else {
          let userInfo = parseJwt(result.data.token);
          console.log(userInfo)
          window.localStorage.setItem("shopapitoken", result.data.token);
          this.setState({isLoged: true})
          if(userInfo.role === "Admin"){
            this.props.history.push("/admin")
          } else if(userInfo.role === "User") {
            this.props.history.push("/rtl")
          }
        }
      });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              value={this.state.login}
              onChange={(e) => this.setState({login: e.target.value})}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => this.Authorize()}
              className="submitBtn"
            >
              Вход
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/registration" variant="body2">
                  {"У вас нет аккаунта? Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default Login;

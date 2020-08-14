import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./style/Registration.css"

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      login: "",
      password: "",
    }

    this.registerNewUser = this.registerNewUser.bind(this);
  }

  registerNewUser = () => {
    const createUserUrl = "http://localhost:5000/api/users";

    let credentials = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      login: this.state.login,
      password: this.state.password,
    };

    let infoBlock = document.querySelector("#infoBlockRegister");

    fetch(createUserUrl, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((x) => {
      if (!x.ok) {
        x.text().then((res) => {
          infoBlock.innerHTML = res.message;
          infoBlock.style.color = "red";
        });
      } else {
        x.json().then((result) => {
          infoBlock.innerHTML = `Account created!`;
          infoBlock.style.color = "green";
        });
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
          <Typography className="title" component="h1" variant="h5">
            Регистрация
          </Typography>
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  onChange={(e) => this.setState({ firstname: e.target.value})}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => this.setState({ lastname: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="login"
                  label="Логин"
                  name="login"
                  autoComplete="login"
                  onChange={(e) => this.setState({ login: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => this.setState({ password: e.target.value})}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className="submitBtn"
              onClick={() => this.registerNewUser() }
            >
              Зарегистрироватся
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Уже есть аккаунт? Войти в систему
                </Link>
              </Grid>
            </Grid>
            <div id="infoBlockRegister"></div>
          </form>
        </div>
      </Container>
    );
  }
}

export default Registration;
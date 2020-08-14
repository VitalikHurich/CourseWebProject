import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";

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

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const userInfo = parseJwt(window.localStorage.getItem("shopapitoken"));

  let [firstName, setFirstName] = useState(userInfo.given_name);
  let [lastName, setLastName] = useState(userInfo.actort);
  let [login, setLogin] = useState(userInfo.unique_name);
  let [password, setPassword] = useState("");

  function updateUser() {
    const loginUrl = `http://localhost:5000/api/users/${userInfo.email}`;
    console.log(loginUrl)

    let credentials = {
      Firstname: firstName,
      Lastname: lastName,
      Password: password,
    };

     fetch(loginUrl, {
      method: "PUT",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((x) => x.json())
      .then((result) => {
        console.log(result)
      });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Редактирование профиля</h4>
              <p className={classes.cardCategoryWhite}>
                Заполните свой профиль
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstname"
                    label="Имя"
                    name="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastname"
                    label="Фамилия"
                    name="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="login"
                    label="Логин"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Пароль"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => updateUser()}>Обновить профиль</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

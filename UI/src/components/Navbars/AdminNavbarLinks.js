import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout = () => {
    window.localStorage.removeItem("shopapitoken");
  };

  render() {
    return (
      <div>
        <div>
          <Button
            color="primary"
            component={RouterLink}
            to="/login"
            onClick={() => this.logout()}
          >
            Выход
          </Button>
        </div>
      </div>
    );
  }
}

export default AdminNavbarLinks;

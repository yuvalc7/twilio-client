import React, { Component } from "react";
import { TextField, Button, FormHelperText } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";

import "../styles/AppForm.css";

class AppForm extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
      phone_number:"",
      errorMessagePhoneNumber:""
  };

  handleInputChange = (event) => {
    this.setState({phone_number: event.target.value});
  };

  validateFormAndSubmit = (e) => {
    e.preventDefault();
    if (this.ValidatePhone()) {
      const { handleSubmit } = this.props;
      const { phone_number } = this.state;
      handleSubmit(e, phone_number);
      this.clearStateData();
      alert("calling... !!!");
    }
  };

  ValidatePhone() {
    let phonePattern = /^([+[0-9]{1,5})?([0-9]{2}[0-9]{3}[0-9]{4})$/; ///^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    let matchPhonePattern = this.state.phone_number.match(phonePattern);
    console.log(matchPhonePattern);
    matchPhonePattern
      ? this.setState({ errorMessagePhoneNumber: "" })
      : this.setState({errorMessagePhoneNumber: "Invalid Phone Number !!"});

    return matchPhonePattern ;
  }

  clearStateData = () => {
    this.setState({phone_number: ""});
  };

  render() {
    const {
      phone_number,
      errorMessagePhoneNumber
    } = this.state;
    return (
      <form
        onSubmit={(e) => {
          this.validateFormAndSubmit(e);
        }}
        autoComplete="off"
        className="flex make-a-call-form"
      >
          <div className="input-phone-number" style={{ marginRight: "25px" }}>
            <InputLabel className="label-phone-number" id="demo-simple-select-label">
              Phone Number:
            </InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name="server_name"
              style={{ width: "150px" }}
              value={phone_number}
              required={true}
              onChange={this.handleInputChange}
              placeholder="+972526582700"
            ></TextField>
            {errorMessagePhoneNumber && (
              <h6 className="error" style={{ width: "100%", right: "-50px" }}>
                {errorMessagePhoneNumber}
              </h6>
            )}
          </div>
        <div className="call-button">
          <Button
            variant="contained"
            style={{ height: "40px" }}
            color="primary"
            type="submit"
          >
            Call Now 
          </Button>
        </div>
      </form>
    );
  }
}

export default AppForm;

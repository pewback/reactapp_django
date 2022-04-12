import React, { useState } from 'react'
import axios from "axios";
const RegisterPage = () => {
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
      });
      const handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormValues({
          ...formValues,
          [name]: value
        });
      };
      const submitForm = event => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/register/", formValues);
      };
    return (
      <div className="App">
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="username"
            value={formValues.username}
            name="username"
            onChange={handleInputChange}
          />
            <input
            type="email"
            value={formValues.email}
            name="email"
            placeholder="email"
            onChange={handleInputChange}
          />
          <input
            type="password"
            value={formValues.password}
            name="password"
            placeholder="password"
            onChange={handleInputChange}
          />
          <input
            type="text"
            value={formValues.first_name}
            name="first_name"
            placeholder="first name"
            onChange={handleInputChange}
          />
            <input
            type="text"
            value={formValues.last_name}
            name="last_name"
            placeholder="last name"
            onChange={handleInputChange}
          />

          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }

  export default RegisterPage
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, InputContainer } from "./styled.js";
import useForms from "../../hooks/useForms.js";
import axios from "axios";
import baseURL from "../../constants/baseURL.js";
import { goToSignUp } from "../../routes/coordinator.js";
import { useProtectedData } from "../../hooks/useProtectedData.js";


function LoginPage() {

  const {form, onChange, limparCampos} = useForms({email: '', password: ''})
  
  const navigate = useNavigate();



  const enviarLogin = (e) => {
    e.preventDefault()
    const body = {
      email: form.email,
      password: form.password
    }

    axios.post(`${baseURL}/user/login`, body)
    .then((resp)=> {
      console.log(form)
      console.log(resp)
      localStorage.setItem('token', resp.data.token)
      navigate('/feed')
    })
    .catch((err)=> {
      console.log(err)
    })

    limparCampos()
  }
 
  return (
    <main>
      <h1>Login</h1>
      <FormContainer>
        <InputContainer onSubmit={enviarLogin}>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            value={form.email}
            onChange={onChange}
            type="email"
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            value={form.password}
            onChange={onChange}
            type="password"
            required
          />
        </InputContainer>
        <button>Entrar</button>
        <button onClick={()=>goToSignUp(navigate)}>Não tenho cadastro</button>
      </FormContainer>
    </main>
  );
}

export default LoginPage;

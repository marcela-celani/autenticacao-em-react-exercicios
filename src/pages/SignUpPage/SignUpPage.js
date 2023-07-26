import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";
import { FormContainer, InputContainer } from "./styled";
import baseURL from '../../constants/baseURL'
import axios from "axios";
import useForms from '../../hooks/useForms'

function SignUpPage() {
  const navigate = useNavigate();

  const {form, onChange, limparCampos} = useForms({name: '', email: '', password: ''})

  const enviarCadastro = (e) => {
    e.preventDefault()
    const body = {
      name: form.name,
      email: form.email,
      password: form.password
    }

    axios.post(`${baseURL}/user/signup`, body)
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
      <h1>Cadastro</h1>
      <FormContainer onSubmit={enviarCadastro}>
        <InputContainer>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            value={form.name}
            onChange={onChange}
            type="text"
            required
          />
        </InputContainer>
        <InputContainer>
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

        <button>Cadastrar</button>
        <button onClick={()=>goToLogin(navigate)}>Já sou cadastrado</button>
      </FormContainer>
    </main>
  );
}

export default SignUpPage;
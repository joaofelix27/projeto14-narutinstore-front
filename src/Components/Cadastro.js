import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Narutin from "../assets/narutin.png";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaconf, setSenhaconf] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  function fazerCadastro(event) {
    event.preventDefault();
    const testeCPF = TestaCPF(cpf);
    if (senha !== senhaconf) {
      alert("Senhas não conferem");
      return;
    }
    if (!testeCPF) {
      alert("CPF Inválido!");
      return;
    }
    if (email !== "" && testeCPF) {
      const URL = `http://localhost/register`;
      const profileData = {
        email: email,
        cpf: cpf,
        name: nome,
        password: senha,
      };
      const promise = axios.post(URL, profileData);
      promise
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("E-mail cadastrado!");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert("E-mail já cadastrado!");
          } else if (err.response.status === 408){
            alert("CPF já cadastrado!");
          } else {
            alert("Erro no cadastro!");
          }
        });
    }
  }
  function TestaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    }

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }
    if (Resto != parseInt(strCPF.substring(9, 10))) {
      return false;
    }

    Soma = 0;
    for (let i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    }

    if (Resto == 10 || Resto == 11) {
      Resto = 0;
    }
    if (Resto != parseInt(strCPF.substring(10, 11))) {
      return false;
    }
    return true;
  }

  function montarFormularioCadastro() {
    return (
      <>
        <form>
          <input
            type="text"
            required
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          ></input>
          <input
            type="email"
            required
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="CPF"
            required
            pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
            title="Digite um CPF no formato: xxx.xxx.xxx-xx"
            onChange={(e) => setCPF(e.target.value)}
          ></input>
          <input
            type="password"
            required
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <input
            type="password"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setSenhaconf(e.target.value)}
          ></input>
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <h1>Já tem uma conta? Entre agora!</h1>
        </Link>
      </>
    );
  }

  const formularioCadastro = montarFormularioCadastro();
  return (
    <Container>
      <Header>
        <img src={Narutin} />
        <div>
          <h1>Narutin</h1>
        </div>
      </Header>
      <FormularioCadastro onSubmit={fazerCadastro}>
        {formularioCadastro}
      </FormularioCadastro>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  cursor: pointer;
  padding-top: 95px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  div {
    margin-top: 17px;
    h1 {
      font-family: Permanent Marker;
      font-size: 32px;
      font-weight: 400;
      line-height: 47px;
      letter-spacing: 0em;
    }
  }
  img {
    width: 70px;
  }
`;
const FormularioCadastro = styled.div`
  padding-top: 28px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 58px;
    width: 326px;
    border-radius: 5px;
    background-color: #000000;
    border: 0px;
    margin-bottom: 13px;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;

    padding: 16px;
  }
  button {
    border: 0px;
    background-color: #ea8b1c;
    height: 46px;
    width: 326px;
    border-radius: 5px;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    color: #000000;
    margin-bottom: 32px;
  }
  h1 {
    font-family: Raleway;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    color: #000000;
    text-align: center;
  }
`;

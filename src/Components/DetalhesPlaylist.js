import React from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

const ImgLogo = styled.img`
  height: 12vh;
  margin-right: 20px;
  margin-left: 30px;
  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    height: 8vh;
  }
`;

const HeaderPrincipal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 98, 5vw;
  height: 15vh;
  background-color: #090a09;
  color: #05df05;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 20px;
    width: 100vw;
  }
`;
const DivPrincipal = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
`;

const CardMusica = styled.div`
  display: inline-block;
  display: flex;
  border: 1px solid black;
  align-items: center;
  width: 800px;
  margin-bottom: 20px;
  padding-left: 10px;
  justify-content: space-evenly;
  background-image: linear-gradient(to left, green, #30a14a, #05df05);
  height: 80px;
  font-size: 15px;
  color: black;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 10px;
    width: 300px;
    display: flex;
    align-items: center;
    text-align: center;
  }
`;

const CardAudio = styled.audio`
  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 100px;
    height: 40px;
  }
`;

const MainPrincipal = styled.div`
  color: #05df05;
  background-image: url(https://rich-rub.surge.sh/static/media/MusicBlack.717e7e0b.jpg);
  /* height: 100vh; */
  width: 98, 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 50px;
  text-shadow: #05df05;
  position: relative;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 25px;
    width: 100vw;
    min-height: 110vh;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const InputMusic = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  margin-bottom: 15px;
  width: 50%;
  height: 35px;
  color: white;
  font-size: 20px;
  color: #05df05;
  border-bottom: 1px solid #05df05;
`;

const ButtonMusic = styled.button`
  border: none;
  background-image: linear-gradient(to left, green, #30a14a, #05df05);
  width: 50%;
  height: 35px;
  border-radius: 15px;
  color: black;
  margin-bottom: 30px;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 12px;
    width: 50%;
  }
`;

const ButtonPlaylist = styled.button`
  display: flex;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 15px;
  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid gray;
  height: 60px;
  background-image: linear-gradient(to left, green, #30a14a, #05df05);
  color: black;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 15px;
    width: 150px;
  }
`;

const FooterList = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: #090a09;
  color: white;
  height: 15vh;
  width: 98, 5vw;
  color: #05df05;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 100vw;
    font-size: 12px;
  }
`;

const headers = {
  headers: {
    Authorization: "Joana-Dias-banu",
  },
};

class DetalhesPlaylist extends React.Component {
  state = {
    name: "",
    artist: "",
    url: "",
    listaMusicas: [],
  };

  adicionaMusica = () => {
    const body = {
      name: this.state.name,
      artist: this.state.artist,
      url: this.state.url,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playListSelect.id}/tracks`,
        body,
        headers
      )
      .then((resposta) => {
        console.log(resposta);
        Swal.fire("", "A Música foi adicionada com sucesso!", "success");
        this.setState({ name: "", artist: "", url: "" });
        this.pegarMusicaPlaylist();
      })
      .catch((erros) => {
        Swal.fire("", "Ops! Algo deu Errado :(", "error");
        console.log(erros);
      });
  };

  onchangeNome = (event) => {
    this.setState({ name: event.target.value });
  };

  onchangeArtista = (event) => {
    this.setState({ artist: event.target.value });
  };

  onchangeLink = (event) => {
    this.setState({ url: event.target.value });
  };

  pegarMusicaPlaylist = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playListSelect.id}/tracks`,
        headers
      )
      .then((respostas) => {
        this.setState({ listaMusicas: respostas.data.result.tracks });
        console.log("Atenção", respostas.data.result.tracks);
      })
      .catch((erros) => console.log(erros));
  };

  componentDidMount() {
    this.pegarMusicaPlaylist();
  }

  render() {
    const retornaMusica = this.state.listaMusicas.map((music) => {
      return (
        <CardMusica>
          <h4>Nome:</h4>
          <p>{music.name}</p>
          <h4>Artista:</h4>
          <p>{music.artist}</p>
          <h4>Música:</h4>
          <p>
            <CardAudio controls src={music.url} />
          </p>
        </CardMusica>
      );
    });

    return (
      <DivPrincipal>
        <HeaderPrincipal>
          <ImgLogo src="/img/icone.png" />
          <h1>Labefy</h1>
        </HeaderPrincipal>

        <MainPrincipal>
          <h2>Adicionar Música</h2>
          <InputMusic
            placeholder={"Nome da música"}
            value={this.state.name}
            onChange={this.onchangeNome}
          />
          <InputMusic
            placeholder={"Nome do artista"}
            value={this.state.artist}
            onChange={this.onchangeArtista}
          />
          <InputMusic
            placeholder={"Link da Música"}
            value={this.state.url}
            onChange={this.onchangeLink}
          />

          <div>
            <ButtonMusic onClick={this.adicionaMusica}>
              Adicionar Música
            </ButtonMusic>

            {retornaMusica}

            <ButtonPlaylist onClick={this.props.renderizaPaginaVoltar}>
              Voltar Para Lista
            </ButtonPlaylist>
          </div>
        </MainPrincipal>

        <FooterList>
          &copy; 2021 All rights reserved.
          <p>Desenvolvido pela estudante da Turma Banu: Joana Dias</p>
        </FooterList>
      </DivPrincipal>
    );
  }
}

export default DetalhesPlaylist;

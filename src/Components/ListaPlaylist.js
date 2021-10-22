import React from "react";
import axios from "axios";
import DetalhesPlaylist from "./DetalhesPlaylist";
import Swal from "sweetalert2";
import styled from "styled-components";

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

const MainPrincipal = styled.div`
  color: #05df05;
  background-image: url(https://rich-rub.surge.sh/static/media/MusicBlack.717e7e0b.jpg);
  min-height: 100vh;
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
  position: relative;

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

const PlayListCard = styled.div`
  border: 1px solid #05df05;
  color: black;
  font-size: 30px;
  background-image: linear-gradient(to left, green, #30a14a, #05df05);
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 12px;
  margin-bottom: 20px;
  flex-direction: left;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 15px;
    width: 50%;
  }
`;

const ButtonListCard = styled.button`
  margin-left: 10px;
  border-radius: 15px;
  height: 35px;
  background-color: black;
  color: #05df05;
  width: 100px;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 12px;
    width: 80px;
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

class ListaPlaylist extends React.Component {
  state = {
    playlist: [],
    paginaDetalhe: false,
    playListSelect: "",
  };

  pegarPlaylist = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        headers
      )
      .then((respostas) => {
        this.setState({ playlist: respostas.data.result.list });
        console.log("Atenção", respostas.data.result.list);
      })
      .catch((erros) => {
        console.log(erros);
      });
  };

  componentDidMount() {
    this.pegarPlaylist();
  }

  deletarUsuario = (id) => {
    if (window.confirm("Deseja deletar essa Playlist?")) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
          headers
        )
        .then((respostas) => {
          console.log(respostas);
          Swal.fire("", "A Playlist foi apagada com sucesso!", "success");
          this.pegarPlaylist();
        })
        .catch((erros) => {
          Swal.fire("", "Ops! Algo deu Errado :(", "error");
          console.log(erros);
        });
    }
  };
  renderizaPaginaDetalhe = (selectplaylist) => {
    this.setState({ paginaDetalhe: true, playListSelect: selectplaylist });
  };

  renderizaPaginaVoltar = () => {
    this.setState({ paginaDetalhe: false });
  };

  render() {
    if (this.state.paginaDetalhe) {
      return (
        <DetalhesPlaylist
          renderizaPaginaVoltar={this.renderizaPaginaVoltar}
          playListSelect={this.state.playListSelect}
        />
      );
    }
    const retornaLista = this.state.playlist.map((playlists) => {
      return (
        <PlayListCard key={playlists.id}>
          {playlists.name}
          <div>
            <ButtonListCard onClick={() => this.deletarUsuario(playlists.id)}>
              Deletar
            </ButtonListCard>

            <ButtonListCard
              onClick={() => this.renderizaPaginaDetalhe(playlists)}
            >
              Mostrar Mais
            </ButtonListCard>
          </div>
        </PlayListCard>
      );
    });

    return (
      <div>
        <HeaderPrincipal>
          <ImgLogo src="/img/icone.png" />
          <h1>Labefy</h1>
        </HeaderPrincipal>

        <MainPrincipal>
          <h2>Lista de Playlist</h2>
          {retornaLista}

          <div>
            <ButtonPlaylist onClick={this.props.irParaCadastro}>
              Voltar para Playlist
            </ButtonPlaylist>
          </div>
        </MainPrincipal>

        <FooterList>
          &copy; 2021 All rights reserved.
          <p>Desenvolvido pela estudante da Turma Banu: Joana Dias</p>
        </FooterList>
      </div>
    );
  }
}

export default ListaPlaylist;

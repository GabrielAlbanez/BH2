import React, { useEffect, useState } from "react";
import { useTema } from "../../common/context/Tema";
import { useAppSelector } from "../../store/intex";
import { LogUser, saveDataUser } from "../../store/slices/AuthToken";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import sockett from "../../common/io/io";
import defaulImg from "../../assets/imgs/img avatar.png";
import Button from "../../components/Button";
import ModalShowLogos from "../../components/Modal/ModalShowLogos";
import axios from "axios";
import { log } from "console";
import ModalConfirByLogo from "../../components/Modal/ModalConfirByLogo";

export default function Account() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [open, setOpen] = useState<boolean>(false);

  const [openModalByLogo, setOpenModalByLogo] = useState<boolean>(false);

  const [selectedLogo, setSelectedLogo] = useState<dataLogos | null>(null);

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
    nome: string;
    imgPerfilAbsolute: string;
  }>;

  console.log(User);

  const logedUser = useAppSelector((state) => state.AuthToken.isLoged);

  const notifyy = (message: string) => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const navigator = useNavigate();

  const logOut = () => {
    notifyy("usuario deslogado");
    setTimeout(() => {
      localStorage.setItem("token", "");
      localStorage.setItem("isLoged", "false");
      navigator("/");
      sockett.disconnect();
      window.location.reload();
    }, 1000);
  };

  type dataLogos = {
    id: number;
    img: string;
    ongId: string;
    preco: number;
    ong: {
      cnpj: string;
      nome: string;
      email: string;
      senha: string;
      telefone: string;
      endereco: string;
      redesSociais: string;
      aprovado: boolean;
      Logo: string;
    };
  };

  const [dataLogos, setDataLogos] = useState<dataLogos[]>([]);

  const getLogos = () => {
    const req = axios.get("http://localhost:8080/getAllLogos").then((res) => {
      setDataLogos(res.data.message);
    });
  };

  type dataComprados = {
    LogoDoacao: {
      id: number;
      img: string;
      ongId: string;
      preco: number;
      Cpfusuario: null;
    };
  };

  const [dataLogosComprados, setDataLogosComprados] = useState<dataComprados[]>(
    []
  );

  const getLogosComprados = async () => {
    const req = await axios
      .post("http://localhost:8080/getAlLogosByEmailUser", {
        email: User[0]?.email,
      })
      .then((res) => {
        setDataLogosComprados(res.data.message);
      });
  };

  useEffect(() => {
    getLogos();
    getLogosComprados();
  }, [dataLogosComprados]);

  console.log("comprados", dataLogosComprados);

  const ulrImgLogos = dataLogos.map((logo) => logo.img.slice(26));

  const updateFileImg = async (img: string) => {
    const req = await axios.post("http://localhost:8080/updateImgUser", {
      img: img,
      cpf: User[0]?.cpf,
    });

    notifyy(
      `${req.data.message}: para ver sua nova foto de perfil faça seu login de novo`
    );
  };

  const [dataUpdate, setDataUpdate] = useState({
    nome: User[0]?.nome,
    cpf: "",
    sexo: User[0]?.sexo,
  });

  const hanleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDataUpdate((dados) => ({
      ...dados,
      [name]: value,
    }));
  };

  console.log(dataUpdate)

  const updateDataUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const req = await axios
      .post("http://localhost:8080/updateDataUser", {
        nome: dataUpdate.nome,
        cpf: User[0]?.cpf,
        sexo: dataUpdate.sexo,
      })
      .then((res) => {
        notifyy(res.data.message);
      });
  };

  const img = User[0]?.imgPerfilAbsolute;

  return (
    <div
      className={` w-full h-full lg:h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-10 ${
        pegarTema === "dark" ? "bg-black text-white" : "bg-[#CEF3FF] text-black"
      }`}
    >
      <div className="text-4xl pt-10">Account</div>
      {logedUser === "true" ? (
        <>
          {logedUser === "true" || User.length > 0 ? (
            <div className="flex   flex-col lg:flex-row items-center justify-center gap-7  lg:gap-32 h-[100%] w-[100%] rounded-2xl  text-lg ">
              <div className="w-full h-full    text-white flex flex-col gap-10 items-center justify-center">
                <figure
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="border-[3px] border-black rounded-full bg-white px-2 py-2 lg:px-5 lg:py-5"
                >
                  {img ? (
                    <img
                      src={require(`../../uploadsDoacaoImgs/${img}`)}
                      alt=""
                      className="cursor-pointer rounded-full w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover transition-all duration-1000 hover:scale-110  hover:overflow-hidden"
                    />
                  ) : (
                    <img
                      src={defaulImg}
                      alt=""
                      className="cursor-pointer rounded-full w-80 h-80 object-cover transition-all duration-1000 hover:scale-110  hover:overflow-hidden"
                    />
                  )}
                </figure>
                <button
                  className={`rounded-full border-[1px] border-fuchsia-500 px-3 py-4 ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>

              <form
                onSubmit={updateDataUser}
                className={`w-full h-full py-5 sm:py-0 text-white flex justify-center gap-10 items-center flex-col ${
                  pegarTema === "dark" ? "text-white" : "text-black"
                }`}
              >
                <div
                  className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">nome</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="nome"
                      value={dataUpdate.nome}
                      onChange={hanleInputChange}
                      type="text"
                      defaultValue={User[0]?.nome}
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>
                <div
                  className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">cpf</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="cpf"
                      disabled={true}
                      defaultValue={User[0]?.cpf}
                      type="text"
                      className="w-[93%] opacity-60 rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>
                <div
                  className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">email</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 opacity-60">
                    <input
                      name="email"
                      disabled={true}
                      type="text"
                      defaultValue={User[0]?.email}
                      placeholder="name@example.com.."
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>

                <div
                  className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">sexo</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="sexo"
                      defaultValue={User[0]?.sexo}
                      value={dataUpdate.sexo}
                      onChange={hanleInputChange}
                      placeholder="name@example.com.."
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`p-6 border-[2px] border-fuchsia-500 rounded-full px-5 py-2 ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  update profile
                </button>
              </form>

              <ModalShowLogos
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
              >
                <div className=" w-full h-full text-black flex items-center justify-center lg:items-start lg:justify-start xl:justify-between gap-32 flex-col sm:gap-10 sm:px-2 sm:py-2 xl:py-10">
                  <div>
                    <h1>Logos que você pode comprar</h1>
                    {dataLogos.length > 0 && (
                      <div className="flex flex-wrap gap-4 pt-3 sm:pt-10">
                        {dataLogos.map((logo, index) => (
                          <div
                            key={logo.id}
                            className=" w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative rounded-full overflow-hidden"
                          >
                            {ulrImgLogos.length > 0 && (
                              <img
                                src={require(`../../uploadsDoacaoImgs/${ulrImgLogos[index]}`)}
                                alt=""
                                className="object-cover w-full h-full"
                              />
                            )}
                            <button
                              onClick={() => {
                                setSelectedLogo(logo);
                                setOpenModalByLogo(true);
                              }}
                              className="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition duration-300 text-white"
                            >
                              Comprar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3  pt-5 sm:gap-10">
                    <h1>Logos compradas</h1>
                    {dataLogosComprados.length > 0 && (
                      <div className="flex  flex-wrap gap-4 pt-3 sm:pt-10">
                        {dataLogosComprados.map((logo, index) => (
                          <div
                            className="cursor-pointer"
                            key={dataLogosComprados[index].LogoDoacao.id}
                            onClick={() => {
                              updateFileImg(
                                dataLogosComprados[index].LogoDoacao.img.slice(
                                  26
                                )
                              );
                            }}
                          >
                            <div className=" w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative rounded-full overflow-hidden">
                              <img
                                src={require(`../../uploadsDoacaoImgs/${dataLogosComprados[
                                  index
                                ].LogoDoacao.img.slice(26)}`)}
                                alt=""
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xs sm:text-sm" >
                      *Após ter comprado uma logo, você pode usá-la como imagem
                      de perfil
                    </h2>
                    {/* Adicione aqui a exibição das logos compradas */}
                  </div>
                </div>
              </ModalShowLogos>

              {selectedLogo && (
                <ModalConfirByLogo
                  open={openModalByLogo}
                  onClose={() => {
                    setOpenModalByLogo(false);
                  }}
                  data={selectedLogo.img}
                  preco={selectedLogo.preco}
                  ong={selectedLogo.ong}
                  id={selectedLogo.id}
                  email={User[0]?.email}
                />
              )}
            </div>
          ) : (
            <h1>Carregando dados do usuário...</h1>
          )}
        </>
      ) : (
        <h1>Você precisa estar logado</h1>
      )}
    </div>
  );
}

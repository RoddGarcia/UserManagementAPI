import useFetch from "use-http";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Popup from "./components/Popup";

function Home() {
  const baseURL = "https://mack-webmobile.vercel.app/api/users";
  const { get, response, del, put, error, loading } = useFetch(baseURL);
  const [users, setUsers] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [popup, setPopup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [salary, setSalary] = useState();
  const [date, setDate] = useState([]);
  const [stts, setStts] = useState();
  const [avatar, setAvatar] = useState();
  const [userID, setUserID] = useState();

  function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const btnHomem = () => {
    setAvatar(
      `https://randomuser.me/api/portraits/men/${numAleatorio(1, 99)}.jpg`
    );
  };

  const btnMulher = () => {
    setAvatar(
      `https://randomuser.me/api/portraits/women/${numAleatorio(1, 99)}.jpg`
    );
  };

  const pesquisar = async () => {
    const resp = await get();
    resp.filter((user) => user.name);
  };

  useEffect(() => {
    buscar();
  }, []);

  const atualizar = async (id) => {
    const user = await get("/" + id);
    setName(user.name);
    setEmail(user.email);
    setSalary(user.salary);
    setDate(user.date);
    setStts(user.status);
    setAvatar(user.avatar);
    setUserID(user._id);
  };

  const substituir = async (e) => {
    e.preventDefault();

    const body = {
      name: name,
      email: email,
      avatar: avatar,
      salary: salary,
      date: date,
      status: stts
    };

    await put("/" + userID, body);
    alert("Usuário alterado com sucesso.");
    buscar();
  };

  const apagar = async (e) => {
    await del("/" + e._id)
      .then(() => alert("Usuário " + e.name + " eliminado."))
      .then(() => window.location.reload(false));
  };

  const buscar = async () => {
    const resp = await get();

    if (response.ok) {
      setUsers(resp);
    } else {
      setUsers([]);
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <>
      <div className="search">
        <input
          className="searchInput"
          type="text"
          placeholder="Pesquisar"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <FaSearch className="search-icon" onClick={pesquisar} />
      </div>

      <div className="cards">
        {users
          .filter((user) => user.name.includes(filtro))
          .map((p) => {
            return (
              <>
                <div className="singleCard">
                  <img id="avatar" src={p.avatar} alt="user's avatar." />
                  <div className="userInfoConfig">
                    <div>
                      <b>{p.name}</b>
                    </div>
                    <div>
                      <b>E-mail</b>:
                    </div>
                    <div>{p.email}</div>
                    <div>
                      <b>Salário</b>:
                    </div>
                    <div> R$ {p.salary} </div>
                    <div>
                      <b>Aniversário</b>:
                    </div>
                    <div>{p.date} </div>
                    <div className="activeStts">
                      {p.status === "Active" ? (
                        <div
                          className="activeStts"
                          style={{ backgroundColor: "green" }}
                        >
                          Active
                        </div>
                      ) : (
                        <div
                          className="activeStts"
                          style={{ backgroundColor: "red" }}
                        >
                          Inactive
                        </div>
                      )}
                    </div>
                    <div className="modBtn">
                      <img
                        id="editUser"
                        src="./edit.png"
                        onClick={() => {
                          atualizar(p._id);
                          setPopup(true);
                        }} // POPUP EDITAR
                        alt="Edit Button"
                      />
                      <img
                        id="delUser"
                        src="./delete.png"
                        onClick={() => apagar(p)}
                        alt="Delete Button"
                      />
                    </div>
                  </div>
                </div>

                <Popup trigger={popup} setTrigger={setPopup}>
                  <div className="singleCard">
                    <img id="avatar" src={avatar} alt="user's avatar." />
                    <div className="userInfoConfig">
                      <div id="name">
                        <b>{name}</b>
                      </div>
                      <div>
                        <b>E-mail</b>:
                      </div>
                      <div>{email}</div>
                      <div>
                        <b>Salário</b>:
                      </div>
                      <div> R$ {salary} </div>
                      <div>
                        <b>Aniversário</b>:
                      </div>
                      <div>{date} </div>
                      <div className="activeStts">
                        {stts === "Active" ? (
                          <div
                            className="activeStts"
                            style={{ backgroundColor: "green" }}
                          >
                            Active
                          </div>
                        ) : (
                          <div
                            className="activeStts"
                            style={{ backgroundColor: "red" }}
                          >
                            Inactive
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <form>
                    <div className="inputArea">
                      <table className="inputTable">
                        <tr>
                          <div className="name">
                            <td id="genderBtns">
                              <p
                                className="btn"
                                type="radio"
                                name="gender"
                                required
                                onClick={btnHomem}
                              >
                                Homem
                              </p>

                              <p
                                className="btn"
                                type="radio"
                                name="gender"
                                required
                                onClick={btnMulher}
                              >
                                Mulher
                              </p>
                            </td>
                            <td>
                              <input
                                id="txtInput"
                                type="text"
                                value={name}
                                placeholder="FirstName"
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <div className="userInfo">
                            <td>
                              <input
                                id="txtInput"
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </td>
                            <td>
                              <input
                                id="txtInput"
                                value={salary}
                                type="text"
                                placeholder="Salary"
                                onChange={(e) => setSalary(e.target.value)}
                                required
                              />
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <div className="userInfo2">
                            <td>
                              <input
                                type="date"
                                value={date}
                                id="birthday"
                                onChange={(e) => setDate(e.target.value)}
                                required
                              />
                            </td>
                            <td>
                              <label>
                                Active
                                <input
                                  type="radio"
                                  name="userStatus"
                                  onClick={() => {
                                    setStts("Active");
                                  }}
                                  required
                                />
                              </label>
                              <label>
                                Inactive
                                <input
                                  type="radio"
                                  name="userStatus"
                                  onClick={() => {
                                    setStts("Inactive");
                                  }}
                                  required
                                />
                              </label>
                            </td>
                          </div>
                        </tr>
                      </table>
                    </div>
                    <button
                      className="btn"
                      onClick={substituir}
                      type="submit"
                      id="submitBtn"
                      style={{ margin: "auto" }}
                    >
                      Enviar
                    </button>
                  </form>
                </Popup>
              </>
            );
          })}
      </div>
    </>
  );
}
export default Home;

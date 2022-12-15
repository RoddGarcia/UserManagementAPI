import { useState, useEffect } from "react";
import axios from "axios";

function AdicionarUsuario() {
  const baseURL = "https://mack-webmobile.vercel.app/api/users";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [salary, setSalary] = useState();
  const [date, setDate] = useState([]);
  const [stts, setStts] = useState();
  const [avatar, setAvatar] = useState();

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

  const enviar = async (e) => {
    e.preventDefault();
    const body = {
      name: firstName + " " + lastName,
      email: email,
      salary: salary,
      status: stts,
      date: date,
      avatar: avatar
    };
    axios
      .post(baseURL, body)
      .then(() => alert("Usuário adicionado com sucesso."))
      .catch((error) => console.log(error.response.data));
  };

  useEffect(() => {
    btnMulher();
  }, []);

  return (
    <>
      <div className="fullPage">
        <div className="addUserBG">
          <div className="singleCard">
            <img id="avatar" src={avatar} alt="user's avatar." />

            <div className="userInfoConfig">
              <div>
                <b>{firstName + " " + lastName}</b>
              </div>
              <div>
                <b>E-mail</b>:
              </div>
              <div>{email}</div>
              <div>
                <b>Salário</b>: R$ {salary}
              </div>
              <div>{date} </div>
              <div className="activeStts" id="userSttsBtn">
                {stts === "Active" ? (
                  <div
                    className="activeStts"
                    style={{ backgroundColor: "green" }}
                  >
                    {stts}{" "}
                  </div>
                ) : (
                  <div
                    className="activeStts"
                    style={{ backgroundColor: "red" }}
                  >
                    {stts}{" "}
                  </div>
                )}
              </div>
              <div className="modBtn">
                <img id="editUser" src="./edit.png" alt="Edit Button" />
                <img id="delUser" src="./delete.png" alt="Delete Button" />
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
                        value={firstName}
                        placeholder="FirstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        id="txtInput"
                        type="text"
                        placeholder="LastName"
                        onChange={(e) => setLastName(e.target.value)}
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
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        id="txtInput"
                        a
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
                          value="Active"
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
              onClick={enviar}
              type="submit"
              id="submitBtn"
              style={{ margin: "auto" }}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdicionarUsuario;

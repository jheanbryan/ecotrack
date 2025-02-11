import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { UserContext } from "../../Context/UserContext";
import { auth } from "../../Config/firebase";

const Logout = () => {
  const { setExp, setAuthTime } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        setExp(0);
        setAuthTime(0);
        navigate("/");
      })
      .catch((err) => {
        const { code, message } = err;
        console.log(code);
        console.log(message);
      });
  }, []);

  return (
    <div>
      <p>Carregando...</p>
    </div>
  );
};

export default Logout;
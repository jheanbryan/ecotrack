import { useContext } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, store } from "../Config/firebase";
import { UserContext } from "../Context/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useUserLogin = () => {
  const navigate = useNavigate();
  const { setAuthTime, setExp, setName, setEmailUser, setPhotoURL, setCep, setAddress } = useContext(UserContext);

  const [signInWithEmailAndPassword, loading] = useSignInWithEmailAndPassword(auth);

  const getUserFromFirestore = async (uid: string) => {
    const userRef = doc(store, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result && result.user) {
        const currentUser = result.user;
        const tokenResult = await currentUser.getIdTokenResult();

        setAuthTime(new Date(tokenResult.authTime).getTime());
        setExp(new Date(tokenResult.expirationTime).getTime());
        setName(currentUser.displayName || "");
        setEmailUser(currentUser.email || "");
        setPhotoURL(currentUser.photoURL || "");

        const userDoc = await getUserFromFirestore(currentUser.uid);
        if (userDoc) {
          setCep(userDoc.cep || "");
          setAddress(userDoc.address || "");
        }

        localStorage.setItem("user", JSON.stringify({
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          authTime: tokenResult.authTime,
          expirationTime: tokenResult.expirationTime,
          cep: userDoc?.cep || "",
          address: userDoc?.address || "",
        }));

        navigate("/home");
      } else {
        throw new Error("Falha na autenticação");
      }
    } catch (error: any) {
      console.error("Erro ao acessar conta:", error);
      if (error.code === "auth/wrong-password") {
        alert("Senha incorreta");
      } else if (error.code === "auth/user-not-found") {
        alert("Usuário não encontrado");
      } else {
        alert("Erro ao fazer login. Por favor, tente novamente.");
      }
    }
  };

  return { handleLogin, loading };
};

export default useUserLogin;

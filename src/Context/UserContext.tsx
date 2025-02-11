import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, store } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

type ConsumptionType = {
  type: string;
  quantity: string;
  unit: string;
  date: string;
};

type UserType = {
  authTime: number;
  exp: number;
  name: string;
  email: string;
  photoURL: string;
  cep: string;
  address: string;
  consumption: ConsumptionType[];
  setAuthTime: (newState: number) => void;
  setExp: (newState: number) => void;
  setName: (newState: string) => void;
  setEmailUser: (newState: string) => void;
  setPhotoURL: (newState: string) => void;
  setCep: (newState: string) => void;
  setAddress: (newState: string) => void;
  setConsumption: (newConsumption: ConsumptionType[]) => void;
  isSessionValid: () => boolean;
};

const initialValue: UserType = {
  authTime: localStorage.getItem("authTime") ? Number(localStorage.getItem("authTime")) : 0,
  exp: localStorage.getItem("exp") ? Number(localStorage.getItem("exp")) : 0,
  name: localStorage.getItem("name") || "",
  email: localStorage.getItem("email") || "",
  photoURL: localStorage.getItem("photoURL") || "",
  cep: localStorage.getItem("cep") || "",
  address: localStorage.getItem("address") || "",
  consumption: JSON.parse(localStorage.getItem("consumption") || "[]"),
  setAuthTime: () => {},
  setExp: () => {},
  setName: () => {},
  setEmailUser: () => {},
  setPhotoURL: () => {},
  setCep: () => {},
  setAddress: () => {},
  setConsumption: () => {},
  isSessionValid: () => false,
};

export const UserContext = createContext(initialValue);

type UserContextProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [authTime, setAuthTime] = useState(initialValue.authTime);
  const [exp, setExp] = useState(initialValue.exp);
  const [name, setName] = useState(initialValue.name);
  const [email, setEmailUser] = useState(initialValue.email);
  const [photoURL, setPhotoURL] = useState(initialValue.photoURL);
  const [cep, setCep] = useState(initialValue.cep);
  const [address, setAddress] = useState(initialValue.address);
  const [consumption, setConsumption] = useState<ConsumptionType[]>(initialValue.consumption);

  useEffect(() => {
    localStorage.setItem("authTime", `${authTime}`);
    localStorage.setItem("exp", `${exp}`);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("photoURL", photoURL);
    localStorage.setItem("cep", cep);
    localStorage.setItem("address", address);
    localStorage.setItem("consumption", JSON.stringify(consumption));
  }, [authTime, exp, name, email, photoURL, cep, address, consumption]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(store, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || "");
          setEmailUser(userData.email || currentUser.email);
          setPhotoURL(userData.photoURL || "");
          setCep(userData.cep || "");
          setAddress(userData.address || "");
          setConsumption(userData.consumption || []);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        authTime,
        exp,
        name,
        email,
        photoURL,
        cep,
        address,
        consumption, 
        setAuthTime,
        setExp,
        setName,
        setEmailUser,
        setPhotoURL,
        setCep,
        setAddress,
        setConsumption, 
        isSessionValid: () => {
          const timestamp = new Date().getTime();
          const diff = exp - timestamp;
          return diff > 0;
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

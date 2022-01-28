import firebase from "firebase/app";
import { createContext, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
interface Iprops {
  children: React.ReactNode;
}
export const userContext = createContext<firebase.User | null>(null);
export default function UserProvider(props: Iprops) {
  const [user, setuser] = useState<firebase.User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      setuser(firebaseUser);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <userContext.Provider value={user}>
          {props.children}
        </userContext.Provider>
      )}
    </>
  );
}

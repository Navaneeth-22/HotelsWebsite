import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Authentication, { IAuthentication } from "./Authentication";

export default function Login() {
  const history = useHistory();

  const onSubmit = async (login: IAuthentication) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(login.email, login.password);
    } catch (error: any) {
      throw error;
    }
  };
  return (
    <>
      <Authentication
        isUserNameVisible={false}
        title={"Welcome to Login Page"}
        onSubmit={onSubmit}
        tertiaryButton={{
          label: "SignUp",
          onClick: () => history.push("/SignUp"),
        }}
        height={"300px"}
      ></Authentication>
    </>
  );
}

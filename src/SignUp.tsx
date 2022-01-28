import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Authentication, { IAuthentication } from "./Authentication";

export default function SignUp() {
  const history = useHistory();

  const onSubmit = async (signUp: IAuthentication) => {
    try {
      const credential = await firebase
        .auth()
        .createUserWithEmailAndPassword(signUp.email, signUp.password);
      await credential.user?.updateProfile({ displayName: signUp.userName });
    } catch (error: any) {
      throw error;
    }
  };
  return (
    <>
      <Authentication
        isUserNameVisible={true}
        title={"Welcome to SignUp Page"}
        onSubmit={onSubmit}
        tertiaryButton={{
          label: "Login",
          onClick: () => history.push("/Login"),
        }}
        height={"250px"}
      ></Authentication>
    </>
  );
}

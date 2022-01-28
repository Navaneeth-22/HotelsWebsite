import firebase from "firebase";
import "firebase/storage";
import { useContext } from "react";
import { userContext } from "./UserProvider";

export default function UpdatePhoto(file: File) {
  const storage = firebase.storage();
  const context = useContext(userContext);
  if (context && context.uid) {
    storage
      .ref()
      .child("user-profiles")
      .child(context?.uid)
      .child(file.name)
      .put(file)
      .then((response) => response.ref.getDownloadURL())
      .then((photoURL) => context.updateProfile({ photoURL }));
  }
}

import { useHistory } from "react-router";

export default function ComponentA() {
  const history = useHistory();
  return (
    <>
      <div>hello component A!</div>
      <button onClick={() => history.push("/b")}>go to page b</button>
    </>
  );
}

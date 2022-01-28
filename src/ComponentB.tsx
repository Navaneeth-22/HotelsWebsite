import { useHistory } from "react-router";

export default function ComponentB() {
  const history = useHistory();
  return (
    <>
      <div>welcome to ComponentB</div>
      <button onClick={() => history.goBack()}>go back</button>
    </>
  );
}

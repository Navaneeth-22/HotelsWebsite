import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser, completed, started } from "./UserSlice";
import { AppState } from "./AppState";
import { Grid } from "@material-ui/core";
export default function SliceUI() {
  const dispatch = useDispatch();
  const users: IUser[] = useSelector((state: AppState) => state.UserSlice);
  useEffect(() => {
    async function api() {
      const response = await fetch("https://reqres.in/api/users");
      const json = await response.json();
      dispatch(completed(json.data));
    }
    dispatch(started());
    api();
  }, []);

  return (
    <Grid container spacing={2}>
      {users.map(renderUser)}
    </Grid>
  );

  function renderUser(user: IUser): JSX.Element {
    return (
      <Grid item xs={4} key={user.id}>
        <div>
          <img src={user.avatar} />
          <div>{user.first_name}</div>
        </div>
      </Grid>
    );
  }
}

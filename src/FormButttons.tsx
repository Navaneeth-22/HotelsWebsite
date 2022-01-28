import { Fab, makeStyles, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";
interface IButtonItems {
  label: string;
  onClick: () => void;
}
interface Iprops {
  primary: IButtonItems;
  secondary: IButtonItems;
  tertiary: IButtonItems;
}
const useStyles = makeStyles<Theme, {}>({
  buttons2: {
    margin: "0 10px",
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default function FormButtons(props: Iprops) {
  const history = useHistory();

  const styles = useStyles();
  return (
    <div className={styles.buttons}>
      <Fab
        type="submit"
        variant="extended"
        color="primary"
        className={styles.buttons2}
        onClick={props.primary.onClick}
      >
        {props.primary.label}{" "}
      </Fab>
      <Fab
        onClick={props.secondary.onClick}
        variant="extended"
        color="secondary"
        className={styles.buttons2}
      >
        {props.secondary.label}
      </Fab>
      <Fab
        onClick={props.tertiary.onClick}
        variant="extended"
        color="secondary"
        className={styles.buttons2}
      >
        {props.tertiary.label}
      </Fab>
      <Fab
        onClick={() => history.push("/Home")}
        variant="extended"
        color="secondary"
        className={styles.buttons2}
      >
        {"Home"}
      </Fab>
    </div>
  );
}

import { makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./App.css";
import FormButtons from "./FormButttons";
import LoadingSpinner from "./LoadingSpinner";

export interface IAuthentication {
  email: string;
  password: string;
  userName: string;
  photoURL: any;
}
interface IProps {
  isUserNameVisible: boolean;
  title: string;
  onSubmit: (login: IAuthentication) => void;
  tertiaryButton: {
    label: string;
    onClick: () => void;
  };
  height: string;
}
const useStyles = makeStyles<Theme, IProps>({
  container: {
    height: (props) => props.height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  outerDiv: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerDiv: {
    width: "80%",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  title: {
    textAlign: "center",
  },
  buttons2: {
    margin: "0 10px",
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  labelText: {
    margin: "5px 0",
  },
  errorMessage: {
    color: "red",
  },
});

export default function Authentication(props: IProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthentication>();
  const history = useHistory();
  const styles = useStyles(props);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onSubmit = async (data: IAuthentication) => {
    try {
      setLoading(true);
      await props.onSubmit(data);
      reset();
      history.push("/");
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        <Typography variant="h3" className={styles.title}>
          {props.title}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          {props.isUserNameVisible && (
            <TextField
              {...register("userName")}
              variant="outlined"
              id="username"
              label="UserName"
              placeholder="UserName"
              required={true}
              error={errors && errors.userName?.message ? true : false}
              helperText={errors.userName?.message}
            />
          )}

          <TextField
            type="email"
            {...register("email", {
              pattern: {
                value: /\w+@\w+\.\w+/,
                message: "pattern did not match",
              },
            })}
            variant="outlined"
            id="emailAddress"
            label="EmailAddress"
            placeholder="EmailAddress"
            required={true}
            error={errors && errors.email?.message ? true : false}
            helperText={errors.email?.message}
          />

          <TextField
            type="password"
            {...register("password", {
              minLength: {
                value: 4,
                message: "password should be min of lenght 4",
              },
              maxLength: {
                value: 8,
                message: "password should be max of lenght 8",
              },
            })}
            variant="outlined"
            id="password"
            label="Password"
            placeholder="Password"
            required={true}
            error={errors && errors.password?.message ? true : false}
            helperText={errors.password?.message}
          />

          <FormButtons
            primary={{
              label: "Submit",
              onClick: () => console.log("submit button is invoked"),
            }}
            secondary={{
              label: "Reset",
              onClick: () => reset(),
            }}
            tertiary={props.tertiaryButton}
          />
        </form>
        {isLoading && <LoadingSpinner />}
        {errorMessage && (
          <Typography variant="h4" className={styles.errorMessage}>
            {errorMessage}
          </Typography>
        )}
      </div>
    </div>
  );
}

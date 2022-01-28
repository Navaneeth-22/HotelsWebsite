import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  email: string;
  password: string;
}

export default function HooksUI() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const myCallBack = (data: IForm) => {
    console.log(
      "my callback got invoked" + data.name + data.email + data.password
    );
  };
  return (
    <form onSubmit={handleSubmit(myCallBack)}>
      <input
        type="text"
        placeholder="name"
        {...register("name", {
          required: true,
          minLength: { value: 4, message: "name should be min of lenght 4" },
          maxLength: { value: 8, message: "name should be max of lenght 8" },
        })}
      />
      {errors.name?.message && <div>{errors.name.message}</div>}
      <input
        type="email"
        placeholder="email"
        {...register("email", {
          required: true,
          pattern: { value: /\w+@\w+\.\w+/, message: "pattern did not match" },
        })}
      />
      {errors.email?.message && <div>{errors.email.message}</div>}
      <input type="password" placeholder="password" {...register("password")} />
      <button onClick={() => reset()}>reset</button>
      <button>submit</button>
    </form>
  );
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IStatusizedUser {
  users: IUser[];
  loading: boolean;
}

interface IUserAction {
  type: string;
  payload: IUser[];
}

export const UserReducer = (
  state: IStatusizedUser,
  action: IUserAction
): IStatusizedUser => {
  switch (action.type) {
    case "started":
      return { ...state, loading: true };
    case "completed":
      return { ...state, users: action.payload, loading: false };
  }
  return { loading: true, users: [] };
};

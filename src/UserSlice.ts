import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: new Array<IUser>(),
  reducers: {
    completed(_state: IUser[], action: PayloadAction<IUser[]>) {
      return action.payload;
    },
    started(_state: IUser[]) {
      return [];
    },
  },
});

export const { completed, started } = UserSlice.actions;

export default UserSlice.reducer;

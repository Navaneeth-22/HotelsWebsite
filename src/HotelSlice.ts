import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IHotels {
  name: string;
  cuisines: string;
  featured_image: string;
  id: string;
}

const HotelSlice = createSlice({
  name: "HotelSlice",
  initialState: new Array<IHotels>(),
  reducers: {
    completed(state: IHotels[], action: PayloadAction<IHotels[]>): IHotels[] {
      return action.payload;
    },
    started(state: IHotels[]) {
      return [];
    },
  },
});

export const { completed, started } = HotelSlice.actions;
export default HotelSlice.reducer;

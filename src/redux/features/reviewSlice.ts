import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Review = {
  rating: number;
  feedback: string;
};

interface ReviewState {
  reviews: Review[];
  averageRating: number;
}

const initialState: ReviewState = {
  reviews: [],
  averageRating: 0,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
      const totalRating = state.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      state.averageRating = totalRating / state.reviews.length;
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;

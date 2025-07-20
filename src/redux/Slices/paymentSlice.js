import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const makeDummyPayment = createAsyncThunk(
  "payment/makeDummyPayment",
  async (paymentData, thunkAPI) => {
    console.log(paymentData)
    try {
      const response = await axios.post("http://localhost:4000/api/v1/bookings/payment", {
        totalCost : paymentData.totalCost,
        userId : paymentData.userId,
        bookingid : paymentData.bookingid 
       },
       {
         headers: {
           "x-idempotency-key": "12323565354"
         }
       }
      );
      return response.data; 
    } catch (error) {
      console.log(error)
      const message =
        error.response?.data?.message || "Payment failed. Try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    success: false,
    paymentInfo: null,
    error: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.success = false;
      state.paymentInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeDummyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeDummyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentInfo = action.payload;
      })
      .addCase(makeDummyPayment.rejected, (state) => {
        state.loading = false;
        state.error = "Payment failed. Try again.";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

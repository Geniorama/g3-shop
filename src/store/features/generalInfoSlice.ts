import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { ContactInfo, SocialMediaItem } from "@/types";

type InitialProps = {
  contactInfo: ContactInfo | null;
  socialMedia?: SocialMediaItem[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialProps = {
  contactInfo: null,
  loading: false,
  error: null,
  socialMedia: [],
};


const generalInfoSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setContactInfo: (
      state,
      action: PayloadAction<InitialProps["contactInfo"]>
    ) => {
      state.contactInfo = action.payload;
    },
    setSocialMedia: (state, action: PayloadAction<SocialMediaItem[]>) => {
      state.socialMedia = action.payload;
    },
  },
});

export const { setContactInfo, setSocialMedia } = generalInfoSlice.actions;
export default generalInfoSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ContactInfo, SocialMediaItem } from "@/types";

type InitialProps = {
  contactInfo: ContactInfo | null;
  socialMedia?: SocialMediaItem[];
  projectsLink?: string;
  loading: boolean;
  error: string | null;
};

const initialState: InitialProps = {
  contactInfo: null,
  loading: false,
  error: null,
  socialMedia: [],
  projectsLink: ''
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

    setProjectsLink:(state, action: PayloadAction<string>) => {
      state.projectsLink = action.payload
    },

    setData:(state, action:PayloadAction<InitialProps>) => {
      state = action.payload
    }
  },
});

export const { setContactInfo, setSocialMedia, setData } = generalInfoSlice.actions;
export default generalInfoSlice.reducer;

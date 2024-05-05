import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { JD, JDList } from 'libs/types/jobDescription';

export interface JobListingsState {
  limit: number;
  offset: number;
  jobs: JD[] | null;
  hasMoreJobs: boolean;
  isFetching: boolean;
  isError: boolean;
  totalNoOfJobs: number | null;
}

const initialState: JobListingsState = {
  limit: 9,
  offset: 0,
  jobs: null,
  hasMoreJobs: false,
  isError: false,
  isFetching: false,
  totalNoOfJobs: null,
};

export const jobListingsSlice = createSlice({
  name: 'jobListings',
  initialState,
  reducers: {
    setOffset: (state, data: PayloadAction<number>) => {
      state.offset = data.payload;
    },

    setIsFetching: (state, data: PayloadAction<boolean>) => {
      state.isFetching = data.payload;
    },

    setIsError: (state, data: PayloadAction<boolean>) => {
      state.isError = data.payload;
    },

    setJobs: (state, data: PayloadAction<JDList>) => {
      state.jobs = state.jobs?.length ? [...state.jobs, ...data.payload.jdList] : data.payload.jdList;
      state.totalNoOfJobs = data.payload.totalCount;
      state.hasMoreJobs = state.jobs.length < state.totalNoOfJobs ? true : false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOffset, setIsFetching, setIsError, setJobs } = jobListingsSlice.actions;

export default jobListingsSlice.reducer;

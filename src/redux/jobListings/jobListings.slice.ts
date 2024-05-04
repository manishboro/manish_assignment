import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { JD } from '../../libs/types/jobDescription';

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
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = jobListingsSlice.actions;

export default jobListingsSlice.reducer;

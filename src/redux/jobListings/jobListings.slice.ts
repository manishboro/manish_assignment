import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { JD, JDList, SelectedFilterType } from 'libs/types/jobDescription';

export interface JobListingsState {
  limit: number;
  offset: number;
  jobs: JD[] | null;
  jobsFiltered: JD[] | null;
  hasMoreJobs: boolean;
  isFetching: boolean;
  isError: boolean;
  totalNoOfJobs: number | null;
  filtersApplied: {
    [key: string]: SelectedFilterType;
  };
}

const initialState: JobListingsState = {
  limit: 9,
  offset: 0,
  jobs: null,
  jobsFiltered: null,
  hasMoreJobs: false,
  isError: false,
  isFetching: false,
  totalNoOfJobs: null,
  filtersApplied: {},
};

/*
  filtersApplied: {
    roles: { type: "filter", "multiple": true, value: ["frontend", "ios", ...] },
    min_exp: { type: "filter", "multiple": false, value: [2] },
    workplace: { type: "filter", "multiple": true, value: ["remote", "hybrid", ...] },
    tech_stack: { type: "filter", "multiple": true, value: ["python", "javascript", ...] },
    min_base_pay: { type: "filter", "multiple": false, value: [10] },
    location: { type: "search", value: "" },
    company_name: { type: "search", value: "" }
  }
*/

const applyFilters = (jobs: JD[], filtersApplied: { [key: string]: SelectedFilterType }) => {
  let _jobs: JD[] = [...jobs];

  Object.keys(filtersApplied).forEach((filterKey) => {
    const currentFilter = filtersApplied[filterKey];

    if (currentFilter.type === 'filter' && Array.isArray(currentFilter.value)) {
      if (currentFilter.multiple) {
        // For filters, where only multiple options can be selected
        _jobs = _jobs.filter((job) =>
          // @ts-ignore
          !currentFilter.value.length ? true : currentFilter.value.some((selectedOption: any) => selectedOption.value == job[filterKey])
        );
      } else {
        // For filters, where only one option can be selected
        // @ts-ignore
        _jobs = _jobs.filter((job) => (!currentFilter.value.length ? true : job[filterKey] == currentFilter.value[0].value));
      }
    }

    if (currentFilter.type === 'search') {
      // @ts-ignore
      _jobs = _jobs.filter((job) => job[filterKey].toLowerCase().includes(currentFilter.value.toLowerCase()));
    }
  });

  return _jobs;
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

      // If no filters are applied even once, then return null so that jobs are shown from "jobs" state
      state.jobsFiltered = Object.keys(state.filtersApplied).length ? applyFilters(state.jobs, state.filtersApplied) : null;
    },

    setFilters: (state, data: PayloadAction<SelectedFilterType>) => {
      const { key, type, multiple, value } = data.payload;

      // This is to make sure we apply filter on all the jobs
      let jobsCopy: JD[] = Array.isArray(state.jobs) ? [...state.jobs] : [];

      state.filtersApplied = {
        ...state.filtersApplied,
        [key]: { ...state.filtersApplied[key], type, multiple, value },
      };

      state.jobsFiltered = applyFilters(jobsCopy, state.filtersApplied);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, setOffset, setIsFetching, setIsError, setJobs } = jobListingsSlice.actions;

export default jobListingsSlice.reducer;

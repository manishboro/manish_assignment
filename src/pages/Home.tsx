import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, CircularProgress, Container } from '@mui/material';

import MessageBox from 'components/MessageBox';
import JobListingCard from 'components/JobListingCard';
import Filters from 'components/Filters';
import { useFetch } from 'hooks/useFetch';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { JDList } from 'libs/types/jobDescription';
import { RootState } from 'redux/store';
import { setIsError, setIsFetching, setJobs, setOffset } from 'redux/jobListings/jobListings.slice';

const Home = () => {
  const dispatch = useDispatch();
  const { limit, offset, isFetching, isError, jobs, jobsFiltered, hasMoreJobs } = useSelector((state: RootState) => state.jobListingsReducer);

  const _jobs = useMemo(() => jobsFiltered ?? jobs, [jobs, jobsFiltered]);

  useFetch<JDList>({
    url: `https://api.weekday.technology/adhoc/getSampleJdJSON`,
    method: 'POST',
    body: { limit, offset },
    dependencies: [offset],
    onInit: () => {
      dispatch(setIsFetching(true));
      dispatch(setIsError(false));
    },
    onSuccess: (data) => {
      dispatch(setJobs(data));
    },
    onError: () => {
      dispatch(setIsError(true));
    },
    onFinally: () => {
      dispatch(setIsFetching(false));
    },
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({}, []);

  useEffect(() => {
    if (isIntersecting && !isFetching && hasMoreJobs) {
      const nextOffset = offset + limit;
      dispatch(setOffset(nextOffset));
    }
  }, [isIntersecting]);

  return (
    <>
      <Filters />

      <Container maxWidth="lg" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {isError ? (
          <MessageBox message="Failed to fetch." />
        ) : isFetching && !_jobs?.length ? (
          <Box sx={{ margin: 'auto', width: 'max-content' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              gap: '2rem',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {Array.isArray(_jobs) ? (
              _jobs.length ? (
                _jobs.map((jd) => <JobListingCard key={jd.jdUid} data={jd} />)
              ) : (
                <MessageBox message="No jobs found" />
              )
            ) : null}
          </Box>
        )}

        {_jobs?.length && hasMoreJobs ? (
          <Box ref={targetRef} sx={{ padding: '3rem' }}>
            <MessageBox message="Fetching more jobs..." />
          </Box>
        ) : null}
      </Container>
    </>
  );
};

export default Home;

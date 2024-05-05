import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, CircularProgress, Container } from '@mui/material';

import MessageBox from 'components/MessageBox';
import JobListingCard from 'components/JobListingCard';
import { useFetch } from 'hooks/useFetch';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { JDList } from 'libs/types/jobDescription';
import { RootState } from 'redux/store';
import { setIsError, setIsFetching, setJobs, setOffset } from 'redux/jobListings/jobListings.slice';

const Home = () => {
  const dispatch = useDispatch();
  const { limit, offset, isFetching, isError, jobs, hasMoreJobs } = useSelector((state: RootState) => state.jobListingsReducer);

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
    if (isIntersecting && !isFetching) {
      const nextOffset = offset + limit;
      dispatch(setOffset(nextOffset));
    }
  }, [isIntersecting]);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {isError ? (
        <MessageBox message="Failed to fetch." />
      ) : isFetching && !jobs?.length ? (
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
          {Array.isArray(jobs) ? jobs.length ? jobs.map((jd) => <JobListingCard key={jd.jdUid} data={jd} />) : <MessageBox message="No jobs found" /> : null}
        </Box>
      )}

      {jobs?.length && hasMoreJobs && (
        <Box ref={targetRef} sx={{ padding: '3rem' }}>
          <MessageBox message="Fetching more jobs..." />
        </Box>
      )}
    </Container>
  );
};

export default Home;

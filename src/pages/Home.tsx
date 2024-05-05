import { Box, CircularProgress, Container } from '@mui/material';

import { useFetch } from 'hooks/useFetch';
import { JDList } from 'libs/types/jobDescription';

const Home = () => {
  const { data, isError, isFetching } = useFetch<JDList>({
    url: `https://api.weekday.technology/adhoc/getSampleJdJSON`,
    method: 'POST',
    body: { limit: 10, offset: 0 },
  });

  console.log('data', data);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {isError ? (
        <Box>Failed to fetch.</Box>
      ) : isFetching && !data?.jdList.length ? (
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
          {Array.isArray(data?.jdList) ? (
            data.jdList.length ? (
              data.jdList.map((jd) => <Box key={jd.jdUid}>{jd.companyName}</Box>)
            ) : (
              <Box>No jobs found</Box>
            )
          ) : null}
        </Box>
      )}
    </Container>
  );
};

export default Home;

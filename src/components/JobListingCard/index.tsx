import { Box } from '@mui/material';

import ImagePlaceholder from 'assets/image_placeholder.png';
import Avatar from 'components/Avatar';
import { JD } from 'libs/types/jobDescription';

interface JobListingCardProps {
  data: JD;
}

const JobListingCard = ({ data }: JobListingCardProps) => {
  return (
    <Box
      sx={{
        width: '33rem',
        boxShadow: 3,
        padding: '2rem',
        borderRadius: '2rem',
        height: '55rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform .2s',

        '&:hover': {
          transform: 'scale(1.025)',
        },
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Avatar size="lg" imageUrl={data?.logoUrl ?? ImagePlaceholder} />

          <Box>
            {data.companyName && (
              <Box
                sx={{
                  typography: 'subtitle2',
                  fontWeight: 600,
                  color: 'custom.grey_2',
                }}
              >
                {data.companyName}
              </Box>
            )}

            {data.jobRole && <Box sx={{ typography: 'body2', textTransform: 'capitalize' }}>{data.jobRole}</Box>}

            {data.location && <Box sx={{ typography: 'subtitle2', textTransform: 'capitalize' }}>{data.location}</Box>}
          </Box>
        </Box>

        {data.maxJdSalary || data.minJdSalary ? (
          <Box
            sx={{
              marginTop: '1rem',
              typography: 'subtitle2',
              color: 'custom.grey_2',
            }}
          >
            {data.maxJdSalary && data.minJdSalary ? (
              <Box>
                Estimated Salary: {data.minJdSalary}k - {data.maxJdSalary}k {data.salaryCurrencyCode} ✅
              </Box>
            ) : data.minJdSalary ? (
              <Box>
                Minimum Salary: {data.minJdSalary}k {data.salaryCurrencyCode} ✅
              </Box>
            ) : data.maxJdSalary ? (
              <Box>
                Maximum Salary: {data.maxJdSalary}k {data.salaryCurrencyCode} ✅
              </Box>
            ) : null}
          </Box>
        ) : null}

        <Box sx={{ marginTop: '1rem', position: 'relative' }}>
          <Box sx={{ typography: 'body2' }}>About Company</Box>

          <Box
            sx={{
              marginTop: '1rem',
              typography: 'subtitle2',
              maxHeight: '17rem',
              overflow: 'hidden',
              color: 'custom.grey_1',
              maskImage: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0));',
            }}
          >
            {data.jobDetailsFromCompany}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: '-1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              typography: 'subtitle1',
              cursor: 'pointer',
              color: '#4943da',
            }}
          >
            View Job
          </Box>
        </Box>
      </Box>

      {typeof data.minExp === 'number' && (
        <Box>
          <Box sx={{ typography: 'subtitle2', color: 'custom.grey_2' }}>Minimum Experience</Box>
          <Box sx={{ typography: 'subtitle1' }}>
            {data.minExp} {data.minExp === 1 ? 'year' : 'years'}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default JobListingCard;

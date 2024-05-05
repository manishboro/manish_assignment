import { Box } from '@mui/material';

import CustomMenu from 'components/CustomMenu';
import { rolesData } from 'constants/filterData';

const Filters = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '4rem',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <CustomMenu label="Roles" placeholder="Roles" menuItems={rolesData} multiple={true} />
    </Box>
  );
};

export default Filters;

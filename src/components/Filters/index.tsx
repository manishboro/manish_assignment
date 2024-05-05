import { Box } from '@mui/material';

import CustomMenu from 'components/CustomMenu';
import Searchbar from 'components/Searchbar';
import { experienceData, minBasePayData, rolesData, techStackData, workplaceTypeData } from 'constants/filterData';

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
      <CustomMenu label="Min Experience" placeholder="Min Experience" menuItems={experienceData} />
      <CustomMenu label="Workplace" placeholder="Remote" menuItems={workplaceTypeData} multiple={true} />
      <CustomMenu label="Tech Stack" placeholder="Tech Stack" menuItems={techStackData} multiple={true} />
      <CustomMenu label="Min Base Pay" placeholder="Min Base Pay" menuItems={minBasePayData} />
      <Searchbar label="Location" placeholder="Location" />
      <Searchbar label="Company Name" placeholder="Company Name" />
    </Box>
  );
};

export default Filters;

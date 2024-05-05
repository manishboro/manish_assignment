import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import Searchbar from 'components/Searchbar';
import CustomMenu from 'components/CustomMenu';
import { setFilters } from 'redux/jobListings/jobListings.slice';
import { experienceData, minBasePayData, rolesData, techStackData, workplaceTypeData } from 'constants/filterData';

const Filters = () => {
  const dispatch = useDispatch();

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
      <CustomMenu
        id="jobRole"
        label="Roles"
        placeholder="Roles"
        menuItems={rolesData}
        multiple={true}
        onMenuItemSelect={({ key, type, multiple, value }) => {
          dispatch(setFilters({ key, type, multiple, value }));
        }}
      />

      <CustomMenu
        id="minExp"
        label="Min Experience"
        placeholder="Min Experience"
        menuItems={experienceData}
        onMenuItemSelect={({ key, type, multiple, value }) => {
          dispatch(setFilters({ key, type, multiple, value }));
        }}
      />

      <CustomMenu
        id="workplace"
        label="Workplace"
        placeholder="Remote"
        menuItems={workplaceTypeData}
        multiple={true}
        onMenuItemSelect={({ key, type, multiple, value }) => {
          dispatch(setFilters({ key, type, multiple, value }));
        }}
      />

      <CustomMenu
        id="techStack"
        label="Tech Stack"
        placeholder="Tech Stack"
        menuItems={techStackData}
        multiple={true}
        onMenuItemSelect={({ key, type, multiple, value }) => {
          dispatch(setFilters({ key, type, multiple, value }));
        }}
      />

      <CustomMenu
        id="minJdSalary"
        label="Min Base Pay"
        placeholder="Min Base Pay"
        menuItems={minBasePayData}
        onMenuItemSelect={({ key, type, multiple, value }) => {
          dispatch(setFilters({ key, type, multiple, value }));
        }}
      />

      <Searchbar label="Location" placeholder="Location" />

      <Searchbar label="Company Name" placeholder="Company Name" />
    </Box>
  );
};

export default Filters;

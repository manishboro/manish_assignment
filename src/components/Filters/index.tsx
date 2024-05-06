import { useDispatch, useSelector } from 'react-redux';

import { Box, Container } from '@mui/material';

import Searchbar from 'components/Searchbar';
import CustomMenu from 'components/CustomMenu';
import { setFilters } from 'redux/jobListings/jobListings.slice';
import { experienceData, minBasePayData, rolesData, techStackData, workplaceTypeData } from 'constants/filterData';
import { RootState } from 'redux/store';

const Filters = () => {
  const dispatch = useDispatch();
  const { filtersApplied } = useSelector((state: RootState) => state.jobListingsReducer);

  return (
    <Box
      sx={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #dcdcdc',
        position: 'sticky',
        top: 0,
        bgcolor: 'white',
        zIndex: 10,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
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
          moveMenuWithScrolling={false}
          selectedFilterValues={filtersApplied['jobRole']?.value}
          onMenuItemSelect={({ key, type, multiple, value }) => {
            dispatch(setFilters({ key, type, multiple, value }));
          }}
        />

        <CustomMenu
          id="minExp"
          label="Min Experience"
          placeholder="Min Experience"
          menuItems={experienceData}
          moveMenuWithScrolling={false}
          selectedFilterValues={filtersApplied['minExp']?.value}
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
          moveMenuWithScrolling={false}
          selectedFilterValues={filtersApplied['workplace']?.value}
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
          moveMenuWithScrolling={false}
          selectedFilterValues={filtersApplied['techStack']?.value}
          onMenuItemSelect={({ key, type, multiple, value }) => {
            dispatch(setFilters({ key, type, multiple, value }));
          }}
        />

        <CustomMenu
          id="minJdSalary"
          label="Min Base Pay"
          placeholder="Min Base Pay"
          menuItems={minBasePayData}
          moveMenuWithScrolling={false}
          selectedFilterValues={filtersApplied['minJdSalary']?.value}
          onMenuItemSelect={({ key, type, multiple, value }) => {
            dispatch(setFilters({ key, type, multiple, value }));
          }}
        />

        <Searchbar
          label="Location"
          placeholder="Location"
          handleChange={(value) => dispatch(setFilters({ key: 'location', type: 'search', value }))}
        />

        <Searchbar
          label="Company Name"
          placeholder="Company Name"
          handleChange={(value) => dispatch(setFilters({ key: 'companyName', type: 'search', value }))}
        />
      </Container>
    </Box>
  );
};

export default Filters;

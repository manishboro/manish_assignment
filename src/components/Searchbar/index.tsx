import { Box, useTheme } from '@mui/material';

interface SearchbarProps {
  label?: string;
  placeholder?: string;
  handleChange: (value: string) => void;
}

const Searchbar = ({ label, placeholder, handleChange }: SearchbarProps) => {
  const theme = useTheme();

  return (
    <Box>
      {label ? (
        <Box component="label" sx={{ typography: 'subtitle2', color: 'custom.grey_1' }}>
          {label}
        </Box>
      ) : null}

      <Box
        component="input"
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          border: `1px solid ${theme.palette.custom.grey_3}`,
          width: 'max-content',
          borderRadius: '.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
          minWidth: '12rem',
          padding: '1rem',
          typography: 'subtitle2',

          '&::placeholder': { fontSize: '1.3rem', color: 'custom.grey_2' },
        }}
      />
    </Box>
  );
};

export default Searchbar;

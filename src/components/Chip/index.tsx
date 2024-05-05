import { Close } from '@mui/icons-material';
import { Box } from '@mui/material';

interface ChipProps {
  displayText: string;
  handleDelete: () => void;
}

const Chip = ({ displayText, handleDelete }: ChipProps) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        padding: '.25rem .5rem',
        color: 'black',
        bgcolor: 'custom.grey_3',
        borderRadius: '.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '.25rem',
      }}
    >
      {displayText}
      <Close
        sx={{ fontSize: '1rem', '&:hover': { color: 'red' } }}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      />
    </Box>
  );
};

export default Chip;

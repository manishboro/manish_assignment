import { Box, IconButton, SxProps, Theme, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalContentWrapperProps {
  heading: string;
  children: React.ReactNode;
  rootStyles?: SxProps<Theme> | undefined;
  contentStyles?: SxProps<Theme> | undefined;
  handleModalClose: () => void;
}

const ModalContentWrapper = ({
  heading,
  children,
  rootStyles = {},
  contentStyles = {},
  handleModalClose,
}: ModalContentWrapperProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "70rem",
        bgcolor: "custom.white",
        borderRadius: "1rem",
        maxHeight: "90vh",
        height: "40rem",

        "@media (max-width:700px)": {
          width: "95vw",
        },

        ...rootStyles,
      }}
    >
      <Box
        sx={{
          height: "6rem",
          padding: "0 2rem",
          typography: "h3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.custom.grey_3}`,
          fontWeight: 600,
        }}
      >
        {heading}

        <IconButton onClick={handleModalClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: "2rem",
          overflow: "auto",
          height: "calc(100% - 6rem - 1px)",
          ...contentStyles,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ModalContentWrapper;

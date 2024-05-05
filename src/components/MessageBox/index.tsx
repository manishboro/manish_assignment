import { SxProps, Theme, Typography } from "@mui/material";

interface MessageBoxProps {
  message: string;
  rootStyles?: SxProps<Theme> | undefined;
}

const MessageBox = ({ rootStyles = {}, message }: MessageBoxProps) => {
  return (
    <Typography
      sx={{
        typography: "body1",
        textAlign: "center",
        fontWeight: 600,

        ...rootStyles,
      }}
    >
      {message}
    </Typography>
  );
};

export default MessageBox;

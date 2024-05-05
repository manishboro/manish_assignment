import { Button, ButtonProps, SxProps, Theme } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  rootStyles?: SxProps<Theme> | undefined;
}

const CustomButton = ({
  children,
  rootStyles = {},
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      sx={{
        width: "100%",
        borderRadius: ".75rem",
        color: "black",
        textTransform: "none",
        padding: ".8rem 1.8rem",
        ...rootStyles,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

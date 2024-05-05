import { Box, SxProps, Theme } from "@mui/material";

interface AvatarProps {
  size?: "default" | "sm" | "md" | "lg";
  imageUrl?: string;
  rootStyles?: SxProps<Theme> | undefined;
}

const getHeightWidth = (size: "default" | "sm" | "md" | "lg") => {
  if (size === "default") return { height: "5rem", width: "5rem" };
  if (size === "sm") return { height: "3rem", width: "3rem" };
  if (size === "md") return { height: "6rem", width: "6rem" };
  if (size === "lg") return { height: "7rem", width: "7rem" };
};

const Avatar = ({
  size = "default",
  imageUrl,
  rootStyles = {},
}: AvatarProps) => {
  return (
    <Box
      sx={{
        ...getHeightWidth(size),
        bgcolor: "custom.grey_3",
        borderRadius: "50%",
        overflow: "hidden",
        ...rootStyles,
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : null}
    </Box>
  );
};

export default Avatar;

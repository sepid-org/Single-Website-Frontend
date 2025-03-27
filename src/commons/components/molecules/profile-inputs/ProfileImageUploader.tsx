import React, { useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useUploadFileWithProgress } from "commons/hooks/useUploadFileWithProgress";

const ProfileImageUploader = ({ file, setFile }) => {
  const theme = useTheme();
  const { uploadFile, result, progress } = useUploadFileWithProgress();


  const validateFile = (file) => {
    if (file.name.length > 100) {
      toast.error("حداکثر طول نام فایل حداکثر ۱۰۰ کاراکتر است.");
      return false;
    }
    if (file.size >= 4e6) {
      toast.error("حداکثر حجم فایل ۳ مگابایت است.");
      return false;
    }
    return true;
  };

  const handleUploadFile = (event) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];
    if (!validateFile(file)) return;
    uploadFile({ file });
  };

  useEffect(() => {
    if (result.data) {
      setFile(result.data.file);
    }
  }, [result]);

  return (
    <Box
      sx={{
        width: { xs: 150, sm: 200 },
        height: { xs: 150, sm: 200 },
        cursor: "pointer",
      }}
    >
      {!file ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            border: "2px dashed",
            borderColor: theme.palette.primary.main,
            borderRadius: 1,
          }}
        >
          <Button
            sx={{
              width: "100%",
              height: "100%",
              color: theme.palette.primary.main,
            }}
            disabled={result.isLoading}
            endIcon={
              progress && (
                <CircularProgress
                  color="secondary"
                  thickness={4}
                  size={24}
                  variant="determinate"
                  value={progress}
                />
              )
            }
            onClick={() => document.getElementById("userProfilePicture").click()}
          >
            {"+ افزودن تصویر"}
          </Button>
          <input
            type="file"
            id="userProfilePicture"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleUploadFile}
          />
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={file}
            width="100%"
            height="100%"
            sx={{ borderRadius: 1, objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0,
              transition: "opacity 0.3s",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Button
              sx={{
                fontWeight: 800,
                width: "100%",
                height: "100%",
                color: theme.palette.primary.main,
              }}
              disabled={result.isLoading}
              endIcon={
                progress && (
                  <CircularProgress
                    color="secondary"
                    thickness={4}
                    size={24}
                    variant="determinate"
                    value={progress}
                  />
                )
              }
              color="primary"
              onClick={() => document.getElementById("userProfilePicture").click()}
            >
              {"تغییر تصویر"}
            </Button>
          </Box>
          <input
            type="file"
            id="userProfilePicture"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleUploadFile}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProfileImageUploader;
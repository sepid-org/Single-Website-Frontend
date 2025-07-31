import React, { FC, Fragment, useCallback, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import ScrollableStack from "commons/components/organisms/ScrollableStack";

interface ProfileImageSelectorProps {
  profileImage: string;
  onChange: (src: string) => void;
  onValidationChange: (isValid: boolean) => void;
  displayEmptyErrorMessage?: boolean;
  options?: string[];
}


/* ----------‌ استایل‌ها ---------- */

/** لایهٔ بیرونی (حاشیه) */
const BorderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 160,
  height: 160,
  padding: 4, // ضخامت حاشیه
  borderRadius: "50%",
  cursor: "pointer",
  /* گرادیان حاشیه فقط روی آیتم انتخاب-شده */
  background: selected
    ? "linear-gradient(to right, #FE9C42, #E25100)"
    : "transparent",
}));


/** لایهٔ داخلی (پس‌زمینهٔ خاکستری) */
const Inner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: selected ? "#F2F2F2" /* خاکستری */ : "transparent",
}));


/* ----------‌ کامپوننت ---------- */
const AvatarSelector: FC<ProfileImageSelectorProps> = ({
  profileImage,
  onChange,
  onValidationChange,
  displayEmptyErrorMessage = false,
  options = [1, 2, 3, 4].map(
    (i) =>
      `https://cdn.sepid.org/cms/files/parvande-zamingir-profile-image-${i}.png`,
  ),
}) => {
  useEffect(() => onValidationChange(!!profileImage), [profileImage]);

  const handleSelect = useCallback(
    (src: string) => () => onChange(src),
    [onChange],
  );

  return (
    <Fragment>
      <Typography gutterBottom sx={{ fontSize: 14, fontWeight: 400 }}>
        تصویر نمایه
      </Typography>

      <ScrollableStack>
        {options.map((src) => {
          const selected = profileImage === src;
          return (
            <BorderWrapper
              key={src}
              selected={selected}
              onClick={handleSelect(src)}
            >
              <Inner selected={selected}>
                <Box
                  component="img"
                  src={src}
                  alt="profile option"
                  width="100%"
                  height="100%"
                  sx={{ objectFit: "cover" }}
                />
              </Inner>
            </BorderWrapper>
          );
        })}
      </ScrollableStack>

      {displayEmptyErrorMessage && !profileImage && (
        <Typography fontSize={12} sx={{ mt: 0.5 }}>
          این فیلد نمی‌تواند خالی باشد.
        </Typography>
      )}
    </Fragment>
  );
};

export default AvatarSelector;
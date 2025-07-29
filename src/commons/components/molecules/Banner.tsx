import React, { FC, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

import useWidth from 'commons/utils/UseWidth';
import {
  useGetPageMetadataQuery,
} from 'apps/website-display/redux/features/WebsiteSlice';

import { Box } from '@mui/material';
import { BannerType } from 'commons/types/redux/WebSiteAppearance';


type BannerProps = {};


const Banner: FC<BannerProps> = () => {
  const width = useWidth();
  const { data: pageMetaData } = useGetPageMetadataQuery({
    pageAddress: window.location.pathname,
  });

  // فقط بنرهای فعال
  const banners: BannerType[] = useMemo(
    () => pageMetaData?.banners ?? [],
    [pageMetaData]
  );

  if (banners.length === 0) return null;

  return (
    <Box width="100%" sx={{ overflow: 'hidden', borderRadius: 2 }}>
      <Swiper
        style={{ cursor: 'pointer' }}
        loop={banners.length > 1}
        speed={800}
        spaceBetween={10}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
      >
        {banners.map((banner, idx) => {
          const imgSrc =
            (width === 'xs' || width === 'sm'
              ? banner.mobile_image
              : banner.desktop_image) || // fallback
            banner.mobile_image ||
            banner.desktop_image ||
            '';

          return (
            <SwiperSlide key={`${banner.redirect_to}_${idx}`}>
              <img
                src={imgSrc}
                alt=""
                style={{ width: '100%', borderRadius: 10 }}
                onClick={() => (window.location.href = banner.redirect_to)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Banner;
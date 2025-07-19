import React, { FC, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import IntroductionPage1 from "./IntroductionPage1";
import IntroductionPage2 from "./IntroductionPage2";
import IntroductionPage3 from "./IntroductionPage3";
import AudioWidget from "commons/components/organisms/Widget/contents/AudioWidget";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Introduction: FC<LoginPropsType> = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  return (
    <Fragment>
      <AudioWidget
        hidden={true}
        link={MediaUrls.INTRODUCTION_BACKGROUND_SOUND}
        autoplay={true}
        repeat={true}
      />
      {currentPage === 1 && <IntroductionPage1 />}
      {currentPage === 2 && <IntroductionPage2 />}
      {currentPage === 3 && <IntroductionPage3 />}
    </Fragment>
  );
};

export default Introduction;

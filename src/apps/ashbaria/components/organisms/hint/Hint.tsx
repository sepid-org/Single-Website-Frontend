import React, { FC } from "react";
import ViewHint from "./ViewHint";
import BuyHint from "./BuyHint";
import { PublicResourceType } from "commons/types/models";
import { ASHBARIA_COIN } from "apps/ashbaria/constants/game-info";

type HintPropsType = {
  hint: PublicResourceType;
  onClose: any;
}

const Hint: FC<HintPropsType> = ({
  hint,
  onClose,
}) => {
  // todo: attributes should be calculated in the backend?
  const buyAttribute = hint?.attributes?.find(attribute => attribute.type === 'Buy')
  const costAttribute = buyAttribute?.attributes?.find(attribute => attribute.type === 'Cost')
  const ashbariaCost = costAttribute?.['value']?.[ASHBARIA_COIN];

  if (hint.has_spent_on_object || !ashbariaCost) {
    return <ViewHint hint={hint} onClose={onClose} />
  } else {
    return <BuyHint hint={hint} onClose={onClose} />
  }
}

export default Hint;
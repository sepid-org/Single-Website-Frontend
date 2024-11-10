import React, { FC } from "react";
import ViewHint from "./ViewHint";
import BuyHint from "./BuyHint";
import { PublicGeneralHint } from "commons/types/models";

type HintPropsType = {
  hint: PublicGeneralHint;
  onClose: any;
}

const Hint: FC<HintPropsType> = ({
  hint,
  onClose,
}) => {
  if (hint.has_spent_on_object) {
    return <ViewHint hint={hint} onClose={onClose} />
  } else {
    return <BuyHint hint={hint} onClose={onClose} />
  }
}

export default Hint;
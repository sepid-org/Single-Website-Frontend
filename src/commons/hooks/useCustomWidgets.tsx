import useAshbariaCustomWidgets from 'apps/ashbaria/hooks/useAshbariaCustomWidgets';
import { ComplementaryObjectType } from 'commons/types/models';

export const useCustomWidgets = () => {
  // todo: TOF
  const { complementaryObjects: ashbariaComplementaryObjects } = useAshbariaCustomWidgets();
  const complementaryObjects: ComplementaryObjectType[] = [
    ...ashbariaComplementaryObjects,
  ];
  return {
    complementaryObjects,
  }
};

export default useCustomWidgets;
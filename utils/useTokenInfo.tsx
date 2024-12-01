import { useMemo } from 'react';
import { tokenInfos } from '@/constants';

export const useTokenInfo = (priceFeed: string | undefined) => {
  const tokenInfo = useMemo(() => {
    if (!priceFeed) return null;
    return tokenInfos.find((item) => item.address === String(priceFeed));
  }, [priceFeed]);

  return tokenInfo;
};

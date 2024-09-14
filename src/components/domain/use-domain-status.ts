import { fetcher } from "@/lib/utils";
import type { DomainStatus } from "@/types";
import useSWR from "swr";

const useDomainStatus = (
  domain: string | null,
): {
  status: DomainStatus;
  domainRes: any;
  isLoading: boolean;
  mutate: () => void;
} => {
  const { data, mutate, isLoading } = useSWR<{
    status: string;
    domainRes: any;
  }>(() => (!domain ? null : `/api/user/domain/${domain}`), fetcher, {
    revalidateOnMount: true,
    keepPreviousData: false,
  });

  return {
    status: data?.status as DomainStatus,
    domainRes: data?.domainRes,
    isLoading: isLoading,
    mutate,
  };
};

export default useDomainStatus;

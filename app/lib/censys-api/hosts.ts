import { CENSYS_API_URL, CensysResponse, excludeNullish, getAPIHeaders } from "./util";

interface HostService {
}

interface Host {
  ip: string,
  services: HostService[],
}

export interface HostsSearchResult {
  query: string,
  total: number,
  duration: number,
  hits: Host[],
  links: {
    next: string,
    prev: string,
  },
}

interface SearchHostsOptions {
  q: string,
  cursor?: string,
}

export const searchHosts = async (options: SearchHostsOptions): Promise<CensysResponse<HostsSearchResult>> => {
  const params = new URLSearchParams(excludeNullish(options));
  const res = await fetch(`${CENSYS_API_URL}/api/v2/hosts/search?${params.toString()}`, {
    headers: getAPIHeaders(),
  });
  return res.json();
};

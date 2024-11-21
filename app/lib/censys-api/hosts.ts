import { CENSYS_API_URL, CensysResponse, getAPIHeaders } from "./util";

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

export const searchHosts = async (q: string | null): Promise<CensysResponse<HostsSearchResult>> => {
  const res = await fetch(`${CENSYS_API_URL}/api/v2/hosts/search?q=${q || ""}`, {
    headers: getAPIHeaders(),
  });
  return res.json();
};

import * as hostsApi from "./hosts";

export const { searchHosts }: typeof hostsApi = {
  searchHosts: async (query: string | null) => ({
    code: 200,
    status: "OK",
    result: {
      query: query || "",
      total: 657236316,
      duration: 258,
      hits: [
        {
          ip: "1.2.3.4",
          services: [
            {},
            {},
          ],
        },
        {
          ip: "5.6.7.8",
          services: [
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          ip: "9.10.11.12",
          services: [
          ],
        },
      ],
      links: {
        next: "",
        prev: "",
      },
    },
  }),
};

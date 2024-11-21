export interface CensysResponse<T> {
  code: number,
  status: "OK" | unknown,
  result: T,
}

export const CENSYS_API_URL = process.env.CENSYS_API_BASE_URL;

export const getAPIHeaders = () => {
  const username = process.env.CENSYS_API_ID;
  const password = process.env.CENSYS_API_SECRET;
  const token = Buffer.from(username + ":" + password).toString("base64");
  return {
    Authorization: `Basic ${token}`,
  };
};

export const excludeNullish = <T extends object>(t: T): Partial<T> => {
  const entries = Object.entries(t).filter(([, v]) => v != null);
  return Object.fromEntries(entries) as Partial<T>;
};

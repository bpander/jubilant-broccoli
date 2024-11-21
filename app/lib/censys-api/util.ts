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

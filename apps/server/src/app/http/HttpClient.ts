import fetch from "node-fetch";
import Logger from "../configs/Logger";


export async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    Logger.error(`msg='Response Error' url='${url}'`)
    throw new HTTPResponseError(response);
  }
  return await response.json();
}

class HTTPResponseError extends Error {
  private response: string;
  constructor(response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

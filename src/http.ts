import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

type ResponseType<T> = {
  success: AxiosResponse<T>;
  error: null | Error | AxiosError;
};

const axiosInstance = (brandKey: string): AxiosInstance => {
  return axios.create({
    headers: {
      brand: brandKey,
      ContentType: "application/json",
      timeout: 1000,
    },
  });
};

export const getRequestHandler = async <T>(
  url: string,
  brandKey: string,
  params?: object
): Promise<ResponseType<T>> => {
  const response: ResponseType<T> = {
    success: {} satisfies AxiosResponse<T>,
    error: null,
  };

  try {
    const res = await axiosInstance(brandKey).request<T>({
      method: "get",
      url,
      ...(params != null && { params }),
    });
    console.info("Get request success: " + url);
    response.success = { ...res };
  } catch (error) {
    console.error(
      `Get request url: ${url}, error: ${error}, brand: ${brandKey}`
    );
    response.error = error;
  }

  return response;
};

async function main(): Promise<void> {
  return await getRequestHandler(
    "https://jsonplaceholder.typicode.com/todos/asdasdadd",
    "brandKey",
    { id: 1 }
  );
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`ERROR: ${error}`);
  });

export {};

import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";

async function request<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  url: string,
  data?: Record<string, unknown>
): Promise<AxiosResponse<T>> {
  const cookies = parseCookies();
  const { authToken } = cookies;
  const isServer = typeof window === "undefined";

  const baseUrl = !isServer
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_SERVER;

  const response: AxiosResponse = await axios({
    method,
    url: `${baseUrl}${url}`,
    data,
    ...(authToken
      ? {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      : {}),
  });

  return response;
}

interface TokenData {
  token: string;
}

export function tokenAuth({ username = "", password = "" }) {
  return request<TokenData>("POST", "/users/token-auth/", {
    username,
    password,
  });
}

export function getTasks() {
  return request<Task[]>("GET", "/task/list/");
}

export function createTask({ title = "" }) {
  return request<Task>("POST", "/task/create/", {
    title,
  });
}

export function deleteTask({ id = "" }) {
  return request<Task>("DELETE", `/task/delete/${id}/`);
}

export function editTask(data: Task) {
  const { id } = data;
  return request<Task>("POST", `/task/update/${id}/`, data);
}

export function me(token = "") {
  return request<User>("GET", `/users/me/${token}/`);
}

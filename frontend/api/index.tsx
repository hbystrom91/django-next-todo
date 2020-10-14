import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";

import { deleteNil } from "../helpers";

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
    withCredentials: true,
    headers: deleteNil({
      "Access-Control-Allow-Credentials": "true",
      Authorization: authToken ? `token ${authToken}` : null,
    }),
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

export function createTask({ title = "", due_date, description = "" }: Task) {
  return request<Task>("POST", "/task/create/", {
    title,
    due_date,
    description,
  });
}

export function deleteTask({ id = "" }) {
  return request<Task>("DELETE", `/task/delete/${id}/`);
}

export function editTask(data: Task) {
  const { id, title, description, due_date } = data;
  return request<Task>("POST", `/task/update/${id}/`, {
    title,
    description,
    due_date,
  });
}

export function me(token = "") {
  return request<User>("GET", `/users/me/${token}/`);
}

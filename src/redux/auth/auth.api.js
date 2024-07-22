import { request } from "../../services/api/request";

export function signInRequest(payload) {
  return request().post("/api/login", payload);
}

export function registerRequest(payload) {
  return request().post("/api/register", payload);
}

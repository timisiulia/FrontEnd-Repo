import { request } from "../../services/api/request";

export function fetchUsersRequest() {
  return request().get("/user");
}

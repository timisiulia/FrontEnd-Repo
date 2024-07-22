import { request } from "../../services/api/request";

export function fetchEventsRequest() {
  return request().get("/event");
}

export function createEventRequest(payload) {
  return request().post("/event", payload);
}
export function respondToEventRequest(payload) {
  return request().post("/participant/respond", payload);
}

export function fetchConcurrencyRequest(payload) {
  return request().post("/event/concurrency", payload);
}

export function deleteEventRequest(id) {
  return request().delete(`/event/${id}`)
}

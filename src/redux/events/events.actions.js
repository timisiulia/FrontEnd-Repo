import { setEventsList } from "./events.reducer";
import {
  createEventRequest,
  fetchConcurrencyRequest,
  deleteEventRequest,
  fetchEventsRequest,
  respondToEventRequest
} from "./event.api";

export const fetchEventsAction =
  (onError) =>
    async (dispatch) => {
      try {
        console.log('try fetch');
        const response = await fetchEventsRequest();

        if (!response) {
          onError();
        } else {
          dispatch(setEventsList(response.data))
        }
      } catch (e) {
        onError();
        console.log('Error: ', e);
      }
    };

export const createEventAction =
  (payload, onSuccess, onError) =>
    async (dispatch) => {
      try {
        const response = await createEventRequest({ ...payload, userIds: payload.userIds ? payload.userIds : [] });

        if (!response) {
          console.log('error case');
          onError();
        } else {
          console.log('fetchEventsAction');
          dispatch(fetchEventsAction());
          onSuccess();
        }
      } catch (e) {
        onError();
        console.log('Error: ', e);
      }
    };

export const respondToEventAction =
  (payload, onSuccess) =>
    async (dispatch) => {
  try {
    const response = await respondToEventRequest(payload);

    if (response && response.data) {
      onSuccess && onSuccess();
    }
  } catch (e) {
    console.log({ e });
  }
    }

export const deleteEventAction =
  (eventId, onSuccess) =>
    async (dispatch) => {
      try {
        await deleteEventRequest(eventId);

        onSuccess && onSuccess();
      } catch (e) {
        console.log({ e });
      }
    }

export const fetchConcurrencyAction =
  (payload, onSuccess, onError) =>
    async (dispatch) => {
      try {
        console.log('try fetch');
        const response = await fetchConcurrencyRequest(payload);

        if (!response) {
          onError();
        } else {
          onSuccess(response.data);
        }
      } catch (e) {
        onError();
        console.log('Error: ', e);
      }
    };

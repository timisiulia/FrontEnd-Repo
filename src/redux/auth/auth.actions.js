import { registerRequest, signInRequest } from "./auth.api";
import { removeAuthUser } from "./auth.reducer";

export const loginAction =
  (payload, onSuccess, onError) =>
  async () => {
    try {
      const response = await signInRequest(payload);

      if (!response) {
        onError();
      } else {
        onSuccess(response.data);
      }
    } catch (e) {
      onError(e.response);
      console.log('Error: ', e.response);
    }
  };

export const registerAction =
  (payload, onSuccess, onError) =>
    async () => {
      try {
        const response = await registerRequest({ ...payload, role: 'USER' });

        if (!response) {
          onError();
        } else {
          onSuccess(response.data);
        }
      } catch (e) {
        onError(e.response);
        console.log('Error: ', e.response);
      }
    };

export const logoutAction = (onSuccess, onError) => async (dispatch) => {
  try {
    dispatch(removeAuthUser());

    onSuccess && onSuccess();
  } catch (e) {
    console.log(e);
    onError && onError();
  }


}

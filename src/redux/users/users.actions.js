import { setUsersList } from "./users.reducer";
import { fetchUsersRequest } from "./users.api";

export const fetchUsersAction =
  (onError) =>
    async (dispatch) => {
      try {
        console.log('try fetch');
        const response = await fetchUsersRequest();

        if (!response) {
          onError();
        } else {
          dispatch(setUsersList(response.data))
        }
      } catch (e) {
        onError();
        console.log('Error: ', e);
      }
    };

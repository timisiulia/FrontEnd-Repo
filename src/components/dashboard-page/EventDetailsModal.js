import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment/moment";
import {
  deleteEventAction,
  fetchEventsAction,
} from "../../redux/events/events.actions";
import { toast } from "react-toastify";

export const EventDetailsModal = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const users = useSelector((state) => state.users);

  console.log({ props });

  const { organizer, start, end, title, location, participants, eventId } =
    props.selectedEvent;

  console.log({ selected: props.selectedEvent });

  // const usersOptions = useMemo(() => {
  //   return users.reduce((acc, user) => {
  //     if (user.id === userId) {
  //       return acc;
  //     }
  //
  //     return [...acc, { value: user.id, label: user.email }];
  //   }, []);
  // }, [userId, users]);

  const allParticipants = useMemo(() => {
    return users.reduce((acc, user) => {
      if (user.id === organizer) {
        if (user.id === userId) {
          return [...acc, `${user.email} (organizer)(you)`];
        }

        return [...acc, `${user.email} (organizer)`];
      }

      if (participants.find((item) => item.userId === user.id)) {
        if (userId === user.id) {
          return [...acc, `${user.email} (you)`];
        }

        return [...acc, user.email];
      }

      return acc;
    }, []);
  }, [organizer, participants, userId, users]);

  const date = (() => {
    const startVal = moment(start).format("DD.MM.YYYY HH:mm");
    const endVal = moment(end).format("DD.MM.YYYY HH:mm");

    console.log({ startVal, endVal, dates: props.dates });

    return `${startVal} - ${endVal}`;
  })();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Sunteti sigur ca doriti sa stergeti evenimentul?") === true) {
      dispatch(
        deleteEventAction(eventId, () => {
          dispatch(fetchEventsAction(() => {}));
          toast("Eveniment sters cu succes!");
          props.setModalOpen(false);
        })
      );
    }
  };

  return (
    <div className="modal-wrapper-details">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>{date}</div>
        {organizer === userId && (
          <div className="delete-button" onClick={handleDelete}>
            <DeleteForeverIcon style={{ color: "lightpink" }} />
          </div>
        )}
      </div>
      <div className="event-data">
        <div className="item">
          <div className="title">Descriere:</div>
          <div className="value">{title}</div>
        </div>
        <div className="item">
          <div className="title">Locatia:</div>
          <div className="value">{location}</div>
        </div>
        <div className="participants">
          <div className="title">Participanti:</div>
          <div className="list">
            {allParticipants.map((participant) => {
              return <div className="value">{participant}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

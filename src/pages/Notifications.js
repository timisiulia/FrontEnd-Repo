import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchEventsAction, respondToEventAction } from "../redux/events/events.actions";
import "moment/locale/ro";
import moment from "moment";

export const Notifications = () => {
  require("./../components/notifications/notifications.scss");

  moment.locale("ro");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const events = useSelector(state => {
    const allEvents = [...state?.events];

    console.log({ allEvents });

    allEvents.sort((a, b) => {
      console.log({ a, b });

      return a.id > b.id ? -1 : 1;
    });

    return allEvents;
  });

  const formattedEvents = events.map((item) => {
    if (item.user !== userId) {
      const inviteStatus = item?.participants.find(p => p.userId === userId)?.inviteStatus;

      return { ...item, inviteStatus }
    }

    return item
  })

  const [notifications, setNotification] = useState(formattedEvents.reduce((acc, event) => ({...acc, [event.id]: event.inviteStatus}), {}))
  //eventId, inviteStatus

  const handleChange = (e, id) => {
    const response = e.target.value;
    setNotification(prev => ({ ...prev, [id]: response }))

    dispatch(respondToEventAction({ eventId: id, inviteStatus: response }, () => {
      console.log('UPDATED');
      dispatch(fetchEventsAction(() => {
        console.log('coulnt fetch');}))
    }))
  }

  const toDate = (event) => {
    const startVal = moment(event.startDate).utc(true).format("DD.MM.YYYY HH:mm");
    const endVal = moment(event.endDate).utc(true).format("DD.MM.YYYY HH:mm");

    return `${startVal} - ${endVal}`;
  };

  console.log({ formattedEvents });

  return (
    <div className="notifications-wrapper">
      {formattedEvents.map((event) => (
        <div className="event-element" key={event.id}>
          <div className="row">
            <div className="title">Descriere:</div>
            <div className="value">{event.description}</div>
          </div>
          <div className="row">
            <div className="title">Data:</div>
            <div className="value">{toDate(event)}</div>
          </div>
          <div className="row">
            <div className="title">Status:</div>
            <div className="value">
              {event?.inviteStatus ? (
                <select defaultValue={event.inviteStatus} value={notifications[event.id]} onChange={(e) => handleChange(e, event.id)}>
                  <option selected={event.inviteStatus === 'PENDING'} value="PENDING">PENDING</option>
                  <option selected={event.inviteStatus === 'ACCEPTED'} value="ACCEPTED">ACCEPT</option>
                  <option selected={event.inviteStatus === 'MAYBE'} value="MAYBE">MAYBE</option>
                  <option selected={event.inviteStatus === 'DECLINED'} value="DECLINED">DECLINE</option>
                </select>
              ) : (
                "organizator"
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

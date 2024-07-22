import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
import "moment/locale/ro";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { EventCreateModal } from "../components/dashboard-page/EventCreateModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsAction } from "../redux/events/events.actions";
import { EventDetailsModal } from "../components/dashboard-page/EventDetailsModal";

moment.locale("ro");
const localizer = momentLocalizer(moment);

export const Dashboard = () => {
  require("./../components/dashboard-page/dashboard.scss");

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id);
  const users = useSelector((state) => state.users);

  const isLoggedIn = !!userId;

  const events = useSelector((state) => {
    console.log({ stateEvents: state?.events });

    if (state && state?.events) {
      return state?.events.map((event) => {
        return {
          title: event.description,
          start: moment(event.startDate).utc(true).toDate(),
          end: moment(event.endDate).utc(true).toDate(),
          participants: event.participants,
          location: event.location,
          organizer: event.user,
          eventId: event.id,
        };
      });
    } else {
      return [];
    }
  });

  console.log({ events });

  const [isModalOpen, setModalOpen] = useState({ create: false, view: false });
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchEventsAction(() => alert("logged out")));
    } else {
      console.log("not logged");
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div className="calendar-wrapper">
        <Calendar
          messages={{
            next: "Urmatorul",
            previous: "Precedent",
            today: "Azi",
            month: "Luna",
            week: "Saptamana",
            day: "Zi",
          }}
          onSelectSlot={({ start, end }) => {
            setSelectedDate({ start, end });
            setModalOpen((prev) => ({ ...prev, create: true }));
          }}
          onSelectEvent={(obj) => {
            setSelectedEvent(obj);
            setModalOpen((prev) => ({ ...prev, view: true }));
            // alert(JSON.stringify(obj))
          }}
          minDate={new Date()}
          selectable
          defaultView="day"
          scrollToTime={new Date()}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      <Modal
        open={isModalOpen.create || isModalOpen.view}
        onClose={() => {
          setSelectedDate({ start: "", end: "" });
          setModalOpen({ create: false, view: false });
          setSelectedEvent(null);
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <>
          {isModalOpen.create && (
            <EventCreateModal
              dates={selectedDate}
              isModalOpen={isModalOpen.create}
              setModalOpen={(val) => {
                setModalOpen((prev) => ({ ...prev, create: val }));
              }}
            />
          )}
          {isModalOpen.view && (
            <EventDetailsModal
              selectedEvent={selectedEvent}
              isModalOpen={isModalOpen.view}
              setModalOpen={(val) => {
                setModalOpen((prev) => ({ ...prev, view: val }));
              }}
            />
          )}
        </>
      </Modal>
    </>
  );
};

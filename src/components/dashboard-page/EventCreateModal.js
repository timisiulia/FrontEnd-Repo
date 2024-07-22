import { useCallback, useEffect, useMemo, useState } from "react";
import Input from "../utilities/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  fetchConcurrencyAction,
} from "../../redux/events/events.actions";
import moment from "moment";
import { toast } from "react-toastify";
import { fetchUsersAction } from "../../redux/users/users.actions";
import Select from "react-select";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/ro";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DndCalendar = withDragAndDrop(Calendar);

const now = new Date();

// const events = [
//   {
//     id: 14,
//     title: "Today",
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3))
//   },
//   {
//     id: 15,
//     title: "Point in Time Event",
//     start: now,
//     end: now
//   },
// ]

// description:null
// endDate:null
// id:7
// location:null
// participants:[]
// recurrency:null
// recurrencyPeriod:null
// startDate:null
// user:12

const loginFields = [
  {
    labelText: "Descriere",
    labelFor: "description",
    id: "description",
    name: "description",
    type: "text",
    isRequired: true,
    placeholder: "Descriere",
  },
  {
    labelText: "Locatie",
    labelFor: "location",
    id: "location",
    name: "location",
    type: "text",
    isRequired: true,
    placeholder: "Locatie",
  },
];

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
fieldsState.userIds = [];

moment.locale("ro");
const localizer = momentLocalizer(moment);

export const EventCreateModal = (props) => {
  const dispatch = useDispatch();
  const { setModalOpen } = props;
  const [dates, setDates] = useState(props.dates);
  const [data, setData] = useState(fieldsState);
  const [concurrent, setConcurrent] = useState([]);
  const [fullEvents, setEvents] = useState([
    {
      start: moment(dates.start).toDate(),
      end: moment(dates.end).toDate(),
      title: "sad",
    },
  ]);
  const userId = useSelector((state) => state.auth.id);
  const users = useSelector((state) => state.users);

  const usersOptions = useMemo(() => {
    return users.reduce((acc, user) => {
      if (user.id === userId) {
        return acc;
      }

      return [...acc, { value: user.id, label: user.email }];
    }, []);
  }, [userId, users]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeParticipants = (p) => {
    setData((prev) => ({ ...prev, userIds: p.map((u) => u.value) }));
  };

  const handleCreateEvent = () => {
    const payload = {
      startDate: moment(props.dates.start),
      endDate: moment(props.dates.end),
      description: data.description,
      location: data.location,
      userIds: data.userIds,
    };

    dispatch(
      createEventAction(
        payload,
        () => {
          setModalOpen(false);
          toast("Event created successfully");
        },
        () => alert("fetch error")
      )
    );
  };

  const formatConcurrentEvents = (res) => {
    return res.reduce((acc, item) => {
      const { user, interval } = item;

      const intervals = interval.split(",");

      const events = intervals.reduce((fin, inter, index) => {
        if (index % 2 === 1) {
          return [
            ...fin,
            {
              title: `Booked ~ user: ${
                user === userId
                  ? "You"
                  : usersOptions.find((u) => u.value === user).label
              }`,
              start: moment(intervals[index - 1])
                .utc(true)
                .toDate(),
              end: moment(inter).utc(true).toDate(),
            },
          ];
        }
        return fin;
      }, []);

      return [...acc, ...events];
    }, []);
  };

  const title = (() => {
    const isHourly = moment(dates.end).diff(moment(dates.start), "hours") < 24;

    const startVal = moment(dates.start).format(
      isHourly ? "HH:mm" : "DD.MM.YYYY HH:mm"
    );
    const endVal = moment(dates.end).format(
      isHourly ? "HH:mm" : "DD.MM.YYYY HH:mm"
    );

    return `${startVal} - ${endVal}`;
  })();

  const refreshConcurrency = useCallback(
    (range) => {
      const dateToFetch = range ? range[0] : dates.start;
      let payload = {
        userIds: data.userIds ?? [],
        startDate: moment(dateToFetch).startOf("day").toISOString(),
        endDate: moment(dateToFetch)
          .endOf("day")
          .add(1, "minute")
          .toISOString(),
      };

      dispatch(
        fetchConcurrencyAction(
          payload,
          (data) => {
            setConcurrent(formatConcurrentEvents(data));
          },
          (error) => {
            console.log({ error });
          }
        )
      );
    },
    [dates.start, data.userIds, dispatch]
  );

  useEffect(() => {
    dispatch(fetchUsersAction(() => console.log("error")));
    setData({ description: "", location: "" });
  }, [dispatch, props.isModalOpen]);

  useEffect(() => {
    refreshConcurrency();
  }, [refreshConcurrency]);

  useEffect(() => {
    setEvents((prev) => [prev[0], ...concurrent]);
  }, [concurrent]);

  useEffect(() => {
    setEvents((prev) => {
      const [, ...rest] = prev;

      return [
        {
          start: moment(dates.start).toDate(),
          end: moment(dates.end).toDate(),
          title: "sad",
        },
        ...rest,
      ];
    });
  }, [dates]);

  return (
    <div className="modal-wrapper">
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>{title}</div>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={data[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <Select
          className="participants-selector"
          options={usersOptions}
          isMulti
          placeholder="Selectati..."
          onChange={handleChangeParticipants}
          style={{ margin: '1.25rem 0' }}
        />
        <div className="create-button-wrapper">
          <button className="create-event-button" onClick={handleCreateEvent}>
            Creaza eveniment
          </button>
        </div>
      </div>
      {moment(dates.end).diff(moment(dates.start), "hours") < 24 && (
        <div style={{ display: "flex", flex: 1 }}>
          <DndCalendar
            messages={{next:"Urmatorul",previous:"Precedent",today:"Azi"}}
            // onSelectSlot={({ start, end }) => {
            //   setSelectedDate({ start, end });
            //   setModalOpen((prev) => ({ ...prev, create: true }));
            // }}
            // onSelectEvent={(obj) => {
            //   setSelectedEvent(obj);
            //   setModalOpen((prev) => ({ ...prev, view: true }));
            //   // alert(JSON.stringify(obj))
            // }}
            // minDate={new Date()}
            views={{
              day: true,
            }}
            defaultView="day"
            // selectable
            resizable
            // draggable
            localizer={localizer}
            defaultDate={moment(dates.start).toDate()}
            events={fullEvents}
            onEventResize={({ start, end }) => {
              setDates({ start, end });
            }}
            onEventDrop={({ start, end }) => {
              setDates({ start, end });
            }}
            onRangeChange={(range) => {
              refreshConcurrency(range);
            }}
            selectable
            onSelectSlot={({ start, end }) => {
              setDates({ start, end });
            }}
            startAccessor="start"
            endAccessor="end"
            scrollToTime={moment(dates.start).toDate()}
            style={{ height: 500 }}
          />
        </div>
      )}
    </div>
  );
};

import { BiCalendar } from "react-icons/bi";
import AddAppointment from "./component/AddAppointment";
import AppointmentInfo from "./component/AppointmentInfo";
import Search from "./component/Search";
import { useState, useEffect, useCallback } from "react";

function App() {
  let [appointmentsData, setAppointmentsData] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  let filterAppointments = appointmentsData.filter(item => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
  }).sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ?
        -1 * order : 1 * order
    );
  });

  let fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(response => setAppointmentsData(response));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        <BiCalendar className="inline-block text-red-400 align-top" />Your appointments
      </h1>
      <AddAppointment lastId={appointmentsData.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
        onSendAppointment={appointmentInfo => setAppointmentsData([...appointmentsData, appointmentInfo])} />
      <Search query={query} onQueryChanged={query => setQuery(query)}
        orderBy={orderBy}
        onOrderByChanged={orderBy => setOrderBy(orderBy)}
        sortBy={sortBy}
        onSortByChanged={sortBy => setSortBy(sortBy)} />

      <ul className="divide-y divide-gray-200">
        {
          filterAppointments.map(appointment =>
            <AppointmentInfo key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={(appointmentId) => {
                setAppointmentsData(appointmentsData.filter(x => x.id !== appointmentId))
              }}
            />)
        }
      </ul>
    </div>
  );
}

export default App;

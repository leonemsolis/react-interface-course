import { BiCalendar } from "react-icons/bi";
import AddAppointment from "./component/AddAppointment";
import AppointmentInfo from "./component/AppointmentInfo";
import Search from "./component/Search";
import { useState, useEffect, useCallback } from "react";

function App() {
  let [appointmentsData, setAppointmentsData] = useState([]);
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
      <AddAppointment />
      <Search />

      <ul className="divide-y divide-gray-200">
        {
          appointmentsData.map(appointment => <AppointmentInfo key={appointment.id} appointment={appointment} />)
        }
      </ul>
    </div>
  );
}

export default App;

function AppointmentList({
  appointments,
  handleEdit,
  handleDelete
}) {
  return (
    <div>

      <h2>Appointments</h2>

      {appointments.length === 0 ? (

        <p>No appointments found.</p>

      ) : (

        <table border="1">

          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((appointment) => (

              <tr key={appointment.id}>

                <td>
                  {appointment.id}
                </td>

                <td>
                  {appointment.appointmentDate}
                </td>

                <td>
                  {appointment.appointmentTime}
                </td>

                <td>
                  {appointment.customer?.name}
                </td>

                <td>
                  {appointment.vehicle?.registrationNumber}
                </td>

                <td>
                  {appointment.status}
                </td>

                <td>
                  {appointment.description}
                </td>

                <td>

                  <button
                    onClick={() =>
                      handleEdit(appointment)
                    }
                  >
                    Edit
                  </button>

                  {' '}

                  <button
                    onClick={() =>
                      handleDelete(appointment.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  )
}

export default AppointmentList
function AppointmentForm({
  appointmentDate,
  appointmentTime,
  status,
  description,
  customerId,
  vehicleId,

  setAppointmentDate,
  setAppointmentTime,
  setStatus,
  setDescription,
  setCustomerId,
  setVehicleId,

  customers,
  vehicles,

  handleSubmit,
  editingAppointmentId,
  cancelEdit
}) {
  return (
    <div>
      <h2>
        {editingAppointmentId !== null
          ? 'Edit Appointment'
          : 'Add Appointment'}
      </h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Appointment Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) =>
              setAppointmentDate(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Appointment Time</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) =>
              setAppointmentTime(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Status</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            required
          >
            <option value="">
              Select Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>
          </select>
        </div>

        <div>
          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div>
          <label>Customer</label>

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            required
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Vehicle</label>

          <select
            value={vehicleId}
            onChange={(e) =>
              setVehicleId(e.target.value)
            }
            required
          >
            <option value="">
              Select Vehicle
            </option>

            {vehicles.map((vehicle) => (
              <option
                key={vehicle.id}
                value={vehicle.id}
              >
                {vehicle.registrationNumber}
                {' - '}
                {vehicle.brand}
                {' '}
                {vehicle.model}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          {editingAppointmentId !== null
            ? 'Update Appointment'
            : 'Add Appointment'}
        </button>

        {editingAppointmentId !== null && (
          <button
            type="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </form>
    </div>
  )
}

export default AppointmentForm
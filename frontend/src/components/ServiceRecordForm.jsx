function ServiceRecordForm({
  serviceType,
  description,
  serviceDate,
  laborCost,
  partsCost,
  status,
  customerId,
  vehicleId,
  appointmentId,

  setServiceType,
  setDescription,
  setServiceDate,
  setLaborCost,
  setPartsCost,
  setStatus,
  setCustomerId,
  setVehicleId,
  setAppointmentId,

  customers,
  vehicles,
  appointments,

  handleSubmit,

  editingServiceId,
  cancelEdit
}) {

  return (
    <div>

      <h2>
        {editingServiceId !== null
          ? 'Edit Service Record'
          : 'Add Service Record'}
      </h2>

      <form onSubmit={handleSubmit}>

        {/* SERVICE TYPE */}

        <div>

          <label>
            Service Type
          </label>

          <input
            type="text"
            value={serviceType}
            onChange={(e) =>
              setServiceType(e.target.value)
            }
            required
          />

        </div>


        {/* DESCRIPTION */}

        <div>

          <label>
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

        </div>


        {/* SERVICE DATE */}

        <div>

          <label>
            Service Date
          </label>

          <input
            type="date"
            value={serviceDate}
            onChange={(e) =>
              setServiceDate(e.target.value)
            }
            required
          />

        </div>


        {/* LABOR COST */}

        <div>

          <label>
            Labor Cost
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={laborCost}
            onChange={(e) =>
              setLaborCost(e.target.value)
            }
            required
          />

        </div>


        {/* PARTS COST */}

        <div>

          <label>
            Parts Cost
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={partsCost}
            onChange={(e) =>
              setPartsCost(e.target.value)
            }
            required
          />

        </div>


        {/* STATUS */}

        <div>

          <label>
            Status
          </label>

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

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="COMPLETED">
              Completed
            </option>

          </select>

        </div>


        {/* CUSTOMER */}

        <div>

          <label>
            Customer
          </label>

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

            {customers.map(
              (customer) => (

                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
                </option>

              )
            )}

          </select>

        </div>


        {/* VEHICLE */}

        <div>

          <label>
            Vehicle
          </label>

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

            {vehicles.map(
              (vehicle) => (

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

              )
            )}

          </select>

        </div>


        {/* APPOINTMENT */}

        <div>

          <label>
            Appointment
          </label>

          <select
            value={appointmentId}
            onChange={(e) =>
              setAppointmentId(e.target.value)
            }
            required
          >

            <option value="">
              Select Appointment
            </option>

            {appointments.map(
              (appointment) => (

                <option
                  key={appointment.id}
                  value={appointment.id}
                >
                  {appointment.appointmentDate}
                  {' - '}
                  {appointment.appointmentTime}
                </option>

              )
            )}

          </select>

        </div>


        {/* SUBMIT */}

        <button type="submit">

          {editingServiceId !== null
            ? 'Update Service'
            : 'Add Service'}

        </button>


        {/* CANCEL */}

        {editingServiceId !== null && (

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

export default ServiceRecordForm
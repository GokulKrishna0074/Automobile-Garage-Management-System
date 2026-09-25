function VehicleForm({
  brand,
  model,
  registrationNumber,
  year,
  color,
  customerId,

  setBrand,
  setModel,
  setRegistrationNumber,
  setYear,
  setColor,
  setCustomerId,

  customers,
  handleSubmit,

  editingVehicleId,
  cancelEdit
}) {

  return (
    <div>

      <h2>
        {editingVehicleId !== null
          ? 'Edit Vehicle'
          : 'Add Vehicle'}
      </h2>

      <form onSubmit={handleSubmit}>

        {/* BRAND */}

        <div>

          <label>
            Brand
          </label>

          <input
            type="text"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
            required
          />

        </div>


        {/* MODEL */}

        <div>

          <label>
            Model
          </label>

          <input
            type="text"
            value={model}
            onChange={(e) =>
              setModel(e.target.value)
            }
            required
          />

        </div>


        {/* REGISTRATION NUMBER */}

        <div>

          <label>
            Registration Number
          </label>

          <input
            type="text"
            value={registrationNumber}
            onChange={(e) =>
              setRegistrationNumber(
                e.target.value
              )
            }
            required
          />

        </div>


        {/* YEAR */}

        <div>

          <label>
            Year
          </label>

          <input
            type="text"
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            required
          />

        </div>


        {/* COLOR */}

        <div>

          <label>
            Color
          </label>

          <input
            type="text"
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
            required
          />

        </div>


        {/* CUSTOMER */}

        <div>

          <label>
            Customer
          </label>

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
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


        {/* BUTTON */}

        <button type="submit">

          {editingVehicleId !== null
            ? 'Update Vehicle'
            : 'Add Vehicle'}

        </button>


        {/* CANCEL */}

        {editingVehicleId !== null && (

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

export default VehicleForm
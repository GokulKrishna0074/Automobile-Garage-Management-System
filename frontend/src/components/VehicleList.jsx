function VehicleList({
  vehicles,
  handleEdit,
  handleDelete
}) {

  return (
    <div>

      <h2>Vehicle List</h2>

      {vehicles.length === 0 ? (

        <p>No vehicles found.</p>

      ) : (

        <table border="1">

          <thead>

            <tr>

              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Registration Number</th>
              <th>Year</th>
              <th>Color</th>
              <th>Customer</th>
              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {vehicles.map((vehicle) => (

              <tr key={vehicle.id}>

                <td>
                  {vehicle.id}
                </td>

                <td>
                  {vehicle.brand}
                </td>

                <td>
                  {vehicle.model}
                </td>

                <td>
                  {vehicle.registrationNumber}
                </td>

                <td>
                  {vehicle.year}
                </td>

                <td>
                  {vehicle.color}
                </td>

                <td>
                  {vehicle.customer?.name}
                </td>

                <td>

                  <button
                    onClick={() =>
                      handleEdit(vehicle)
                    }
                  >
                    Edit
                  </button>

                  {' '}

                  <button
                    onClick={() =>
                      handleDelete(vehicle.id)
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

export default VehicleList
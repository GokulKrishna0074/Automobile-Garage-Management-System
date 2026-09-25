function ServiceRecordList({
  serviceRecords,
  handleEdit,
  handleDelete
}) {

  return (
    <div>

      <h2>
        Service Records
      </h2>

      {serviceRecords.length === 0 ? (

        <p>
          No service records found.
        </p>

      ) : (

        <table border="1">

          <thead>

            <tr>

              <th>ID</th>
              <th>Service</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Labor Cost</th>
              <th>Parts Cost</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {serviceRecords.map(
              (record) => (

                <tr key={record.id}>

                  <td>
                    {record.id}
                  </td>

                  <td>
                    {record.serviceType}
                  </td>

                  <td>
                    {record.serviceDate}
                  </td>

                  <td>
                    {record.customer?.name}
                  </td>

                  <td>
                    {record.vehicle?.registrationNumber}
                  </td>

                  <td>
                    ₹{record.laborCost}
                  </td>

                  <td>
                    ₹{record.partsCost}
                  </td>

                  <td>
                    ₹{record.totalCost}
                  </td>

                  <td>
                    {record.status}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEdit(record)
                      }
                    >
                      Edit
                    </button>

                    {' '}

                    <button
                      onClick={() =>
                        handleDelete(record.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      )}

    </div>
  )
}

export default ServiceRecordList
function CustomerList({
  customers,
  handleEdit,
  handleDelete
}) {

  return (
    <div>

      <h2>Customers</h2>

      {customers.map((customer) => (

        <div key={customer.id}>

          <h3>
            {customer.name}
          </h3>

          <p>
            Phone: {customer.phone}
          </p>

          <p>
            Email: {customer.email}
          </p>

          <p>
            Address: {customer.address}
          </p>

          <button
            onClick={() =>
              handleEdit(customer)
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDelete(customer.id)
            }
          >
            Delete
          </button>

          <hr />

        </div>

      ))}

    </div>
  )
}

export default CustomerList
function CustomerForm({
  name,
  phone,
  email,
  address,
  setName,
  setPhone,
  setEmail,
  setAddress,
  handleSubmit,
  editingId,
  cancelEdit
}) {

  return (
    <div>

      <h1>
        {editingId !== null
          ? 'Edit Customer'
          : 'Add Customer'
        }
      </h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter customer name"
          />
        </div>

        <br />

        <div>
          <label>Phone:</label>

          <input
            type="text"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="Enter phone number"
          />
        </div>

        <br />

        <div>
          <label>Email:</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter email"
          />
        </div>

        <br />

        <div>
          <label>Address:</label>

          <input
            type="text"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="Enter address"
          />
        </div>

        <br />

        <button type="submit">

          {editingId !== null
            ? 'Update Customer'
            : 'Add Customer'
          }

        </button>

        {editingId !== null && (

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

export default CustomerForm
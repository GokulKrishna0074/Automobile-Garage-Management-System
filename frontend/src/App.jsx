import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data
        ? Object.values(data).join(" ")
        : String(data || `Request failed (${response.status})`);
    throw new Error(message);
  }
  return data;
}

const emptyCustomer = { name: "", phone: "", email: "", address: "" };
const emptyVehicle = {
  registrationNumber: "",
  brand: "",
  model: "",
  year: "",
  color: "",
  customerId: "",
};
const emptyAppointment = {
  appointmentDate: "",
  appointmentTime: "",
  status: "BOOKED",
  description: "",
  customerId: "",
  vehicleId: "",
};
const emptyService = {
  serviceType: "",
  description: "",
  serviceDate: "",
  laborCost: "",
  partsCost: "",
  status: "IN_PROGRESS",
  customerId: "",
  vehicleId: "",
  appointmentId: "",
};
const emptyInvoice = {
  invoiceNumber: "",
  invoiceDate: "",
  status: "UNPAID",
  serviceRecordId: "",
};
const emptyPayment = {
  paymentDate: "",
  paymentMethod: "CASH",
  paymentStatus: "PAID",
  transactionReference: "",
  invoiceId: "",
};

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function dateValue(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [serviceRecords, setServiceRecords] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    totalVehicles: 0,
    totalAppointments: 0,
    totalServiceRecords: 0,
    totalInvoices: 0,
    totalRevenue: 0,
  });

  const [customerForm, setCustomerForm] = useState(emptyCustomer);
  const [vehicleForm, setVehicleForm] = useState(emptyVehicle);
  const [appointmentForm, setAppointmentForm] = useState(emptyAppointment);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [invoiceForm, setInvoiceForm] = useState(emptyInvoice);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);

  const [editCustomer, setEditCustomer] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [editService, setEditService] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);
  const [editPayment, setEditPayment] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, error]);

  async function loadAll() {
    setLoading(true);
    try {
      const [c, v, a, s, i, p, d] = await Promise.all([
        api("/customers"),
        api("/vehicles"),
        api("/appointments"),
        api("/service-records"),
        api("/invoices"),
        api("/payments"),
        api("/dashboard"),
      ]);
      setCustomers(c || []);
      setVehicles(v || []);
      setAppointments(a || []);
      setServiceRecords(s || []);
      setInvoices(i || []);
      setPayments(p || []);
      setDashboard(d || {});
    } catch (e) {
      console.error(e);
      setError(`Backend connection failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function refreshDashboard() {
    try {
      setDashboard((await api("/dashboard")) || {});
      setMessage("Dashboard refreshed");
    } catch (e) {
      setError(e.message);
    }
  }

  function flash(text) {
    setMessage(text);
    setError("");
  }

  function fail(e) {
    console.error(e);
    setError(e.message || "Operation failed");
    setMessage("");
  }

  async function saveEntity({ id, endpoint, payload, setter, list, reset, label }) {
    try {
      const data = await api(id ? `${endpoint}/${id}` : endpoint, {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      setter(id ? list.map((item) => (item.id === id ? data : item)) : [...list, data]);
      reset();
      flash(id ? `${label} updated successfully` : `${label} added successfully`);
      return true;
    } catch (e) {
      fail(e);
      return false;
    }
  }

  async function removeEntity(endpoint, id, setter, list, label) {
    if (!window.confirm(`Delete this ${label.toLowerCase()}?`)) return;
    try {
      await api(`${endpoint}/${id}`, { method: "DELETE" });
      setter(list.filter((item) => item.id !== id));
      flash(`${label} deleted successfully`);
      await refreshDataAfterMutation();
    } catch (e) {
      fail(e);
    }
  }

  async function refreshDataAfterMutation() {
    try {
      const d = await api("/dashboard");
      setDashboard(d || {});
    } catch (e) {
      console.error(e);
    }
  }

  async function submitCustomer(e) {
    e.preventDefault();
    await saveEntity({
      id: editCustomer,
      endpoint: "/customers",
      payload: customerForm,
      setter: setCustomers,
      list: customers,
      reset: () => {
        setCustomerForm(emptyCustomer);
        setEditCustomer(null);
      },
      label: "Customer",
    });
  }

  function startCustomerEdit(item) {
    setEditCustomer(item.id);
    setCustomerForm({
      name: item.name || "",
      phone: item.phone || "",
      email: item.email || "",
      address: item.address || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitVehicle(e) {
    e.preventDefault();
    await saveEntity({
      id: editVehicle,
      endpoint: "/vehicles",
      payload: { ...vehicleForm, customerId: Number(vehicleForm.customerId) },
      setter: setVehicles,
      list: vehicles,
      reset: () => {
        setVehicleForm(emptyVehicle);
        setEditVehicle(null);
      },
      label: "Vehicle",
    });
  }

  function startVehicleEdit(item) {
    setEditVehicle(item.id);
    setVehicleForm({
      registrationNumber: item.registrationNumber || "",
      brand: item.brand || "",
      model: item.model || "",
      year: item.year || "",
      color: item.color || "",
      customerId: item.customer?.id || item.customerId || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitAppointment(e) {
    e.preventDefault();
    await saveEntity({
      id: editAppointment,
      endpoint: "/appointments",
      payload: {
        ...appointmentForm,
        customerId: Number(appointmentForm.customerId),
        vehicleId: Number(appointmentForm.vehicleId),
      },
      setter: setAppointments,
      list: appointments,
      reset: () => {
        setAppointmentForm(emptyAppointment);
        setEditAppointment(null);
      },
      label: "Appointment",
    });
  }

  function startAppointmentEdit(item) {
    setEditAppointment(item.id);
    setAppointmentForm({
      appointmentDate: dateValue(item.appointmentDate),
      appointmentTime: String(item.appointmentTime || "").slice(0, 5),
      status: item.status || "BOOKED",
      description: item.description || "",
      customerId: item.customer?.id || "",
      vehicleId: item.vehicle?.id || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitService(e) {
    e.preventDefault();
    const payload = {
      ...serviceForm,
      laborCost: serviceForm.laborCost === "" ? null : Number(serviceForm.laborCost),
      partsCost: serviceForm.partsCost === "" ? null : Number(serviceForm.partsCost),
      customerId: Number(serviceForm.customerId),
      vehicleId: Number(serviceForm.vehicleId),
      appointmentId: Number(serviceForm.appointmentId),
    };
    await saveEntity({
      id: editService,
      endpoint: "/service-records",
      payload,
      setter: setServiceRecords,
      list: serviceRecords,
      reset: () => {
        setServiceForm(emptyService);
        setEditService(null);
      },
      label: "Service record",
    });
  }

  function startServiceEdit(item) {
    setEditService(item.id);
    setServiceForm({
      serviceType: item.serviceType || "",
      description: item.description || "",
      serviceDate: dateValue(item.serviceDate),
      laborCost: item.laborCost ?? "",
      partsCost: item.partsCost ?? "",
      status: item.status || "IN_PROGRESS",
      customerId: item.customer?.id || "",
      vehicleId: item.vehicle?.id || "",
      appointmentId: item.appointment?.id || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitInvoice(e) {
    e.preventDefault();
    await saveEntity({
      id: editInvoice,
      endpoint: "/invoices",
      payload: {
        ...invoiceForm,
        serviceRecordId: Number(invoiceForm.serviceRecordId),
      },
      setter: setInvoices,
      list: invoices,
      reset: () => {
        setInvoiceForm(emptyInvoice);
        setEditInvoice(null);
      },
      label: "Invoice",
    });
  }

  function startInvoiceEdit(item) {
    setEditInvoice(item.id);
    setInvoiceForm({
      invoiceNumber: item.invoiceNumber || "",
      invoiceDate: dateValue(item.invoiceDate),
      status: item.status || "UNPAID",
      serviceRecordId: item.serviceRecord?.id || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitPayment(e) {
    e.preventDefault();
    await saveEntity({
      id: editPayment,
      endpoint: "/payments",
      payload: {
        ...paymentForm,
        invoiceId: Number(paymentForm.invoiceId),
      },
      setter: setPayments,
      list: payments,
      reset: () => {
        setPaymentForm(emptyPayment);
        setEditPayment(null);
      },
      label: "Payment",
    });
  }

  function startPaymentEdit(item) {
    setEditPayment(item.id);
    setPaymentForm({
      paymentDate: dateValue(item.paymentDate),
      paymentMethod: item.paymentMethod || "CASH",
      paymentStatus: item.paymentStatus || "PAID",
      transactionReference: item.transactionReference || "",
      invoiceId: item.invoice?.id || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filteredCustomers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return customers;
    return customers.filter((x) =>
      [x.name, x.phone, x.email, x.address].some((v) =>
        String(v || "").toLowerCase().includes(q)
      )
    );
  }, [customers, search]);

  const filteredVehicles = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return vehicles;
    return vehicles.filter((x) =>
      [x.brand, x.model, x.registrationNumber, x.color, x.customer?.name].some((v) =>
        String(v || "").toLowerCase().includes(q)
      )
    );
  }, [vehicles, search]);

  const navItems = [
    ["dashboard", "▦", "Dashboard"],
    ["customers", "♙", "Customers"],
    ["vehicles", "▱", "Vehicles"],
    ["appointments", "◷", "Appointments"],
    ["services", "⚙", "Service Records"],
    ["invoices", "▤", "Invoices"],
    ["payments", "₹", "Payments"],
  ];

  const titles = {
    dashboard: ["Garage Dashboard", "A quick overview of your garage operations"],
    customers: ["Customers", "Manage customer profiles and contact details"],
    vehicles: ["Vehicles", "Manage customer vehicles and registrations"],
    appointments: ["Appointments", "Schedule and track garage visits"],
    services: ["Service Records", "Track work performed and service costs"],
    invoices: ["Invoices", "Create and manage service invoices"],
    payments: ["Payments", "Track invoice payments and transactions"],
  };

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <strong>GaragePro</strong>
            <span>Management System</span>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map(([key, icon, label]) => (
            <button
              key={key}
              className={`nav-item ${active === key ? "active" : ""}`}
              onClick={() => {
                setActive(key);
                setSidebarOpen(false);
                setSearch("");
              }}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="connection-dot"><span /> Backend connected</div>
          <small>Spring Boot • MySQL</small>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => {
              if (window.innerWidth <= 900) {
                setSidebarOpen((value) => !value);
              } else {
                setSidebarCollapsed((value) => !value);
              }
            }}
          >
            ☰
          </button>
          <div>
            <h1>{titles[active][0]}</h1>
            <p>{titles[active][1]}</p>
          </div>
          <div className="top-actions">
            <button className="refresh-btn" onClick={loadAll}>↻ Refresh</button>
            <div className="avatar">GK</div>
          </div>
        </header>

        {(message || error) && (
          <div className={`toast ${error ? "error" : "success"}`}>
            <span>{error ? "!" : "✓"}</span>
            {error || message}
          </div>
        )}

        {active !== "dashboard" && (
          <div className="page-tools">
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${titles[active][0].toLowerCase()}...`}
              />
            </div>
          </div>
        )}

        {active === "dashboard" && (
          <Dashboard
            dashboard={dashboard}
            customers={customers}
            vehicles={vehicles}
            appointments={appointments}
            serviceRecords={serviceRecords}
            invoices={invoices}
            payments={payments}
            refreshDashboard={refreshDashboard}
            setActive={setActive}
            loading={loading}
          />
        )}

        {active === "customers" && (
          <CustomersPage
            form={customerForm}
            setForm={setCustomerForm}
            editing={editCustomer}
            onSubmit={submitCustomer}
            onCancel={() => { setEditCustomer(null); setCustomerForm(emptyCustomer); }}
            items={filteredCustomers}
            onEdit={startCustomerEdit}
            onDelete={(id) => removeEntity("/customers", id, setCustomers, customers, "Customer")}
          />
        )}

        {active === "vehicles" && (
          <VehiclesPage
            form={vehicleForm}
            setForm={setVehicleForm}
            editing={editVehicle}
            customers={customers}
            onSubmit={submitVehicle}
            onCancel={() => { setEditVehicle(null); setVehicleForm(emptyVehicle); }}
            items={filteredVehicles}
            onEdit={startVehicleEdit}
            onDelete={(id) => removeEntity("/vehicles", id, setVehicles, vehicles, "Vehicle")}
          />
        )}

        {active === "appointments" && (
          <AppointmentsPage
            form={appointmentForm}
            setForm={setAppointmentForm}
            editing={editAppointment}
            customers={customers}
            vehicles={vehicles}
            onSubmit={submitAppointment}
            onCancel={() => { setEditAppointment(null); setAppointmentForm(emptyAppointment); }}
            items={appointments}
            onEdit={startAppointmentEdit}
            onDelete={(id) => removeEntity("/appointments", id, setAppointments, appointments, "Appointment")}
          />
        )}

        {active === "services" && (
          <ServicesPage
            form={serviceForm}
            setForm={setServiceForm}
            editing={editService}
            customers={customers}
            vehicles={vehicles}
            appointments={appointments}
            onSubmit={submitService}
            onCancel={() => { setEditService(null); setServiceForm(emptyService); }}
            items={serviceRecords}
            onEdit={startServiceEdit}
            onDelete={(id) => removeEntity("/service-records", id, setServiceRecords, serviceRecords, "Service record")}
          />
        )}

        {active === "invoices" && (
          <InvoicesPage
            form={invoiceForm}
            setForm={setInvoiceForm}
            editing={editInvoice}
            serviceRecords={serviceRecords}
            onSubmit={submitInvoice}
            onCancel={() => { setEditInvoice(null); setInvoiceForm(emptyInvoice); }}
            items={invoices}
            onEdit={startInvoiceEdit}
            onDelete={(id) => removeEntity("/invoices", id, setInvoices, invoices, "Invoice")}
          />
        )}

        {active === "payments" && (
          <PaymentsPage
            form={paymentForm}
            setForm={setPaymentForm}
            editing={editPayment}
            invoices={invoices}
            onSubmit={submitPayment}
            onCancel={() => { setEditPayment(null); setPaymentForm(emptyPayment); }}
            items={payments}
            onEdit={startPaymentEdit}
            onDelete={(id) => removeEntity("/payments", id, setPayments, payments, "Payment")}
          />
        )}
      </main>
    </div>
  );
}

function PageCard({ children, className = "" }) {
  return <section className={`page-card ${className}`}>{children}</section>;
}

function FormHeader({ title, editing }) {
  return (
    <div className="card-header">
      <div>
        <h2>{editing ? `Edit ${title}` : `Add ${title}`}</h2>
        <p>{editing ? `Update the ${title.toLowerCase()} details below.` : `Enter the details to create a new ${title.toLowerCase()}.`}</p>
      </div>
      <span className="step-badge">{editing ? "EDIT" : "NEW"}</span>
    </div>
  );
}

function Field({ label, children, full = false }) {
  return <label className={`field ${full ? "full" : ""}`}><span>{label}</span>{children}</label>;
}

function ActionButtons({ editing, onCancel }) {
  return (
    <div className="form-actions full">
      <button className="primary-btn" type="submit">{editing ? "Save Changes" : "Add Record"}</button>
      {editing && <button className="secondary-btn" type="button" onClick={onCancel}>Cancel</button>}
    </div>
  );
}

function EmptyRow({ colSpan, text = "No records found" }) {
  return <tr><td colSpan={colSpan} className="empty-row">{text}</td></tr>;
}

function TableWrap({ children }) {
  return <div className="table-wrap"><table>{children}</table></div>;
}

function Dashboard({ dashboard, customers, vehicles, appointments, serviceRecords, invoices, payments, refreshDashboard, setActive, loading }) {
  const stats = [
    ["Customers", dashboard.totalCustomers || 0, "♙", "customers"],
    ["Vehicles", dashboard.totalVehicles || 0, "▱", "vehicles"],
    ["Appointments", dashboard.totalAppointments || 0, "◷", "appointments"],
    ["Service Records", dashboard.totalServiceRecords || 0, "⚙", "services"],
    ["Invoices", dashboard.totalInvoices || 0, "▤", "invoices"],
    ["Revenue", money(dashboard.totalRevenue), "₹", "payments"],
  ];

  const recentServices = [...serviceRecords].slice(-5).reverse();
  const recentPayments = [...payments].slice(-5).reverse();

  return (
    <div className="dashboard-page">
      <section className="hero-card">
        <div>
          <div className="eyebrow">GARAGE OPERATIONS</div>
          <h2>Everything in one place.</h2>
          <p>Manage customers, vehicles, appointments, services, invoices and payments from a single workspace.</p>
        </div>
        <button className="hero-btn" onClick={refreshDashboard}>{loading ? "Refreshing..." : "↻ Refresh Data"}</button>
      </section>

      <div className="stats-grid">
        {stats.map(([label, value, icon, target]) => (
          <button key={label} className="stat-card" onClick={() => setActive(target)}>
            <div className="stat-top"><span className="stat-icon">{icon}</span><span>View →</span></div>
            <strong>{value}</strong>
            <small>{label}</small>
          </button>
        ))}
      </div>

      <div className="dashboard-grid-2">
        <PageCard>
          <div className="card-header compact"><div><h2>Recent Service Records</h2><p>Latest workshop activity</p></div></div>
          <TableWrap>
            <thead><tr><th>Service</th><th>Vehicle</th><th>Status</th><th>Total</th></tr></thead>
            <tbody>
              {recentServices.length ? recentServices.map((r) => (
                <tr key={r.id}><td><strong>{r.serviceType}</strong><small>{r.serviceDate}</small></td><td>{r.vehicle?.registrationNumber || "—"}</td><td><Status value={r.status} /></td><td>{money(r.totalCost ?? Number(r.laborCost || 0) + Number(r.partsCost || 0))}</td></tr>
              )) : <EmptyRow colSpan={4} />}
            </tbody>
          </TableWrap>
        </PageCard>

        <PageCard>
          <div className="card-header compact"><div><h2>Recent Payments</h2><p>Latest payment activity</p></div></div>
          <TableWrap>
            <thead><tr><th>Invoice</th><th>Date</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {recentPayments.length ? recentPayments.map((p) => (
                <tr key={p.id}><td>{p.invoice?.invoiceNumber || `#${p.invoice?.id || "—"}`}</td><td>{dateValue(p.paymentDate)}</td><td>{p.paymentMethod || "—"}</td><td><Status value={p.paymentStatus} /></td></tr>
              )) : <EmptyRow colSpan={4} />}
            </tbody>
          </TableWrap>
        </PageCard>
      </div>

      <div className="quick-grid">
        <QuickAction title="Add Customer" text="Register a new customer" onClick={() => setActive("customers")} />
        <QuickAction title="Add Vehicle" text="Register a customer vehicle" onClick={() => setActive("vehicles")} />
        <QuickAction title="Book Appointment" text="Schedule a garage visit" onClick={() => setActive("appointments")} />
        <QuickAction title="Create Invoice" text="Generate a service invoice" onClick={() => setActive("invoices")} />
      </div>
    </div>
  );
}

function QuickAction({ title, text, onClick }) {
  return <button className="quick-action" onClick={onClick}><span>+</span><div><strong>{title}</strong><small>{text}</small></div><b>→</b></button>;
}

function Status({ value }) {
  const text = String(value || "—");
  const cls = text.toLowerCase().replace(/\s+/g, "-");
  return <span className={`status status-${cls}`}>{text}</span>;
}

function CustomersPage({ form, setForm, editing, onSubmit, onCancel, items, onEdit, onDelete }) {
  return <>
    <PageCard><FormHeader title="Customer" editing={editing} /><form className="form-grid" onSubmit={onSubmit}>
      <Field label="Full Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Gokul Krishna" /></Field>
      <Field label="Phone"><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 9876543210" /></Field>
      <Field label="Email"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="customer@email.com" /></Field>
      <Field label="Address"><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="City / address" /></Field>
      <ActionButtons editing={editing} onCancel={onCancel} />
    </form></PageCard>
    <PageCard><div className="card-header compact"><div><h2>Customer List</h2><p>{items.length} customer(s)</p></div></div><TableWrap>
      <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Actions</th></tr></thead>
      <tbody>{items.length ? items.map((x) => <tr key={x.id}><td>#{x.id}</td><td><strong>{x.name}</strong></td><td>{x.phone}</td><td>{x.email || "—"}</td><td>{x.address || "—"}</td><td><RowActions onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>) : <EmptyRow colSpan={6} />}</tbody>
    </TableWrap></PageCard>
  </>;
}

function VehiclesPage({ form, setForm, editing, customers, onSubmit, onCancel, items, onEdit, onDelete }) {
  return <>
    <PageCard><FormHeader title="Vehicle" editing={editing} /><form className="form-grid" onSubmit={onSubmit}>
      <Field label="Registration Number"><input required value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} placeholder="TN56W1111" /></Field>
      <Field label="Brand"><input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Skoda" /></Field>
      <Field label="Model"><input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Kylaq" /></Field>
      <Field label="Year"><input required value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2026" /></Field>
      <Field label="Color"><input required value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="Blue" /></Field>
      <Field label="Customer"><select required value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}><option value="">Select Customer</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
      <ActionButtons editing={editing} onCancel={onCancel} />
    </form></PageCard>
    <PageCard><div className="card-header compact"><div><h2>Vehicle List</h2><p>{items.length} vehicle(s)</p></div></div><TableWrap>
      <thead><tr><th>ID</th><th>Vehicle</th><th>Registration</th><th>Year</th><th>Color</th><th>Customer</th><th>Actions</th></tr></thead>
      <tbody>{items.length ? items.map((x) => <tr key={x.id}><td>#{x.id}</td><td><strong>{x.brand} {x.model}</strong></td><td className="mono">{x.registrationNumber}</td><td>{x.year}</td><td>{x.color}</td><td>{x.customer?.name || "—"}</td><td><RowActions onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>) : <EmptyRow colSpan={7} />}</tbody>
    </TableWrap></PageCard>
  </>;
}

function AppointmentsPage({ form, setForm, editing, customers, vehicles, onSubmit, onCancel, items, onEdit, onDelete }) {
  return <>
    <PageCard><FormHeader title="Appointment" editing={editing} /><form className="form-grid" onSubmit={onSubmit}>
      <Field label="Appointment Date"><input type="date" required value={form.appointmentDate} onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })} /></Field>
      <Field label="Appointment Time"><input type="time" required value={form.appointmentTime} onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })} /></Field>
      <Field label="Status"><select required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>BOOKED</option><option>PENDING</option><option>COMPLETED</option><option>CANCELLED</option><option>NO_SHOW</option><option>RESCHEDULED</option></select></Field>
      <Field label="Customer"><select required value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}><option value="">Select Customer</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
      <Field label="Vehicle"><select required value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}><option value="">Select Vehicle</option>{vehicles.map((v) => <option key={v.id} value={v.id}>{v.registrationNumber} — {v.brand} {v.model}</option>)}</select></Field>
      <Field label="Description" full><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Reason for appointment..." /></Field>
      <ActionButtons editing={editing} onCancel={onCancel} />
    </form></PageCard>
    <PageCard><div className="card-header compact"><div><h2>Appointment List</h2><p>{items.length} appointment(s)</p></div></div><TableWrap>
      <thead><tr><th>ID</th><th>Date</th><th>Time</th><th>Customer</th><th>Vehicle</th><th>Status</th><th>Description</th><th>Actions</th></tr></thead>
      <tbody>{items.length ? items.map((x) => <tr key={x.id}><td>#{x.id}</td><td>{dateValue(x.appointmentDate)}</td><td>{x.appointmentTime}</td><td>{x.customer?.name || "—"}</td><td>{x.vehicle?.registrationNumber || "—"}</td><td><Status value={x.status} /></td><td>{x.description || "—"}</td><td><RowActions onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>) : <EmptyRow colSpan={8} />}</tbody>
    </TableWrap></PageCard>
  </>;
}

function ServicesPage({ form, setForm, editing, customers, vehicles, appointments, onSubmit, onCancel, items, onEdit, onDelete }) {
  return <>
    <PageCard><FormHeader title="Service Record" editing={editing} /><form className="form-grid" onSubmit={onSubmit}>
      <Field label="Service Type"><input required value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} placeholder="Premium Full Service" /></Field>
      <Field label="Service Date"><input type="date" required value={form.serviceDate} onChange={(e) => setForm({ ...form, serviceDate: e.target.value })} /></Field>
      <Field label="Labor Cost"><input type="number" min="0" step="0.01" value={form.laborCost} onChange={(e) => setForm({ ...form, laborCost: e.target.value })} placeholder="1500" /></Field>
      <Field label="Parts Cost"><input type="number" min="0" step="0.01" value={form.partsCost} onChange={(e) => setForm({ ...form, partsCost: e.target.value })} placeholder="3000" /></Field>
      <Field label="Status"><select required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>IN_PROGRESS</option><option>PENDING</option><option>COMPLETED</option><option>CANCELLED</option></select></Field>
      <Field label="Customer"><select required value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}><option value="">Select Customer</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
      <Field label="Vehicle"><select required value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}><option value="">Select Vehicle</option>{vehicles.map((v) => <option key={v.id} value={v.id}>{v.registrationNumber} — {v.brand} {v.model}</option>)}</select></Field>
      <Field label="Appointment"><select required value={form.appointmentId} onChange={(e) => setForm({ ...form, appointmentId: e.target.value })}><option value="">Select Appointment</option>{appointments.map((a) => <option key={a.id} value={a.id}>#{a.id} — {dateValue(a.appointmentDate)} — {a.vehicle?.registrationNumber || "Vehicle"}</option>)}</select></Field>
      <Field label="Description" full><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Work performed, parts replaced, notes..." /></Field>
      <ActionButtons editing={editing} onCancel={onCancel} />
    </form></PageCard>
    <PageCard><div className="card-header compact"><div><h2>Service Records</h2><p>{items.length} service record(s)</p></div></div><TableWrap>
      <thead><tr><th>ID</th><th>Service</th><th>Date</th><th>Customer</th><th>Vehicle</th><th>Labor</th><th>Parts</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{items.length ? items.map((x) => { const total = x.totalCost ?? Number(x.laborCost || 0) + Number(x.partsCost || 0); return <tr key={x.id}><td>#{x.id}</td><td><strong>{x.serviceType}</strong><small>{x.description || ""}</small></td><td>{dateValue(x.serviceDate)}</td><td>{x.customer?.name || "—"}</td><td>{x.vehicle?.registrationNumber || "—"}</td><td>{money(x.laborCost)}</td><td>{money(x.partsCost)}</td><td><strong>{money(total)}</strong></td><td><Status value={x.status} /></td><td><RowActions onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>; }) : <EmptyRow colSpan={10} />}</tbody>
    </TableWrap></PageCard>
  </>;
}

function InvoicesPage({ form, setForm, editing, serviceRecords, onSubmit, onCancel, items, onEdit, onDelete }) {
  return <>
    <PageCard><FormHeader title="Invoice" editing={editing} /><form className="form-grid" onSubmit={onSubmit}>
      <Field label="Invoice Number"><input required value={form.invoiceNumber} onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })} placeholder="INV-001" /></Field>
      <Field label="Invoice Date"><input type="date" required value={form.invoiceDate} onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })} /></Field>
      <Field label="Status"><select required value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>UNPAID</option><option>PAID</option><option>CANCELLED</option></select></Field>
      <Field label="Service Record"><select required value={form.serviceRecordId} onChange={(e) => setForm({ ...form, serviceRecordId: e.target.value })}><option value="">Select Service Record</option>{serviceRecords.map((s) => <option key={s.id} value={s.id}>#{s.id} — {s.serviceType} — {s.vehicle?.registrationNumber || "Vehicle"}</option>)}</select></Field>
      <ActionButtons editing={editing} onCancel={onCancel} />
    </form></PageCard>
    <PageCard><div className="card-header compact"><div><h2>Invoices</h2><p>{items.length} invoice(s)</p></div></div><TableWrap>
      <thead><tr><th>ID</th><th>Invoice</th><th>Date</th><th>Service</th><th>Vehicle</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{items.length ? items.map((x) => <tr key={x.id}><td>#{x.id}</td><td><strong>{x.invoiceNumber}</strong></td><td>{dateValue(x.invoiceDate)}</td><td>{x.serviceRecord?.serviceType || "—"}</td><td>{x.serviceRecord?.vehicle?.registrationNumber || "—"}</td><td><strong>{money(x.totalAmount ?? x.serviceRecord?.totalCost)}</strong></td><td><Status value={x.status} /></td><td><RowActions onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>) : <EmptyRow colSpan={8} />}</tbody>
    </TableWrap></PageCard>
  </>;
}

function PaymentsPage({ form, setForm, editing, invoices, onSubmit, onCancel, items, onEdit, onDelete }) {
  return <>
    <PageCard><FormHeader title="Payment" editing={editing} /><form className="form-grid" onSubmit={onSubmit}>
      <Field label="Payment Date"><input type="date" required value={form.paymentDate} onChange={(e) => setForm({ ...form, paymentDate: e.target.value })} /></Field>
      <Field label="Payment Method"><select required value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}><option>CASH</option><option>UPI</option><option>CARD</option><option>BANK_TRANSFER</option><option>CHEQUE</option></select></Field>
      <Field label="Payment Status"><select required value={form.paymentStatus} onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}><option>PAID</option><option>PENDING</option><option>FAILED</option><option>REFUNDED</option></select></Field>
      <Field label="Transaction Reference"><input value={form.transactionReference} onChange={(e) => setForm({ ...form, transactionReference: e.target.value })} placeholder="TXN001" /></Field>
      <Field label="Invoice"><select required value={form.invoiceId} onChange={(e) => setForm({ ...form, invoiceId: e.target.value })}><option value="">Select Invoice</option>{invoices.map((i) => <option key={i.id} value={i.id}>{i.invoiceNumber} — {money(i.totalAmount ?? i.serviceRecord?.totalCost)}</option>)}</select></Field>
      <ActionButtons editing={editing} onCancel={onCancel} />
    </form></PageCard>
    <PageCard><div className="card-header compact"><div><h2>Payments</h2><p>{items.length} payment(s)</p></div></div><TableWrap>
      <thead><tr><th>ID</th><th>Date</th><th>Invoice</th><th>Amount</th><th>Method</th><th>Reference</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{items.length ? items.map((x) => <tr key={x.id}><td>#{x.id}</td><td>{dateValue(x.paymentDate)}</td><td>{x.invoice?.invoiceNumber || `#${x.invoice?.id || "—"}`}</td><td>{money(x.invoice?.totalAmount ?? x.invoice?.serviceRecord?.totalCost)}</td><td>{x.paymentMethod || "—"}</td><td className="mono">{x.transactionReference || "—"}</td><td><Status value={x.paymentStatus} /></td><td><RowActions onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>) : <EmptyRow colSpan={8} />}</tbody>
    </TableWrap></PageCard>
  </>;
}

function RowActions({ onEdit, onDelete }) {
  return <div className="row-actions"><button className="edit-btn" onClick={onEdit}>Edit</button><button className="delete-btn" onClick={onDelete}>Delete</button></div>;
}

export default App;

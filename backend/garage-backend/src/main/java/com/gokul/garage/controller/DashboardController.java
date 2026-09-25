package com.gokul.garage.controller;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gokul.garage.repository.AppointmentRepository;
import com.gokul.garage.repository.CustomerRepository;
import com.gokul.garage.repository.InvoiceRepository;
import com.gokul.garage.repository.ServiceRecordRepository;
import com.gokul.garage.repository.VehicleRepository;

@RestController
public class DashboardController {

    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;
    private final AppointmentRepository appointmentRepository;
    private final ServiceRecordRepository serviceRecordRepository;
    private final InvoiceRepository invoiceRepository;

    public DashboardController(
            CustomerRepository customerRepository,
            VehicleRepository vehicleRepository,
            AppointmentRepository appointmentRepository,
            ServiceRecordRepository serviceRecordRepository,
            InvoiceRepository invoiceRepository) {

        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.appointmentRepository = appointmentRepository;
        this.serviceRecordRepository = serviceRecordRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {

        Map<String, Object> dashboard = new LinkedHashMap<>();

        dashboard.put("totalCustomers",
                customerRepository.count());

        dashboard.put("totalVehicles",
                vehicleRepository.count());

        dashboard.put("totalAppointments",
                appointmentRepository.count());

        dashboard.put("totalServiceRecords",
                serviceRecordRepository.count());

        dashboard.put("totalInvoices",
                invoiceRepository.count());

        BigDecimal totalRevenue = invoiceRepository.findAll()
                .stream()
                .filter(invoice -> "Paid".equalsIgnoreCase(invoice.getStatus()))
                .map(invoice -> invoice.getTotalAmount())
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        dashboard.put("totalRevenue", totalRevenue);

        return dashboard;
    }
}
package com.gokul.garage.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.gokul.garage.dto.AppointmentRequest;
import com.gokul.garage.entity.Appointment;
import com.gokul.garage.entity.Customer;
import com.gokul.garage.entity.Vehicle;
import com.gokul.garage.service.AppointmentService;
import com.gokul.garage.service.CustomerService;
import com.gokul.garage.service.VehicleService;

@RestController
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final CustomerService customerService;
    private final VehicleService vehicleService;

    public AppointmentController(
            AppointmentService appointmentService,
            CustomerService customerService,
            VehicleService vehicleService) {

        this.appointmentService = appointmentService;
        this.customerService = customerService;
        this.vehicleService = vehicleService;
    }

    @PostMapping("/appointments")
    public Appointment createAppointment(
            @Valid @RequestBody AppointmentRequest request) {

        Customer customer =
                customerService.getCustomerById(request.getCustomerId());

        Vehicle vehicle =
                vehicleService.getVehicleById(request.getVehicleId());

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(
                request.getAppointmentDate());

        appointment.setAppointmentTime(
                request.getAppointmentTime());

        appointment.setStatus(request.getStatus());

        appointment.setDescription(
                request.getDescription());

        appointment.setCustomer(customer);
        appointment.setVehicle(vehicle);

        return appointmentService.saveAppointment(appointment);
    }

    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/appointments/{id}")
    public Appointment getAppointmentById(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/appointments/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest request) {

        Customer customer =
                customerService.getCustomerById(request.getCustomerId());

        Vehicle vehicle =
                vehicleService.getVehicleById(request.getVehicleId());

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(
                request.getAppointmentDate());

        appointment.setAppointmentTime(
                request.getAppointmentTime());

        appointment.setStatus(request.getStatus());

        appointment.setDescription(
                request.getDescription());

        appointment.setCustomer(customer);
        appointment.setVehicle(vehicle);

        return appointmentService.updateAppointment(
                id,
                appointment);
    }

    @DeleteMapping("/appointments/{id}")
    public void deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);
    }

    @GetMapping("/vehicles/{vehicleId}/appointments")
    public List<Appointment> getAppointmentsByVehicleId(
            @PathVariable Long vehicleId) {

        return appointmentService
                .getAppointmentsByVehicleId(vehicleId);
    }
}
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

import com.gokul.garage.dto.ServiceRecordRequest;
import com.gokul.garage.entity.Appointment;
import com.gokul.garage.entity.Customer;
import com.gokul.garage.entity.ServiceRecord;
import com.gokul.garage.entity.Vehicle;
import com.gokul.garage.service.AppointmentService;
import com.gokul.garage.service.CustomerService;
import com.gokul.garage.service.ServiceRecordService;
import com.gokul.garage.service.VehicleService;

@RestController
public class ServiceRecordController {

    private final ServiceRecordService serviceRecordService;
    private final CustomerService customerService;
    private final VehicleService vehicleService;
    private final AppointmentService appointmentService;

    public ServiceRecordController(
            ServiceRecordService serviceRecordService,
            CustomerService customerService,
            VehicleService vehicleService,
            AppointmentService appointmentService) {

        this.serviceRecordService = serviceRecordService;
        this.customerService = customerService;
        this.vehicleService = vehicleService;
        this.appointmentService = appointmentService;
    }

    @PostMapping("/service-records")
    public ServiceRecord createServiceRecord(
            @Valid @RequestBody ServiceRecordRequest request) {

        Customer customer =
                customerService.getCustomerById(request.getCustomerId());

        Vehicle vehicle =
                vehicleService.getVehicleById(request.getVehicleId());

        Appointment appointment =
                appointmentService.getAppointmentById(
                        request.getAppointmentId());

        ServiceRecord serviceRecord = new ServiceRecord();

        serviceRecord.setServiceType(request.getServiceType());
        serviceRecord.setDescription(request.getDescription());
        serviceRecord.setServiceDate(request.getServiceDate());
        serviceRecord.setLaborCost(request.getLaborCost());
        serviceRecord.setPartsCost(request.getPartsCost());
        serviceRecord.setStatus(request.getStatus());

        serviceRecord.setCustomer(customer);
        serviceRecord.setVehicle(vehicle);
        serviceRecord.setAppointment(appointment);

        return serviceRecordService.saveServiceRecord(serviceRecord);
    }

    @GetMapping("/service-records")
    public List<ServiceRecord> getAllServiceRecords() {
        return serviceRecordService.getAllServiceRecords();
    }

    @GetMapping("/service-records/{id}")
    public ServiceRecord getServiceRecordById(
            @PathVariable Long id) {

        return serviceRecordService.getServiceRecordById(id);
    }

    @PutMapping("/service-records/{id}")
    public ServiceRecord updateServiceRecord(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRecordRequest request) {

        Customer customer =
                customerService.getCustomerById(request.getCustomerId());

        Vehicle vehicle =
                vehicleService.getVehicleById(request.getVehicleId());

        Appointment appointment =
                appointmentService.getAppointmentById(
                        request.getAppointmentId());

        ServiceRecord serviceRecord = new ServiceRecord();

        serviceRecord.setServiceType(request.getServiceType());
        serviceRecord.setDescription(request.getDescription());
        serviceRecord.setServiceDate(request.getServiceDate());
        serviceRecord.setLaborCost(request.getLaborCost());
        serviceRecord.setPartsCost(request.getPartsCost());
        serviceRecord.setStatus(request.getStatus());

        serviceRecord.setCustomer(customer);
        serviceRecord.setVehicle(vehicle);
        serviceRecord.setAppointment(appointment);

        return serviceRecordService.updateServiceRecord(
                id,
                serviceRecord);
    }

    @DeleteMapping("/service-records/{id}")
    public void deleteServiceRecord(
            @PathVariable Long id) {

        serviceRecordService.deleteServiceRecord(id);
    }

    @GetMapping("/vehicles/{vehicleId}/service-records")
    public List<ServiceRecord> getServiceRecordsByVehicleId(
            @PathVariable Long vehicleId) {

        return serviceRecordService
                .getServiceRecordsByVehicleId(vehicleId);
    }
}
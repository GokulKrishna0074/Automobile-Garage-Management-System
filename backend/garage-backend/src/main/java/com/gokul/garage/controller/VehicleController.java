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

import com.gokul.garage.dto.VehicleRequest;
import com.gokul.garage.entity.Customer;
import com.gokul.garage.entity.Vehicle;
import com.gokul.garage.service.CustomerService;
import com.gokul.garage.service.VehicleService;

@RestController
public class VehicleController {

    private final VehicleService vehicleService;
    private final CustomerService customerService;

    public VehicleController(
            VehicleService vehicleService,
            CustomerService customerService) {

        this.vehicleService = vehicleService;
        this.customerService = customerService;
    }

    @PostMapping("/vehicles")
    public Vehicle createVehicle(
            @Valid @RequestBody VehicleRequest request) {

        Customer customer =
                customerService.getCustomerById(request.getCustomerId());

        Vehicle vehicle = new Vehicle();

        vehicle.setRegistrationNumber(
                request.getRegistrationNumber());
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setCustomer(customer);

        return vehicleService.saveVehicle(vehicle);
    }

    @GetMapping("/vehicles")
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/vehicles/{id}")
    public Vehicle getVehicleById(
            @PathVariable Long id) {

        return vehicleService.getVehicleById(id);
    }

    @PutMapping("/vehicles/{id}")
    public Vehicle updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request) {

        Customer customer =
                customerService.getCustomerById(request.getCustomerId());

        Vehicle vehicle = new Vehicle();

        vehicle.setRegistrationNumber(
                request.getRegistrationNumber());
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setCustomer(customer);

        return vehicleService.updateVehicle(id, vehicle);
    }

    @DeleteMapping("/vehicles/{id}")
    public void deleteVehicle(
            @PathVariable Long id) {

        vehicleService.deleteVehicle(id);
    }
}
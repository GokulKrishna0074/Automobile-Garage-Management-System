package com.gokul.garage.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gokul.garage.entity.Vehicle;
import com.gokul.garage.exception.VehicleNotFoundException;
import com.gokul.garage.repository.VehicleRepository;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(
                        "Vehicle not found with id: " + id));
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicle) {

        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(
                        "Vehicle not found with id: " + id));

        existingVehicle.setRegistrationNumber(vehicle.getRegistrationNumber());
        existingVehicle.setBrand(vehicle.getBrand());
        existingVehicle.setModel(vehicle.getModel());
        existingVehicle.setYear(vehicle.getYear());
        existingVehicle.setColor(vehicle.getColor());

        return vehicleRepository.save(existingVehicle);
    }

    public void deleteVehicle(Long id) {

        if (!vehicleRepository.existsById(id)) {
            throw new VehicleNotFoundException(
                    "Vehicle not found with id: " + id);
        }

        vehicleRepository.deleteById(id);
    }
}
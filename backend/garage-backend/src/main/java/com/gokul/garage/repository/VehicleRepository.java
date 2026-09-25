package com.gokul.garage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gokul.garage.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}
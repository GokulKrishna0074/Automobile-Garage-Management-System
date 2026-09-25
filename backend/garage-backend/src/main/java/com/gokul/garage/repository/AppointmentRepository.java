package com.gokul.garage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gokul.garage.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByVehicleId(Long vehicleId);
}
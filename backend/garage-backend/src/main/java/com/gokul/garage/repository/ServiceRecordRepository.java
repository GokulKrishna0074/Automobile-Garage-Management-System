package com.gokul.garage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gokul.garage.entity.ServiceRecord;

public interface ServiceRecordRepository
        extends JpaRepository<ServiceRecord, Long> {

    List<ServiceRecord> findByVehicleId(Long vehicleId);
}
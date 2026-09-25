package com.gokul.garage.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gokul.garage.entity.ServiceRecord;
import com.gokul.garage.exception.ServiceRecordNotFoundException;
import com.gokul.garage.repository.ServiceRecordRepository;

@Service
public class ServiceRecordService {

    private final ServiceRecordRepository serviceRecordRepository;

    public ServiceRecordService(ServiceRecordRepository serviceRecordRepository) {
        this.serviceRecordRepository = serviceRecordRepository;
    }

    public ServiceRecord saveServiceRecord(ServiceRecord serviceRecord) {

        if (serviceRecord.getLaborCost() != null
                && serviceRecord.getPartsCost() != null) {

            serviceRecord.setTotalCost(
                    serviceRecord.getLaborCost()
                            .add(serviceRecord.getPartsCost()));
        }

        return serviceRecordRepository.save(serviceRecord);
    }

    public List<ServiceRecord> getAllServiceRecords() {
        return serviceRecordRepository.findAll();
    }

    public ServiceRecord getServiceRecordById(Long id) {

        return serviceRecordRepository.findById(id)
                .orElseThrow(() -> new ServiceRecordNotFoundException(
                        "Service record not found with id: " + id));
    }

    public ServiceRecord updateServiceRecord(
            Long id,
            ServiceRecord serviceRecord) {

        ServiceRecord existingServiceRecord =
                serviceRecordRepository.findById(id)
                        .orElseThrow(() -> new ServiceRecordNotFoundException(
                                "Service record not found with id: " + id));

        existingServiceRecord.setServiceType(
                serviceRecord.getServiceType());

        existingServiceRecord.setDescription(
                serviceRecord.getDescription());

        existingServiceRecord.setServiceDate(
                serviceRecord.getServiceDate());

        existingServiceRecord.setLaborCost(
                serviceRecord.getLaborCost());

        existingServiceRecord.setPartsCost(
                serviceRecord.getPartsCost());

        existingServiceRecord.setStatus(
                serviceRecord.getStatus());

        existingServiceRecord.setCustomer(
                serviceRecord.getCustomer());

        existingServiceRecord.setVehicle(
                serviceRecord.getVehicle());

        existingServiceRecord.setAppointment(
                serviceRecord.getAppointment());

        if (serviceRecord.getLaborCost() != null
                && serviceRecord.getPartsCost() != null) {

            existingServiceRecord.setTotalCost(
                    serviceRecord.getLaborCost()
                            .add(serviceRecord.getPartsCost()));
        }

        return serviceRecordRepository.save(existingServiceRecord);
    }

    public void deleteServiceRecord(Long id) {

        if (!serviceRecordRepository.existsById(id)) {

            throw new ServiceRecordNotFoundException(
                    "Service record not found with id: " + id);
        }

        serviceRecordRepository.deleteById(id);
    }
    public List<ServiceRecord> getServiceRecordsByVehicleId(Long vehicleId) {
    return serviceRecordRepository.findByVehicleId(vehicleId);
    }
}
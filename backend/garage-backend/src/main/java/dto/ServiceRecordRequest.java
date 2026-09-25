package com.gokul.garage.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ServiceRecordRequest {

    @NotBlank(message = "Service type is required")
    private String serviceType;

    private String description;

    @NotNull(message = "Service date is required")
    private LocalDate serviceDate;

    @DecimalMin(
        value = "0.0",
        message = "Labor cost cannot be negative"
    )
    private BigDecimal laborCost;

    @DecimalMin(
        value = "0.0",
        message = "Parts cost cannot be negative"
    )
    private BigDecimal partsCost;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotNull(message = "Vehicle ID is required")
    private Long vehicleId;

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    public String getServiceType() {
        return serviceType;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public BigDecimal getLaborCost() {
        return laborCost;
    }

    public BigDecimal getPartsCost() {
        return partsCost;
    }

    public String getStatus() {
        return status;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public void setLaborCost(BigDecimal laborCost) {
        this.laborCost = laborCost;
    }

    public void setPartsCost(BigDecimal partsCost) {
        this.partsCost = partsCost;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }
}
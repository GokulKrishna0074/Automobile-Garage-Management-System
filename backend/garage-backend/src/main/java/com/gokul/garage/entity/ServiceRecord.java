package com.gokul.garage.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "service_records")
public class ServiceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    private BigDecimal totalCost;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Customer is required")
    @ManyToOne
    private Customer customer;

    @NotNull(message = "Vehicle is required")
    @ManyToOne
    private Vehicle vehicle;

    @NotNull(message = "Appointment is required")
    @ManyToOne
    private Appointment appointment;

    public Long getId() {
        return id;
    }

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

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public String getStatus() {
        return status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
package com.gokul.garage.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gokul.garage.entity.Appointment;
import com.gokul.garage.exception.AppointmentNotFoundException;
import com.gokul.garage.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(
                        "Appointment not found with id: " + id));
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {

        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(
                        "Appointment not found with id: " + id));

        existingAppointment.setAppointmentDate(appointment.getAppointmentDate());
        existingAppointment.setAppointmentTime(appointment.getAppointmentTime());
        existingAppointment.setStatus(appointment.getStatus());
        existingAppointment.setDescription(appointment.getDescription());
        existingAppointment.setCustomer(appointment.getCustomer());
        existingAppointment.setVehicle(appointment.getVehicle());

        return appointmentRepository.save(existingAppointment);
    }

    public void deleteAppointment(Long id) {

        if (!appointmentRepository.existsById(id)) {
            throw new AppointmentNotFoundException(
                    "Appointment not found with id: " + id);
        }

        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByVehicleId(Long vehicleId) {
    return appointmentRepository.findByVehicleId(vehicleId);
}
}
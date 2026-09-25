package com.gokul.garage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gokul.garage.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
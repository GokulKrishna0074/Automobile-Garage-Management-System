package com.gokul.garage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gokul.garage.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
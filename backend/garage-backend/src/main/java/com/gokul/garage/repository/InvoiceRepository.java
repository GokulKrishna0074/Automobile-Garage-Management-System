package com.gokul.garage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gokul.garage.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

}
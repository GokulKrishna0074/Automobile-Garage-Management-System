package com.gokul.garage.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gokul.garage.entity.Invoice;
import com.gokul.garage.entity.ServiceRecord;
import com.gokul.garage.exception.InvoiceNotFoundException;
import com.gokul.garage.repository.InvoiceRepository;
import com.gokul.garage.repository.ServiceRecordRepository;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ServiceRecordRepository serviceRecordRepository;

    public InvoiceService(
            InvoiceRepository invoiceRepository,
            ServiceRecordRepository serviceRecordRepository) {

        this.invoiceRepository = invoiceRepository;
        this.serviceRecordRepository = serviceRecordRepository;
    }

    public Invoice saveInvoice(Invoice invoice) {

        ServiceRecord serviceRecord =
                serviceRecordRepository.findById(
                        invoice.getServiceRecord().getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Service record not found"));

        BigDecimal subtotal = serviceRecord.getTotalCost();

        BigDecimal tax = subtotal
                .multiply(new BigDecimal("0.18"));

        BigDecimal totalAmount = subtotal.add(tax);

        invoice.setSubtotal(subtotal);
        invoice.setTax(tax);
        invoice.setTotalAmount(totalAmount);

        invoice.setCustomer(serviceRecord.getCustomer());
        invoice.setVehicle(serviceRecord.getVehicle());

        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {

        return invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new InvoiceNotFoundException(
                                "Invoice not found with id: " + id));
    }

    public Invoice updateInvoice(Long id, Invoice invoice) {

        Invoice existingInvoice =
                invoiceRepository.findById(id)
                        .orElseThrow(() ->
                                new InvoiceNotFoundException(
                                        "Invoice not found with id: " + id));

        existingInvoice.setInvoiceNumber(
                invoice.getInvoiceNumber());

        existingInvoice.setInvoiceDate(
                invoice.getInvoiceDate());

        existingInvoice.setStatus(
                invoice.getStatus());

        ServiceRecord serviceRecord =
                serviceRecordRepository.findById(
                        invoice.getServiceRecord().getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Service record not found"));

        BigDecimal subtotal = serviceRecord.getTotalCost();

        BigDecimal tax = subtotal
                .multiply(new BigDecimal("0.18"));

        BigDecimal totalAmount = subtotal.add(tax);

        existingInvoice.setSubtotal(subtotal);
        existingInvoice.setTax(tax);
        existingInvoice.setTotalAmount(totalAmount);

        existingInvoice.setCustomer(serviceRecord.getCustomer());
        existingInvoice.setVehicle(serviceRecord.getVehicle());
        existingInvoice.setServiceRecord(serviceRecord);

        return invoiceRepository.save(existingInvoice);
    }

    public void deleteInvoice(Long id) {

        if (!invoiceRepository.existsById(id)) {

            throw new InvoiceNotFoundException(
                    "Invoice not found with id: " + id);
        }

        invoiceRepository.deleteById(id);
    }
}
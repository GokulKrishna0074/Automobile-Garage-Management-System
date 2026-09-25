package com.gokul.garage.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.gokul.garage.dto.InvoiceRequest;
import com.gokul.garage.entity.Invoice;
import com.gokul.garage.entity.ServiceRecord;
import com.gokul.garage.service.InvoiceService;
import com.gokul.garage.service.ServiceRecordService;

@RestController
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final ServiceRecordService serviceRecordService;

    public InvoiceController(
            InvoiceService invoiceService,
            ServiceRecordService serviceRecordService) {

        this.invoiceService = invoiceService;
        this.serviceRecordService = serviceRecordService;
    }

    @PostMapping("/invoices")
    public Invoice createInvoice(
            @Valid @RequestBody InvoiceRequest request) {

        ServiceRecord serviceRecord =
                serviceRecordService.getServiceRecordById(
                        request.getServiceRecordId());

        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber(request.getInvoiceNumber());
        invoice.setInvoiceDate(request.getInvoiceDate());
        invoice.setStatus(request.getStatus());
        invoice.setServiceRecord(serviceRecord);

        return invoiceService.saveInvoice(invoice);
    }

    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/invoices/{id}")
    public Invoice getInvoiceById(
            @PathVariable Long id) {

        return invoiceService.getInvoiceById(id);
    }

    @PutMapping("/invoices/{id}")
    public Invoice updateInvoice(
            @PathVariable Long id,
            @Valid @RequestBody InvoiceRequest request) {

        ServiceRecord serviceRecord =
                serviceRecordService.getServiceRecordById(
                        request.getServiceRecordId());

        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber(request.getInvoiceNumber());
        invoice.setInvoiceDate(request.getInvoiceDate());
        invoice.setStatus(request.getStatus());
        invoice.setServiceRecord(serviceRecord);

        return invoiceService.updateInvoice(id, invoice);
    }

    @DeleteMapping("/invoices/{id}")
    public void deleteInvoice(
            @PathVariable Long id) {

        invoiceService.deleteInvoice(id);
    }
}
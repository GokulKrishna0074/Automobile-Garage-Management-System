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

import com.gokul.garage.dto.PaymentRequest;
import com.gokul.garage.entity.Invoice;
import com.gokul.garage.entity.Payment;
import com.gokul.garage.service.InvoiceService;
import com.gokul.garage.service.PaymentService;

@RestController
public class PaymentController {

    private final PaymentService paymentService;
    private final InvoiceService invoiceService;

    public PaymentController(
            PaymentService paymentService,
            InvoiceService invoiceService) {

        this.paymentService = paymentService;
        this.invoiceService = invoiceService;
    }

    @PostMapping("/payments")
    public Payment createPayment(
            @Valid @RequestBody PaymentRequest request) {

        Invoice invoice =
                invoiceService.getInvoiceById(
                        request.getInvoiceId());

        Payment payment = new Payment();

        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());
        payment.setTransactionReference(
                request.getTransactionReference());

        payment.setInvoice(invoice);

        return paymentService.savePayment(payment);
    }

    @GetMapping("/payments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/payments/{id}")
    public Payment getPaymentById(
            @PathVariable Long id) {

        return paymentService.getPaymentById(id);
    }

    @PutMapping("/payments/{id}")
    public Payment updatePayment(
            @PathVariable Long id,
            @Valid @RequestBody PaymentRequest request) {

        Invoice invoice =
                invoiceService.getInvoiceById(
                        request.getInvoiceId());

        Payment payment = new Payment();

        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());
        payment.setTransactionReference(
                request.getTransactionReference());

        payment.setInvoice(invoice);

        return paymentService.updatePayment(id, payment);
    }

    @DeleteMapping("/payments/{id}")
    public void deletePayment(
            @PathVariable Long id) {

        paymentService.deletePayment(id);
    }
}
package com.gokul.garage.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gokul.garage.entity.Invoice;
import com.gokul.garage.entity.Payment;
import com.gokul.garage.exception.PaymentNotFoundException;
import com.gokul.garage.repository.InvoiceRepository;
import com.gokul.garage.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    public PaymentService(
            PaymentRepository paymentRepository,
            InvoiceRepository invoiceRepository) {

        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
    }

    public Payment savePayment(Payment payment) {

        Invoice invoice = invoiceRepository.findById(
                payment.getInvoice().getId()
        ).orElseThrow(() ->
                new RuntimeException("Invoice not found"));

        BigDecimal invoiceAmount = invoice.getTotalAmount();

        payment.setAmountPaid(invoiceAmount);
        payment.setInvoice(invoice);

        Payment savedPayment = paymentRepository.save(payment);

        invoice.setStatus("Paid");
        invoiceRepository.save(invoice);

        return savedPayment;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {

        return paymentRepository.findById(id)
                .orElseThrow(() ->
                        new PaymentNotFoundException(
                                "Payment not found with id: " + id));
    }

    public Payment updatePayment(Long id, Payment payment) {

        Payment existingPayment =
                paymentRepository.findById(id)
                        .orElseThrow(() ->
                                new PaymentNotFoundException(
                                        "Payment not found with id: " + id));

        existingPayment.setPaymentDate(
                payment.getPaymentDate());

        existingPayment.setPaymentMethod(
                payment.getPaymentMethod());

        existingPayment.setPaymentStatus(
                payment.getPaymentStatus());

        existingPayment.setTransactionReference(
                payment.getTransactionReference());

        Invoice invoice = invoiceRepository.findById(
                payment.getInvoice().getId()
        ).orElseThrow(() ->
                new RuntimeException("Invoice not found"));

        existingPayment.setInvoice(invoice);
        existingPayment.setAmountPaid(invoice.getTotalAmount());

        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long id) {

        if (!paymentRepository.existsById(id)) {

            throw new PaymentNotFoundException(
                    "Payment not found with id: " + id);
        }

        paymentRepository.deleteById(id);
    }
}
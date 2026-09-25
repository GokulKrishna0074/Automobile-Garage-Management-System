package com.gokul.garage.exception;

public class ServiceRecordNotFoundException extends RuntimeException {

    public ServiceRecordNotFoundException(String message) {
        super(message);
    }
}
package com.example.weconnectapp;

import java.io.Serializable;

public class SerializableValue implements Serializable {
    private Object value;

    public SerializableValue(Object value) {
        if (!(value instanceof Serializable)) {
            throw new IllegalArgumentException("Provided value must be serializable");
        }
        this.value = value;
    }

    public Object getValue() {
        return value;
    }
}
package com.example.weconnectapp;
import java.io.Serializable;
import java.util.List;

public class ResponsesWrapper implements Serializable {
    private List<com.example.weconnectapp.Response> responses;

    public ResponsesWrapper(List<com.example.weconnectapp.Response> responses) {
        this.responses = responses;
    }

    public List<com.example.weconnectapp.Response> getResponses() {
        return responses;
    }

    public void setResponses(List<com.example.weconnectapp.Response> responses) {
        this.responses = responses;
    }
}
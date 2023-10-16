package com.example.weconnectapp;
import java.util.List;

public class ResponsesWrapper {
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
package com.example.weconnectapp;

import java.io.Serializable;

public class Answer implements Serializable {
    private int questionId;
    private String type;
    private Object value;


    public Answer() {
    }


    public Answer(int questionId, String type, Object value) {
        this.questionId = questionId;
        this.type = type;
        this.value = value;
    }


    public int getQuestionId() {
        return questionId;
    }


    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }


    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public Object getValue() {
        return value;
    }


    public void setValue(Object value) {
        this.value = value;
    }


    @Override
    public String toString() {
        return "Answer{" +
                "questionId=" + questionId +
                ", type='" + type + '\'' +
                ", value=" + value +
                '}';
    }
}
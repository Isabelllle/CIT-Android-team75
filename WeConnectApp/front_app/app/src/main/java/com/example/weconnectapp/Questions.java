package com.example.weconnectapp;

import java.util.List;

public class Questions {

    private int id;
    private String type;
    private String topic;
    private String question_first;  // match JSON
    private boolean in_second_survey;
    private String question_second;
    private String rate_min;
    private String rate_max;



    public Questions() {

    }

    // getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getQuestion_first() {
        return question_first;
    }

    public void setQuestion_first(String question_first) {
        this.question_first = question_first;
    }

    public boolean isIn_second_survey() {
        return in_second_survey;
    }

    public void setIn_second_survey(boolean in_second_survey) {
        this.in_second_survey = in_second_survey;
    }

    public String getQuestion_second() {
        return question_second;
    }

    public void setQuestion_second(String question_second) {
        this.question_second = question_second;
    }

    public String getRate_min() {
        return rate_min;
    }

    public void setRate_min(String rate_min) {
        this.rate_min = rate_min;
    }

    public String getRate_max() {
        return rate_max;
    }

    public void setRate_max(String rate_max) {
        this.rate_max = rate_max;
    }
}

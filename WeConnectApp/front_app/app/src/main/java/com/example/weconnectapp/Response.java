package com.example.weconnectapp;

public class Response {
    private int questionId;
    private String volunteerEmail;
    private String text;
    private Integer number;
    private Integer rating_1_5;
    private Integer rating1_10;
    private Boolean y_n;
    private Integer dropdown_option_id;

    public Response() {
        // Default constructor
    }

    public Response(int questionId, String volunteerEmail, String text, Integer number, Integer rating_1_5, Integer rating1_10, Boolean y_n, Integer dropdown_option_id) {
        this.questionId = questionId;
        this.volunteerEmail = volunteerEmail;
        this.text = text;
        this.number = number;
        this.rating_1_5 = rating_1_5;
        this.rating1_10 = rating1_10;
        this.y_n = y_n;
        this.dropdown_option_id = dropdown_option_id;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getVolunteerEmail() {
        return volunteerEmail;
    }

    public void setVolunteerEmail(String volunteerEmail) {
        this.volunteerEmail = volunteerEmail;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getRating_1_5() {
        return rating_1_5;
    }

    public void setRating_1_5(Integer rating_1_5) {
        this.rating_1_5 = rating_1_5;
    }

    public Integer getRating1_10() {
        return rating1_10;
    }

    public void setRating1_10(Integer rating1_10) {
        this.rating1_10 = rating1_10;
    }

    public Boolean getY_n() {
        return y_n;
    }

    public void setY_n(Boolean y_n) {
        this.y_n = y_n;
    }

    public Integer getDropdown_option_id() {
        return dropdown_option_id;
    }

    public void setDropdown_option_id(Integer dropdown_option_id) {
        this.dropdown_option_id = dropdown_option_id;
    }
}


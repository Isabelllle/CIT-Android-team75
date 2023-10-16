package com.example.weconnectapp;

public class Response {
    private int question_id;
    private String vol_email;
    private String text;
    private Integer number;
    private Integer rating;
    private Integer rating1_10;
    private Boolean yes_or_no;
    private Integer dropdown_id;

    public Response() {
        // Default constructor
    }

    public Response(int question_id, String vol_email, String text, Integer number, Integer rating, Integer rating1_10, Boolean yes_or_no, Integer dropdown_id) {
        this.question_id = question_id;
        this.vol_email = vol_email;
        this.text = text;
        this.number = number;
        this.rating = rating;
        this.rating1_10 = rating1_10;
        this.yes_or_no = yes_or_no;
        this.dropdown_id = dropdown_id;
    }

    public int getquestion_id() {
        return question_id;
    }

    public void setquestion_id(int question_id) {
        this.question_id = question_id;
    }

    public String getvol_email() {
        return vol_email;
    }

    public void setvol_email(String vol_email) {
        this.vol_email = vol_email;
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

    public Integer getrating() {
        return rating;
    }

    public void setrating(Integer rating) {
        this.rating = rating;
    }

    public Integer getRating1_10() {
        return rating1_10;
    }

    public void setRating1_10(Integer rating1_10) {
        this.rating1_10 = rating1_10;
    }

    public Boolean getyes_or_no() {
        return yes_or_no;
    }

    public void setyes_or_no(Boolean yes_or_no) {
        this.yes_or_no = yes_or_no;
    }

    public Integer getdropdown_id() {
        return dropdown_id;
    }

    public void setdropdown_id(Integer dropdown_id) {
        this.dropdown_id = dropdown_id;
    }
}


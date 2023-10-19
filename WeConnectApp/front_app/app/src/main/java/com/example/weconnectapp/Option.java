package com.example.weconnectapp;

import com.google.gson.annotations.SerializedName;

public class Option {
    @SerializedName("id")
    private int id;

    @SerializedName("optionValue")
    private String optionValue;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOptionValue() {
        return optionValue;
    }

    public void setOptionValue(String optionValue) {
        this.optionValue = optionValue;
    }

    @Override
    public String toString() {
        return "Option{" +
                "id=" + id +
                ", optionValue='" + optionValue + '\'' +
                '}';
    }
}
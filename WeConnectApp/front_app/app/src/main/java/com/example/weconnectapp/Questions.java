package com.example.weconnectapp;

import java.util.List;

public class Questions {
    private int id;
    private final QuestionType type;
    private final QuestionTopic topic;
    private String text;
    private List<String> option;
    private String ratingMin;
    private String ratingMax;


    public Questions(int id, QuestionType type, QuestionTopic topic, String text){
        this.id = id;
        this.topic = topic;
        this.text = text;
        this.type = type;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }

    public QuestionTopic getTopic(){
        return topic;
    }

    public String getText(){
        return text;
    }
    public void setText(String text){
        this.text = text;
    }

    public QuestionType getType(){
        return type;
    }
}

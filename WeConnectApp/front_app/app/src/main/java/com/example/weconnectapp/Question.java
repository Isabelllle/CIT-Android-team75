package com.example.weconnectapp;

public class Question {
    private int id;
    private String text;
    private QuestionType type;

    public Question(int id, String test, QuestionType type){
        this.id = id;
        this.text = text;
        this.type = type;
    }

    public int getId(){
        return id;
    }

    public String getText(){
        return text;
    }
    public QuestionType getType(){
        return type;
    }
}

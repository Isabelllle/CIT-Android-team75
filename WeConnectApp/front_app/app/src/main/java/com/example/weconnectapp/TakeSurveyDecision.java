package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import android.os.Bundle;

public class TakeSurveyDecision extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_take_survey_decision);

        //Redirection to Volunteer home page when click on back arrow
        ImageButton button = findViewById(R.id.survey_base_back_arrow);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TakeSurveyDecision.this, NavHomePage.class);
                startActivity(intent);
            }
        });

        //Redirection to personal details page when click on "first survey"/"second survey" button
        Button button2 = findViewById(R.id.first_survey_btn);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create Intent，
                Intent intent = new Intent(TakeSurveyDecision.this, SurveyPersonalDetail.class);
                startActivity(intent);
            }
        });
        Button button3 = findViewById(R.id.second_survey_btn);
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create Intent，
                Intent intent = new Intent(TakeSurveyDecision.this, SurveyPersonalDetail.class);
                startActivity(intent);
            }
        });
    }

}

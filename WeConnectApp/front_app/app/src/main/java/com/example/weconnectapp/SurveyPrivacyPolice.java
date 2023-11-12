package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

public class SurveyPrivacyPolice extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_privacy_police);

        //Redirection to take survey page when click on "agree" button
        Button button1 = findViewById(R.id.police_agree);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyPrivacyPolice.this, QuestionActivity.class);
                startActivity(intent);
            }
        });



        //Redirection to volunteer home page when click on "disagree" button
        Button button2 = findViewById(R.id.police_disagree);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyPrivacyPolice.this, MainActivity.class);
                startActivity(intent);
            }
        });

        //Redirection to Volunteer home page when click on back arrow
        ImageButton button3 = findViewById(R.id.survey_base_back_arrow);
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyPrivacyPolice.this,SurveyOrganisationDetails.class);
                startActivity(intent);
            }
        });

    }
}
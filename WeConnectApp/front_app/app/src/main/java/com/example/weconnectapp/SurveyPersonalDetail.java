package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.view.View;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageButton;
public class SurveyPersonalDetail extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_personal_detail);

        //Redirection to organisation detail page when click on "next" button
        Button button = findViewById(R.id.survey_detail_btn);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyPersonalDetail.this, SurveyOrganisationDetails.class);
                startActivity(intent);
            }
        });

        //Redirection to take survey page when click on back arrow button
        ImageButton button2 = findViewById(R.id.survey_base_back_arrow);

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyPersonalDetail.this, MainActivity.class);
                startActivity(intent);
            }
        });
    }
}

package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Button;
import android.widget.Toast;

public class SurveyOrganisationDetails extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_organisation_details);

        //get the data of new organisation information
        EditText organisationName = findViewById(R.id.input_new_organisation);
        String text1 = organisationName.getText().toString().trim();

        EditText managerEmail = findViewById(R.id.input_manager_email);
        String text2 = managerEmail.getText().toString().trim();

        //Redirection to privacy police page when click on "next" button
        Button button1 = findViewById(R.id.survey_detail_btn);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyOrganisationDetails.this, SurveyPrivacyPolice.class);
                startActivity(intent);

            }
        });


        //Redirection to take survey page when click on back arrow button
        ImageButton button2 = findViewById(R.id.survey_base_back_arrow);

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyOrganisationDetails.this, SurveyPersonalDetail.class);
                startActivity(intent);
            }
        });

    }
}
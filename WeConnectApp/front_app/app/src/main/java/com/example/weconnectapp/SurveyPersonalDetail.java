package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.view.View;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

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
                //Limit the text box to not be empty
                EditText firstName = findViewById(R.id.input_first_name);
                String text1 = firstName.getText().toString().trim();

                EditText lastName = findViewById(R.id.input_last_name);
                String text2 = lastName.getText().toString().trim();

                EditText email = findViewById(R.id.input_email);
                String text3 = email.getText().toString().trim();

                EditText postcode = findViewById(R.id.input_postcode);
                String text4 = postcode.getText().toString().trim();
                if (text1.isEmpty() || text2.isEmpty() || text3.isEmpty() || text4.isEmpty()) {
                    Toast.makeText(getApplicationContext(), "text box cannont be empty",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Intent intent = new Intent(SurveyPersonalDetail.this, SurveyOrganisationDetails.class);
                    startActivity(intent);
                }
            }
        });

        //Redirection to take survey page when click on back arrow button
        ImageButton button2 = findViewById(R.id.survey_base_back_arrow);

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveyPersonalDetail.this, TakeSurveyDecision.class);
                startActivity(intent);
            }
        });
    }
}


package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class SurveySecondPersonalInfo extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_second_personal_info);

        //Redirection to organisation detail page when click on "next" button
        Button button1 = findViewById(R.id.next_button);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Limit the email input text box to not be empty
                EditText email = findViewById(R.id.sec_input_email);
                String text1 = email.getText().toString().trim();
                if (text1.isEmpty()) {
                    Toast.makeText(getApplicationContext(), "text box cannot be empty",
                            Toast.LENGTH_SHORT).show();
                } else {
                    //redirect to another pages.
                }
            }
        });

        //Redirection to previous page when click on "previous" button
        Button button2 = findViewById(R.id.previous_button);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveySecondPersonalInfo.this, SurveyOrganisationDetails.class);
                startActivity(intent);
            }
        });
    }
}
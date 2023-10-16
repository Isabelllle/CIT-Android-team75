package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.util.Log;
import java.util.Map;
import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;

import com.example.weconnectapp.connection.Api;
import com.example.weconnectapp.connection.RetrofitClientInstance;

public class SurveySecondPersonalInfo extends AppCompatActivity {

    private Map<Integer, Object> answers = new HashMap<>();
    private Button nextButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_second_personal_info);

        Intent intent = getIntent();
        answers = (Map<Integer, Object>) intent.getSerializableExtra("answers");

        nextButton = findViewById(R.id.next_button);
        nextButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("Submit", "Next button clicked");
                nextButton.setEnabled(false);

                EditText email = findViewById(R.id.sec_input_email);
                String emailText = email.getText().toString().trim();
                if (emailText.isEmpty()) {
                    Toast.makeText(getApplicationContext(), "Email cannot be empty",
                            Toast.LENGTH_SHORT).show();
                    nextButton.setEnabled(true);
                } else {
                    for (Map.Entry<Integer, Object> entry : answers.entrySet()) {
                        Integer questionId = entry.getKey();
                        Object answer = entry.getValue();
                        com.example.weconnectapp.Response response =
                                new com.example.weconnectapp.Response(questionId, emailText, answer.toString(),
                                        null, null, null, null, null);

                        Log.d("Submit", "Starting to submit response for question ID: " + questionId);
                        sendResponseToBackend(response);
                    }
                }
            }
        });

        Button previousButton = findViewById(R.id.previous_button);
        previousButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SurveySecondPersonalInfo.this, SurveyOrganisationDetails.class);
                startActivity(intent);
            }
        });
    }

    private void sendResponseToBackend(com.example.weconnectapp.Response response) {
        Api api = RetrofitClientInstance.getRetrofitInstance().create(Api.class);
        Call<Void> call = api.submitResponse(response);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, retrofit2.Response<Void> response) {
                nextButton.setEnabled(true);
                Log.d("Submit", "Response received with code: " + response.code());

                if (response.isSuccessful()) {
                    Toast.makeText(SurveySecondPersonalInfo.this, "Response submitted successfully!",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(SurveySecondPersonalInfo.this, "Failed to submit response!",
                            Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                nextButton.setEnabled(true);
                Log.d("Submit", "Failure: " + t.getMessage());
                Toast.makeText(SurveySecondPersonalInfo.this, "Error: " + t.getMessage(),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
}
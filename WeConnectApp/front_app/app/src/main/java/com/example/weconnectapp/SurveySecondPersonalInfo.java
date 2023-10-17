package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Pair;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import com.example.weconnectapp.connection.Api;
import com.example.weconnectapp.connection.RetrofitClientInstance;

public class SurveySecondPersonalInfo extends AppCompatActivity {

    private Map<Integer, MyPair<String, SerializableValue>> answers = new HashMap<>();

    private Button nextButton;
    private List<com.example.weconnectapp.Response> responsesList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_second_personal_info);


        Intent intent = getIntent();
        List<Answer> answersList = (List<Answer>) intent.getSerializableExtra("answers");

        if (answersList != null) {
            for (Answer answer : answersList) {
                int questionId = answer.getQuestionId();
                String type = answer.getType();
                Object value = answer.getValue();

                // Create a MyPair object to hold the type and value of the answer
                MyPair<String, SerializableValue> answerPair = new MyPair<>(type, new SerializableValue(value));

                // Add the answer to the answers map
                answers.put(questionId, answerPair);
            }
        }

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
                    // Create a response list
                    for (Map.Entry<Integer, MyPair<String, SerializableValue>> entry : answers.entrySet()) { // Updated this line
                        Integer questionId = entry.getKey();
                        MyPair<String, SerializableValue> answerPair = entry.getValue();  // Updated this line
                        String type = answerPair.first;
                        Object value = answerPair.second.getValue(); // Here we are extracting the value from SerializableValue

                        com.example.weconnectapp.Response response = new com.example.weconnectapp.Response();
                        response.setquestion_id(questionId);
                        response.setvol_email(emailText);

                        switch (type) {
                            case "text":
                                if (value instanceof String) {
                                    response.setText((String) value);
                                } else {
                                    Log.e("Error", "Value is not a String for type text");
                                }
                                break;
                            case "number":
                                if (value instanceof Integer) {
                                    response.setNumber((Integer) value);
                                } else {
                                    Log.e("Error", "Value is not an Integer for type number");
                                }
                                break;
                            case "rating":
                                if (value instanceof Integer) {
                                    response.setrating((Integer) value);
                                } else {
                                    Log.e("Error", "Value is not an Integer for type rating");
                                }
                                break;
                            case "rating1_10":
                                if (value instanceof Integer) {
                                    response.setRating1_10((Integer) value);
                                } else {
                                    Log.e("Error", "Value is not an Integer for type rating1_10");
                                }
                                break;
                            case "yes_or_no":
                                if (value instanceof Boolean) {
                                    response.setyes_or_no((Boolean) value);
                                } else if (value instanceof String) {  // Add this check to convert String to Boolean if needed
                                    response.setyes_or_no(Boolean.parseBoolean((String) value));
                                } else {
                                    Log.e("Error", "Value is not a Boolean for type yes_or_no");
                                }
                                break;
                            case "dropdown_id":
                                if (value instanceof Integer) {
                                    response.setdropdown_id((Integer) value);
                                } else {
                                    Log.e("Error", "Value is not an Integer for type dropdown_id");
                                }
                                break;
                            default:
                                throw new IllegalArgumentException("Unknown answer type: " + type);
                        }
                        responsesList.add(response);
                    }
                    // Send all responses at once
                    sendResponsesToBackend(responsesList);
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

    private void sendResponsesToBackend(List<com.example.weconnectapp.Response> responses) {
        ResponsesWrapper responsesWrapper = new ResponsesWrapper(responses);  // Wrap the responses in a wrapper object
        Api api = RetrofitClientInstance.getRetrofitInstance().create(Api.class);
        Call<Void> call = api.submitResponses(responsesWrapper);  // Send the wrapper object

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

                if (response.isSuccessful()) {
                    Toast.makeText(SurveySecondPersonalInfo.this, "Responses submitted successfully!",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(SurveySecondPersonalInfo.this, "Failed to submit responses!",
                            Toast.LENGTH_SHORT).show();
                    responsesList.clear();  // clear responsesList
                }
                nextButton.setEnabled(true);  // succeed or not, re-enable button
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                nextButton.setEnabled(true);  // if fail, re-enable button
                Log.d("Submit", "Failure: " + t.getMessage());
                Toast.makeText(SurveySecondPersonalInfo.this, "Error: " + t.getMessage(),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
}
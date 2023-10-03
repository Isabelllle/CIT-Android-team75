package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import android.content.Intent;
import android.view.View;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;
import com.example.weconnectapp.connection.Api;
import com.example.weconnectapp.connection.RetrofitClientInstance;

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

                EditText postcodeEditText = findViewById(R.id.input_postcode);
                String text4 = postcodeEditText.getText().toString().trim();

                if (text1.isEmpty() || text2.isEmpty() || text3.isEmpty() || text4.isEmpty()) {
                    Toast.makeText(getApplicationContext(), "text box cannot be empty",
                            Toast.LENGTH_SHORT).show();
                } else {
                    // Create a VolunteerDetails object
                    int postcode = Integer.parseInt(text4); // Convert postcode to int
                    VolunteerDetails details = new VolunteerDetails(text1, text2, text3, postcode);

                    // Get a Retrofit instance and API interface
                    Api api = RetrofitClientInstance.getRetrofitInstance().create(Api.class);

                    // Send POST request
                    Call<Void> call = api.postVolunteerDetails(details);
                    call.enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                // Handle successful response
                                Toast.makeText(getApplicationContext(), "Details submitted successfully",
                                        Toast.LENGTH_SHORT).show();
                                Intent intent = new Intent(SurveyPersonalDetail.this, SurveyOrganisationDetails.class);
                                startActivity(intent);
                            } else {
                                // Handle error response
                                Toast.makeText(getApplicationContext(), "Failed to submit details",
                                        Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            // Handle request failure
                            Toast.makeText(getApplicationContext(), "An error occurred",
                                    Toast.LENGTH_SHORT).show();
                        }
                    });
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




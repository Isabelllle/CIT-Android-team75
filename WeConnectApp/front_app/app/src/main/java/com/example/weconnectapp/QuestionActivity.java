package com.example.weconnectapp;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.weconnectapp.connection.Api;
import com.example.weconnectapp.connection.RetrofitClientInstance;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class QuestionActivity extends AppCompatActivity {

    private TextView questionText;
    private Button nextButton;
    private Button previousButton;
    private List<Questions> questionList;
    private int currentPage = 1;
    private Api api;
    private RelativeLayout layout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question); // universal activity layout，empty RelativeLayout

        layout = findViewById(R.id.question_layout);
        api = RetrofitClientInstance.getRetrofitInstance().create(Api.class);

        nextButton = findViewById(R.id.next_button);
        previousButton = findViewById(R.id.previous_button);

        nextButton.setOnClickListener(v -> {
            currentPage++;
            fetchQuestions();
        });

        previousButton.setOnClickListener(v -> {
            if (currentPage > 1) {
                currentPage--;
                fetchQuestions();
            } else {
                Toast.makeText(QuestionActivity.this, "This is the first question", Toast.LENGTH_SHORT).show();
            }
        });

        fetchQuestions();
    }

    private void fetchQuestions() {
        Call<List<Questions>> call = api.getQuestions(currentPage, 1);
        call.enqueue(new Callback<List<Questions>>() {
            @Override
            public void onResponse(Call<List<Questions>> call, Response<List<Questions>> response) {
                if (response.isSuccessful()) {
                    questionList = response.body();
                    updateUI();
                } else {
                    Log.e("API Error", "Failed to fetch questions. Status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<Questions>> call, Throwable t) {
                Log.e("API Error", t.getMessage(), t);
            }
        });
    }

    private void updateUI() {
        if (questionList != null && !questionList.isEmpty()) {
            Questions currentQuestion = questionList.get(0);
            layout.removeAllViews();

            switch (currentQuestion.getType()) {
                case "Number":
                    getLayoutInflater().inflate(R.layout.quetype_enter_number, layout, true);
                    break;
                case "Text":
                    getLayoutInflater().inflate(R.layout.quetype_short_answer, layout, true);
                    break;
                case "Rating scales 1-5":
                    getLayoutInflater().inflate(R.layout.quetype_rating_1_5, layout, true);
                    break;
                case "Y/N":
                    getLayoutInflater().inflate(R.layout.quetype_yes_no, layout, true);
                    break;
                default:
                    Log.e("UI Error", "Unknown question type");
                    return;
            }

            questionText = findViewById(R.id.question_text);
            questionText.setText(currentQuestion.getQuestion_first());

            // Retrieve the reference to the button again and set a click listener
            nextButton = findViewById(R.id.survey_question_btn_next);  // ID match layout ID
            previousButton = findViewById(R.id.survey_question_btn_previous);  // same as above

            nextButton.setOnClickListener(v -> {
                currentPage++;
                fetchQuestions();
            });

            previousButton.setOnClickListener(v -> {
                if (currentPage > 1) {
                    currentPage--;
                    fetchQuestions();
                } else {
                    Toast.makeText(QuestionActivity.this, "This is the first question", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Log.e("UI Error", "Question list is empty or null");
        }
    }
}




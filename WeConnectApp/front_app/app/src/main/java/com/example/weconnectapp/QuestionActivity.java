package com.example.weconnectapp;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.RadioButton;


import androidx.appcompat.app.AppCompatActivity;

import com.example.weconnectapp.connection.Api;
import com.example.weconnectapp.connection.RetrofitClientInstance;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    private Map<Integer, Object> answers = new HashMap<>(); // map to save answer

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question); // universal activity layout，empty RelativeLayout

        layout = findViewById(R.id.question_layout);
        api = RetrofitClientInstance.getRetrofitInstance().create(Api.class);

        nextButton = findViewById(R.id.next_button);
        previousButton = findViewById(R.id.previous_button);

        nextButton.setOnClickListener(v -> {
            Log.d("Button Click", "Next button clicked");
            Log.d("Before Change Page", "Answers Map: " + answers.toString());

            currentPage++;
            fetchQuestions();
        });

        previousButton.setOnClickListener(v -> {
            Log.d("Button Click", "Previous button clicked");
            Log.d("Before Change Page", "Answers Map: " + answers.toString());
            if (currentPage > 1) {

                currentPage--;
                fetchQuestions();
            } else {
                Toast.makeText(QuestionActivity.this, "This is the first question", Toast.LENGTH_SHORT).show();
            }
        });

        fetchQuestions();

    }

    private void saveCurrentAnswer() {
        Log.d("Save Answer", "saveCurrentAnswer called");
        if (questionList != null && !questionList.isEmpty()) {
            Questions currentQuestion = questionList.get(0);
            int questionId = currentQuestion.getId();
            Log.d("Save Answer", "Current question ID: " + questionId);

            switch (currentQuestion.getType()) {
                case "Text":
                    EditText editText = findViewById(R.id.type_short_answer_answer_box);
                    if(editText != null && editText.getText() != null) { // Check if editText is initialized
                        answers.put(questionId, editText.getText().toString());
                        Log.d("Save Answer", "Saved text answer: " + editText.getText().toString() + " for question ID: " + questionId);
                    }
                    break;
                case "Y/N":
                case "Rating scales 1-5":
                    RadioGroup radioGroup = findViewById(R.id.type_rating_1_5_answer);
                    if(radioGroup != null) {
                        int selectedIndex = radioGroup.indexOfChild(findViewById(radioGroup.getCheckedRadioButtonId()));
                        answers.put(questionId, selectedIndex);
                        Log.d("Save Answer", "Saved answer index: " + selectedIndex + " for question ID: " + questionId);
                    }
                    break;

                case "Number":
                    EditText numberEditText = findViewById(R.id.type_enter_number_answer_box);
                    if(numberEditText != null && numberEditText.getText() != null) { // Check if numberEditText is initialized
                        answers.put(questionId, numberEditText.getText().toString());
                        Log.d("Save Answer", "Saved number answer: " + numberEditText.getText().toString() + " for question ID: " + questionId);
                    }
                    break;
                default:
                    Log.d("Save Answer", "Unknown question type for question ID: " + questionId);
                    break;
            }
            Log.d("Answers Map", "Current answers: " + answers.toString());
        } else {
            Log.d("Save Answer", "questionList is empty or null");
        }
    }

    private void fetchQuestions() {
        // save current answer before get new question

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

            // load previous saved answer
            loadSavedAnswer(currentQuestion.getId(), currentQuestion.getType());

            // Retrieve the reference to the button again and set a click listener
            nextButton = findViewById(R.id.next_button);
            previousButton = findViewById(R.id.previous_button);

            nextButton.setOnClickListener(v -> {
                saveCurrentAnswer();
                currentPage++;
                fetchQuestions();
            });

            previousButton.setOnClickListener(v -> {
                if (currentPage > 1) {
                    saveCurrentAnswer();
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

    private void loadSavedAnswer(int questionId, String type) {
        Object savedAnswer = answers.get(questionId);
        if (savedAnswer != null) {
            Log.d("Load Answer", "Loading saved answer: " + savedAnswer + " for question ID: " + questionId);

            // Ensure that the current question ID matches the question ID of the loaded answer
            Questions currentQuestion = questionList.get(0);  // get current question
            if (currentQuestion.getId() != questionId) {  // Check if the current question's ID matches the question ID of the saved answer
                Log.d("Load Answer", "The current question ID does not match the saved answer's question ID.");
                return;
            }

            switch (type) {
                case "Text":
                    EditText editText = findViewById(R.id.type_short_answer_answer_box);
                    editText.setText((String) savedAnswer);
                    break;
                case "Y/N":
                case "Rating scales 1-5":
                    RadioGroup radioGroup = findViewById(R.id.type_rating_1_5_answer);
                    if(radioGroup != null && savedAnswer instanceof Integer) {
                        int answerIndex = (Integer) savedAnswer;
                        if(answerIndex >= 0 && answerIndex < radioGroup.getChildCount()) {
                            ((RadioButton) radioGroup.getChildAt(answerIndex)).setChecked(true);
                            Log.d("Load Answer", "Loaded answer index: " + answerIndex + " for question ID: " + questionId);
                        }
                    }
                    break;
                case "Number":
                    EditText numberEditText = findViewById(R.id.type_enter_number_answer_box);
                    numberEditText.setText((String) savedAnswer);
                    break;
                // ... add other cases later
                default:
                    break;
            }
        } else {
            // when there was no saved answer，log
            Log.d("Load Answer", "No saved answer for question ID: " + questionId);
        }
    }
}



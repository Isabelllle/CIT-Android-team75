
package com.example.weconnectapp;

import java.io.Serializable;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.util.Pair;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.RadioButton;
import android.widget.Spinner;
import android.widget.ArrayAdapter;
import android.view.View;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;

import com.example.weconnectapp.connection.Api;
import com.example.weconnectapp.connection.RetrofitClientInstance;

import java.util.ArrayList;
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

    private List<Answer> answers = new ArrayList<>();
    

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

            Answer answer = new Answer();  // Create a new Answer object
            answer.setQuestionId(questionId);  // Set the question ID

            switch (currentQuestion.getType()) {
                case "Text":
                    EditText editText = findViewById(R.id.type_short_answer_answer_box);
                    if(editText != null) {
                        String textAnswer = editText.getText().toString().trim();
                        Log.d("Save Answer", "Read text answer: '" + textAnswer + "'");
                        if(!textAnswer.isEmpty()) {
                            answer.setType("text");
                            answer.setValue(textAnswer);  // Set the text answer

                            // Use this instead of answers.add(answer)
                            updateOrAddAnswer(answer, questionId);

                            Log.d("Save Answer", "Saved text answer: '" + textAnswer + "' for question ID: " + questionId);
                        } else {
                            Log.e("Save Answer", "Text answer is empty for question ID: " + questionId);
                        }
                    } else {
                        Log.e("Save Answer", "EditText is null for question ID: " + questionId);
                    }
                    break;

                case "Y/N":
                    RadioGroup radioGroupYN = findViewById(R.id.type_yes_no_answer);
                    if(radioGroupYN != null) {
                        int selectedRadioButtonId = radioGroupYN.getCheckedRadioButtonId();
                        if (selectedRadioButtonId != -1) {
                            RadioButton radioButton = radioGroupYN.findViewById(selectedRadioButtonId);
                            String value = radioButton.getText().toString();
                            answer.setType("yes_or_no");
                            answer.setValue(value);  // Set the yes_or_no answer

                            updateOrAddAnswer(answer, questionId);

                            Log.d("Save Answer", "Saved answer: " + value + " for question ID: " + questionId);
                        } else {
                            Log.d("Save Answer", "No radio button selected for question ID: " + questionId);
                        }
                    } else {
                        Log.d("Save Answer", "RadioGroup is null for question ID: " + questionId);
                    }
                    break;

                case "Rating scales 1-5":
                    RadioGroup radioGroup1 = findViewById(R.id.type_rating_1_5_answer);
                    if(radioGroup1 != null) {
                        int selectedIndex = radioGroup1.indexOfChild(findViewById(radioGroup1.getCheckedRadioButtonId()));
                        answer.setType("rating");
                        answer.setValue(selectedIndex);  // Set the rating answer

                        // Use this instead of answers.add(answer)
                        updateOrAddAnswer(answer, questionId);

                        Log.d("Save Answer", "Saved answer index: " + selectedIndex + " for question ID: " + questionId);
                    }
                    break;

                case "Rating scales 1-10":
                    RadioGroup radioGroup10 = findViewById(R.id.type_rating_1_10_answer);
                    if (radioGroup10 != null) {
                        int selectedRadioButtonId = radioGroup10.getCheckedRadioButtonId();
                        if (selectedRadioButtonId != -1) {
                            RadioButton radioButton = radioGroup10.findViewById(selectedRadioButtonId);
                            int selectedIndex = radioGroup10.indexOfChild(findViewById(radioGroup10.getCheckedRadioButtonId()));
                            answer.setType("rating1_10");
                            answer.setValue(selectedIndex);

                            // Use this instead of answers.add(answer)
                            updateOrAddAnswer(answer, questionId);

                            Log.d("Save Answer", "Saved answer: " + selectedIndex + " for question ID: " + questionId);
                        } else {
                            Log.d("Save Answer", "No radio button selected for question ID: " + questionId);
                        }
                    } else {
                        Log.d("Save Answer", "RadioGroup is null for question ID: " + questionId);
                    }
                    break;

                case "Number":
                    EditText numberEditText = findViewById(R.id.type_enter_number_answer_box);
                    if(numberEditText != null && !numberEditText.getText().toString().isEmpty()) {
                        try {
                            Integer value = Integer.parseInt(numberEditText.getText().toString());  // Parse the text to an Integer
                            answer.setType("number");
                            answer.setValue(value);  // Set the number answer

                            // Use this instead of answers.add(answer)
                            updateOrAddAnswer(answer, questionId);

                            Log.d("Save Answer", "Saved number answer: " + value + " for question ID: " + questionId);
                        } catch (NumberFormatException e) {
                            Log.e("Save Answer", "Invalid number format for question ID: " + questionId);
                        }
                    }
                    break;

                case "dropdown":
                    Spinner spinner = findViewById(R.id.quetype_dropdown_box);
                    if(spinner != null) {
                        String value = spinner.getSelectedItem().toString();
                        answer.setType("dropdown_id");
                        answer.setValue(value);  // Set the dropdown answer

                        updateOrAddAnswer(answer, questionId);

                        Log.d("Save Answer", "Saved dropdown answer: " + value + " for question ID: " + questionId);
                    }
                    break;

                default:
                    Log.d("Save Answer", "Unknown question type for question ID: " + questionId);
                    break;
            }
            Log.d("Answers List", "Current answers: " + answers.toString());  // Log the current state of the answers list
        } else {
            Log.d("Save Answer", "questionList is empty or null");
        }
    }
    // update answers,and avoid repeated saved answer
    private void updateOrAddAnswer(Answer newAnswer, int questionId) {
        boolean updated = false;
        for (int i = 0; i < answers.size(); i++) {
            Answer existingAnswer = answers.get(i);
            if (existingAnswer.getQuestionId() == questionId) {
                answers.set(i, newAnswer);  // Update the existing answer
                updated = true;
                Log.d("Save Answer", "Updated answer for question ID: " + questionId);
                break;
            }
        }

        if (!updated) {
            answers.add(newAnswer);  // Add new answer if not updated
            Log.d("Save Answer", "Added new answer for question ID: " + questionId);
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
        try {
            if (questionList != null && !questionList.isEmpty()) {
                Questions currentQuestion = questionList.get(0);
                layout.removeAllViews();

                // Print the type of the current question
                Log.d("UI Update", "Current Question Type: " + currentQuestion.getType());

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
                    case "Rating scales 1-10":
                        getLayoutInflater().inflate(R.layout.quetype_rating_1_10, layout, true);

                        break;
                    case "Y/N":
                        getLayoutInflater().inflate(R.layout.quetype_yes_no, layout, true);
                        break;
                    case "dropdown":
                        getLayoutInflater().inflate(R.layout.quetype_dropdown, layout, true);
                        Spinner spinner = findViewById(R.id.quetype_dropdown_box);
                        Log.d("UI Update", "Spinner initialized: " + (spinner != null));
                        loadDropdownOptions(currentQuestion.getId(), spinner);  // load options and saved answer here
                        break;
                    default:
                        Log.e("UI Error", "Unknown question type");
                        return;
                }

                questionText = findViewById(R.id.question_text);
                if (questionText != null) {
                    questionText.setText(currentQuestion.getQuestion_first());
                    Log.d("UI Update", "Question Text Set: " + currentQuestion.getQuestion_first());
                } else {
                    Log.e("UI Update", "Question Text is null");
                }

                // load previous saved answer
                loadSavedAnswer(currentQuestion.getId(), currentQuestion.getType());

                // Retrieve the reference to the button again and set a click listener
                nextButton = findViewById(R.id.next_button);
                previousButton = findViewById(R.id.previous_button);

                nextButton.setOnClickListener(v -> {
                    saveCurrentAnswer();
                    if (currentPage == 37 && areAllQuestionsAnswered()) {
                        Intent intent = new Intent(QuestionActivity.this, SurveySecondPersonalInfo.class);
                        intent.putExtra("answers", (Serializable) answers);
                        startActivity(intent);
                    } else if (currentPage < 37) {
                        currentPage++;
                        fetchQuestions();
                    } else {
                        Toast.makeText(QuestionActivity.this, "Please answer all questions before submitting.", Toast.LENGTH_SHORT).show();
                    }
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
        } catch (Exception e) {
            Log.e("UI Update Error", "An error occurred while updating the UI", e);  // Catch any unexpected errors
        }
    }

    private void loadSavedAnswer(int questionId, String type) {
        Log.d("Load Answer", "Using key: " + questionId);
        Answer savedAnswer = null;

        for (Answer answer : answers) {
            if (answer.getQuestionId() == questionId) {
                savedAnswer = answer;
                break;
            }
        }

        if (savedAnswer != null) {
            Log.d("Load Answer", "Loading saved answer for question ID: " + questionId);
            Object value = savedAnswer.getValue();

            switch (savedAnswer.getType()) {
                case "text":
                    EditText editText = findViewById(R.id.type_short_answer_answer_box);
                    if (editText != null && value instanceof String) {
                        editText.setText((String) value);
                        Log.d("Load Answer", "Loaded text answer: '" + value + "' for question ID: " + questionId);
                    } else {
                        Log.e("Load Answer", "EditText is null or saved answer is not a string for question ID: " + questionId);
                    }
                    break;
                case "yes_or_no":
                    RadioGroup radioGroupYN = findViewById(R.id.type_yes_no_answer);
                    if (radioGroupYN != null && value instanceof String) {
                        String answerValue = (String) value;
                        for (int i = 0; i < radioGroupYN.getChildCount(); i++) {
                            RadioButton rb = (RadioButton) radioGroupYN.getChildAt(i);
                            if (rb.getText().toString().equals(answerValue)) {
                                rb.setChecked(true);
                                Log.d("Load Answer", "Loaded yes_or_no answer: '" + value + "' for question ID: " + questionId);
                                break;
                            }
                        }
                    } else {
                        Log.e("Load Answer", "RadioGroup is null or saved answer is not a string for question ID: " + questionId);
                    }
                    break;
                case "rating":
                    if (type.equals("Rating scales 1-5")) {
                        RadioGroup radioGroup = findViewById(R.id.type_rating_1_5_answer);
                        if (radioGroup != null && value instanceof Integer) {
                            int answerIndex = (Integer) value;
                            if (answerIndex >= 0 && answerIndex < radioGroup.getChildCount()) {
                                RadioButton radioButton = (RadioButton) radioGroup.getChildAt(answerIndex);
                                if (radioButton != null) {
                                    radioButton.setChecked(true);
                                    Log.d("Load Answer", "Loaded answer index: " + answerIndex + " for question ID: " + questionId);
                                } else {
                                    Log.e("Load Answer", "RadioButton is null for index: " + answerIndex);
                                }
                            } else {
                                Log.e("Load Answer", "Invalid answer index for question ID: " + questionId);
                            }
                        } else {
                            Log.e("Load Answer", "RadioGroup is null or saved answer is not an integer for question ID: " + questionId);
                        }
                    }
                    break;
                case "rating1_10":
                    RadioGroup radioGroup10 = findViewById(R.id.type_rating_1_10_answer);
                    if (radioGroup10 != null && value instanceof Integer) {
                        int answerValue = (Integer) value;
                        if (answerValue >= 1 && answerValue <= 10) {
                            RadioButton radioButton = (RadioButton) radioGroup10.getChildAt(answerValue - 1); // -1 because index is 0-based
                            if (radioButton != null) {
                                radioButton.setChecked(true);
                                Log.d("Load Answer", "Loaded rating1_10 answer: " + answerValue + " for question ID: " + questionId);
                            } else {
                                Log.e("Load Answer", "RadioButton is null for index: " + (answerValue - 1));
                            }
                        } else {
                            Log.e("Load Answer", "Invalid answer value for question ID: " + questionId);
                        }
                    } else {
                        Log.e("Load Answer", "RadioGroup is null or saved answer is not an integer for question ID: " + questionId);
                    }
                    break;
                case "number":
                    EditText numberEditText = findViewById(R.id.type_enter_number_answer_box);
                    if (numberEditText != null && value instanceof Integer) {
                        numberEditText.setText(String.valueOf(value));
                        Log.d("Load Answer", "Loaded number answer: " + value + " for question ID: " + questionId);
                    }
                    break;

                case "dropdown_id":
                    Spinner spinner = findViewById(R.id.quetype_dropdown_box);
                    if (spinner != null && value instanceof String) {
                        Log.d("Load Answer", "Value is a string: " + value);
                        ArrayAdapter<String> adapter = (ArrayAdapter<String>) spinner.getAdapter();
                        if (adapter != null) {
                            int position = adapter.getPosition((String) value);
                            Log.d("Load Answer", "Position in adapter: " + position);
                            if (position != -1) {
                                spinner.setSelection(position);
                                Log.d("Load Answer", "Loaded dropdown answer: " + value + " for question ID: " + questionId);
                            }
                        } else {
                            Log.d("Load Answer", "Adapter is null");
                        }
                    }
                    break;

                default:
                    break;
            }
        } else {
            Log.d("Load Answer", "No saved answer for question ID: " + questionId);
        }
    }
    private void loadDropdownOptions(int questionId, Spinner spinner) {
        Call<List<String>> call = api.getDropdownOptions(questionId);
        call.enqueue(new Callback<List<String>>() {
            @Override
            public void onResponse(Call<List<String>> call, Response<List<String>> response) {
                if (response.isSuccessful()) {
                    List<String> options = response.body();
                    if(options != null && !options.isEmpty()) {
                        ArrayAdapter<String> adapter = new ArrayAdapter<>(QuestionActivity.this, android.R.layout.simple_spinner_item, options);
                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        spinner.setAdapter(adapter);
                        Log.d("Dropdown Options", "Adapter set to spinner: " + (spinner.getAdapter() != null));
                        Log.d("Dropdown Options", "Options loaded: " + options.toString());

                        Log.d("Dropdown Options", "Loading saved answer after setting options");
                        loadSavedAnswer(questionId, "dropdown");
                    } else {
                        Log.e("Dropdown Options", "Options are null or empty");
                    }
                } else {
                    Log.e("API Error", "Failed to fetch dropdown options. Status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<String>> call, Throwable t) {
                Log.e("API Error", t.getMessage(), t);
            }
        });
    }
    private boolean areAllQuestionsAnswered() {
        // Check if all questions are answered
        // For simplicity, check if every questionId from 1 to 10 (inclusive) is in the answers list
        for (int questionId = 1; questionId <= 37; questionId++) {
            if (!isQuestionAnswered(questionId)) {
                return false;
            }
        }
        return true;
    }
    private boolean isQuestionAnswered(int questionId) {
        for (Answer answer : answers) {
            if (answer.getQuestionId() == questionId && answer.getValue() != null) {
                return true;
            }
        }
        return false;
    }

    private void submitAnswers() {
        // Send a POST request to the server with the answers
        // This is just a skeleton, you need to implement the actual POST request
        if (areAllQuestionsAnswered()) {
            // Convert answers map to JSON or another suitable format
            // Send POST request to server
            // Show success message or handle response as needed
            Toast.makeText(QuestionActivity.this, "Answers submitted successfully!", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(QuestionActivity.this, "Please answer all questions before submitting.", Toast.LENGTH_SHORT).show();
        }
    }
}

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
import android.widget.Spinner;
import android.widget.ArrayAdapter;
import android.view.View;
import android.widget.LinearLayout;
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
                    RadioGroup radioGroup1 = findViewById(R.id.type_rating_1_5_answer);
                    if(radioGroup1 != null) {
                        int selectedIndex = radioGroup1.indexOfChild(findViewById(radioGroup1.getCheckedRadioButtonId()));
                        answers.put(questionId, selectedIndex);
                        Log.d("Save Answer", "Saved answer index: " + selectedIndex + " for question ID: " + questionId);
                    }
                    break;

                case "Rating scales 1-10":
                    RadioGroup radioGroup10 = findViewById(R.id.type_rating_1_10_answer);
                    if (radioGroup10 != null) {
                        radioGroup10.setOnCheckedChangeListener((group, checkedId) -> {
                            Log.d("RadioGroup", "Checked ID changed: " + checkedId);  // 添加这一行来查看选中状态的变化
                        });
                        int selectedRadioButtonId = radioGroup10.getCheckedRadioButtonId();
                        Log.d("Save Answer", "Selected radio button ID: " + selectedRadioButtonId);
                        if (selectedRadioButtonId != -1) {
                            RadioButton radioButton = radioGroup10.findViewById(selectedRadioButtonId);
                            View parent = (View) radioButton.getParent(); // 获取 RadioButton 的父布局
                            int parentIndex = radioGroup10.indexOfChild(parent); // 获取父布局在 RadioGroup 中的索引
                            int buttonIndex = ((RadioGroup) parent).indexOfChild(radioButton); // 获取 RadioButton 在父布局中的索引
                            int finalIndex = parentIndex * 5 + buttonIndex; // 计算 RadioButton 的总索引
                            answers.put(questionId, finalIndex);
                            Log.d("Save Answer", "Saved answer index: " + finalIndex + " for question ID: " + questionId);
                        } else {
                            Log.d("Save Answer", "No radio button selected for question ID: " + questionId);
                        }
                    }
                    break;

                case "Number":
                    EditText numberEditText = findViewById(R.id.type_enter_number_answer_box);
                    if(numberEditText != null && numberEditText.getText() != null) { // Check if numberEditText is initialized
                        answers.put(questionId, numberEditText.getText().toString());
                        Log.d("Save Answer", "Saved number answer: " + numberEditText.getText().toString() + " for question ID: " + questionId);
                    }
                    break;
                case "dropdown":
                    Spinner spinner = findViewById(R.id.quetype_dropdown_box);
                    if(spinner != null) {
                        answers.put(questionId, spinner.getSelectedItem().toString());
                        Log.d("Save Answer", "Saved dropdown answer: " + spinner.getSelectedItem().toString() + " for question ID: " + questionId);
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
                    Log.d("UI Update", "Question Text Set: " + currentQuestion.getQuestion_first());  // Add this line
                } else {
                    Log.e("UI Update", "Question Text is null");  // Add this line
                }

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
        } catch (Exception e) {
            Log.e("UI Update Error", "An error occurred while updating the UI", e);  // Catch any unexpected errors
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
                    RadioGroup radioGroup1 = findViewById(R.id.type_rating_1_5_answer);
                    if(savedAnswer instanceof Integer && radioGroup1 != null) {
                        int answerIndex = (Integer) savedAnswer;
                        RadioButton radioButton = (RadioButton) radioGroup1.getChildAt(answerIndex);
                        if (radioButton != null) {
                            radioButton.setChecked(true);
                            Log.d("Load Answer", "Loaded answer index: " + answerIndex + " for question ID: " + questionId);
                        }
                    }
                    break;

                case "Rating scales 1-10":
                    RadioGroup radioGroup10 = findViewById(R.id.type_rating_1_10_answer);
                    if (savedAnswer instanceof Integer && radioGroup10 != null) {
                        int finalIndex = (Integer) savedAnswer;
                        int parentIndex = finalIndex / 5; // 计算父布局的索引
                        int buttonIndex = finalIndex % 5; // 计算 RadioButton 在父布局中的索引
                        LinearLayout parent = (LinearLayout) radioGroup10.getChildAt(parentIndex); // 获取父布局
                        RadioButton radioButton = (RadioButton) parent.getChildAt(buttonIndex); // 获取 RadioButton
                        radioButton.setChecked(true);
                        Log.d("Load Answer", "Loaded answer index: " + finalIndex + " for question ID: " + questionId);
                    }
                    break;
                case "Number":
                    EditText numberEditText = findViewById(R.id.type_enter_number_answer_box);
                    numberEditText.setText((String) savedAnswer);
                    break;
                case "dropdown":
                    Spinner spinner = findViewById(R.id.quetype_dropdown_box);
                    if (spinner != null && savedAnswer instanceof String) {
                        ArrayAdapter<String> adapter = (ArrayAdapter<String>) spinner.getAdapter();
                        if(adapter != null) {  // Add this check
                            int position = adapter.getPosition((String) savedAnswer);
                            if (position != -1) {
                                spinner.setSelection(position);
                                Log.d("Load Answer", "Loaded dropdown answer: " + savedAnswer + " for question ID: " + questionId);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        } else {
            // when there was no saved answer，log
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

                        // Load saved answer after setting the options
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
}
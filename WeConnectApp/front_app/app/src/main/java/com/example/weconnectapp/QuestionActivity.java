
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
    private Map<String, Integer> dropdownIds = new HashMap<>();

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
                            boolean boolValue = "Yes".equalsIgnoreCase(value);  // Convert the string to boolean
                            answer.setType("yes_or_no");
                            answer.setValue(boolValue);  // Set the yes_or_no answer with boolean value

                            updateOrAddAnswer(answer, questionId);

                            Log.d("Save Answer", "Saved answer: " + boolValue + " for question ID: " + questionId);
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
                        answer.setValue(selectedIndex + 1);  // Add 1 to the index

                        updateOrAddAnswer(answer, questionId);

                        Log.d("Save Answer", "Saved answer index: " + (selectedIndex + 1) + " for question ID: " + questionId);
                    }
                    break;

                case "Rating scales 1-10":
                    RadioGroup radioGroup10 = findViewById(R.id.type_rating_1_10_answer);
                    if (radioGroup10 != null) {
                        int selectedRadioButtonId = radioGroup10.getCheckedRadioButtonId();
                        if (selectedRadioButtonId != -1) {
                            int selectedIndex = radioGroup10.indexOfChild(findViewById(radioGroup10.getCheckedRadioButtonId()));
                            answer.setType("rating1_10");
                            answer.setValue(selectedIndex + 1);  // Add 1 to the index

                            updateOrAddAnswer(answer, questionId);

                            Log.d("Save Answer", "Saved answer: " + (selectedIndex + 1) + " for question ID: " + questionId);
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
                        Object selectedItem = spinner.getSelectedItem();
                        if(selectedItem != null) {
                            String selectedOption = selectedItem.toString();
                            int id = getDropdownId(selectedOption);
                            if (id != -1) {
                                answer.setType("dropdown_id");
                                answer.setValue(id);

                                updateOrAddAnswer(answer, questionId);

                                Log.d("Save Answer", "Saved dropdown answer ID: " + id + " for question ID: " + questionId);
                            } else {
                                Log.e("Save Answer", "Unknown dropdown option: " + selectedOption);
                            }
                        } else {
                            Log.e("Save Answer", "No selected item in dropdown for question ID: " + questionId);
                            return;  // Add this line to exit the method if no item is selected
                        }
                    }
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

                    if (questionList == null || questionList.isEmpty()) {
                        // No more questions, proceed to the next activity or whatever logic you want
                        if (areAllQuestionsAnswered()) {
                            Intent intent = new Intent(QuestionActivity.this, SurveySecondPersonalInfo.class);
                            intent.putExtra("answers", (Serializable) answers);
                            startActivity(intent);
                        } else {
                            Toast.makeText(QuestionActivity.this, "Please answer all questions before submitting.", Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        updateUI();
                    }
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
                    saveCurrentAnswer();  // Save the current answer

                    // Check if the current question is answered
                    if (questionList != null && !questionList.isEmpty() && isQuestionAnswered(questionList.get(0).getId())) {
                        // If answered, fetch the next question
                        currentPage++;
                        fetchQuestions();
                    } else {
                        // If not answered, show a toast message
                        Toast.makeText(QuestionActivity.this, "Please answer the current question before proceeding.", Toast.LENGTH_SHORT).show();
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
                    if (radioGroupYN != null && value instanceof Boolean) { // Check if value is Boolean
                        boolean answerValue = (Boolean) value; // Cast value to Boolean
                        String stringValue = answerValue ? "Yes" : "No"; // Convert Boolean to String
                        for (int i = 0; i < radioGroupYN.getChildCount(); i++) {
                            RadioButton rb = (RadioButton) radioGroupYN.getChildAt(i);
                            if (rb.getText().toString().equalsIgnoreCase(stringValue)) { // Compare with String value
                                rb.setChecked(true);
                                Log.d("Load Answer", "Loaded yes_or_no answer: '" + stringValue + "' for question ID: " + questionId);
                                break;
                            }
                        }
                    } else {
                        Log.e("Load Answer", "RadioGroup is null or saved answer is not a Boolean for question ID: " + questionId);
                    }
                    break;
                case "rating":
                    if (type.equals("Rating scales 1-5")) {
                        RadioGroup radioGroup = findViewById(R.id.type_rating_1_5_answer);
                        if (radioGroup != null && value instanceof Integer) {
                            int answerIndex = (Integer) value;
                            if (answerIndex >= 1 && answerIndex <= 5) { // Change the condition here
                                RadioButton radioButton = (RadioButton) radioGroup.getChildAt(answerIndex - 1);
                                if (radioButton != null) {
                                    radioButton.setChecked(true);
                                    Log.d("Load Answer", "Loaded answer index: " + answerIndex + " for question ID: " + questionId);
                                } else {
                                    Log.e("Load Answer", "RadioButton is null for index: " + (answerIndex - 1));
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
                            RadioButton radioButton = (RadioButton) radioGroup10.getChildAt(answerValue - 1);
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
                    if (spinner != null && value instanceof Integer) {
                        int id = (Integer) value;
                        String option = getDropdownValue(id);
                        if (option != null) {
                            ArrayAdapter<String> adapter = (ArrayAdapter<String>) spinner.getAdapter();
                            if (adapter != null) {
                                int position = adapter.getPosition(option);
                                if (position != -1) {
                                    spinner.setSelection(position);
                                    Log.d("Load Answer", "Loaded dropdown answer ID: " + id + " for question ID: " + questionId);
                                } else {
                                    Log.e("Load Answer", "Option not found in adapter: " + option);
                                }
                            } else {
                                Log.e("Load Answer", "Adapter is null");
                            }
                        } else {
                            Log.e("Load Answer", "Unknown dropdown id: " + id);
                        }
                    } else {
                        Log.e("Load Answer", "Spinner is null or saved answer is not an integer for question ID: " + questionId);
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
        Call<List<Option>> call = api.getDropdownOptions(questionId);
        call.enqueue(new Callback<List<Option>>() {
            @Override
            public void onResponse(Call<List<Option>> call, Response<List<Option>> response) {
                if (response.isSuccessful()) {
                    Log.d("API Response", "Response received: " + response.body());
                    List<Option> options = response.body();
                    Log.d("Parsed Options", "Options: " + options);
                    if (options != null && !options.isEmpty()) {
                        List<String> optionValues = new ArrayList<>();
                        optionValues.add("please select");  // Add the default option at the beginning
                        for (Option option : options) {
                            if (option.getOptionValue() != null && !option.getOptionValue().isEmpty()) {
                                optionValues.add(option.getOptionValue());
                                dropdownIds.put(option.getOptionValue(), option.getId());
                            } else {
                                Log.e("Dropdown Options", "Option value is null or empty for option ID: " + option.getId());
                            }
                        }
                        ArrayAdapter<String> adapter = new ArrayAdapter<>(QuestionActivity.this, android.R.layout.simple_spinner_item, optionValues);
                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        spinner.setAdapter(adapter);
                        spinner.setSelection(0);  // Set the default option as the selected one
                        Log.d("Spinner Items", "Items: " + optionValues);

                        postDropdownOptionsLoad(questionId, spinner);
                    } else {
                        Log.e("Dropdown Options", "Options are null or empty");
                    }
                } else {
                    Log.e("API Error", "Failed to fetch dropdown options. Status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<Option>> call, Throwable t) {
                Log.e("API Error", t.getMessage(), t);
            }
        });
    }
    private void postDropdownOptionsLoad(int questionId, Spinner spinner) {
        // Options are loaded, now we can load the saved answer
        loadSavedAnswer(questionId, "dropdown");
    }

    private int getDropdownId(String value) {
        Integer id = dropdownIds.get(value);
        if (id != null) {
            return id;
        } else {
            Log.e("Save Answer", "Unknown dropdown value: " + value);
            return -1;  //default value
        }
    }

    private String getDropdownValue(int id) {
        for (Map.Entry<String, Integer> entry : dropdownIds.entrySet()) {
            if (entry.getValue() == id) {
                return entry.getKey();
            }
        }
        Log.e("Load Answer", "Unknown dropdown id: " + id);
        return null;
    }
    private boolean areAllQuestionsAnswered() {
        // Check if all questions are answered
        // For simplicity, check if every questionId from 1 to 10 (inclusive) is in the answers list
        for (int questionId = 1; questionId <= 3; questionId++) {
            if (!isQuestionAnswered(questionId)) {
                return false;
            }
        }
        return true;
    }
    private boolean isQuestionAnswered(int questionId) {
        for (Answer answer : answers) {
            if (answer.getQuestionId() == questionId && answer.getValue() != null) {
                // Check for specific types and their valid answers
                switch (answer.getType()) {
                    case "text":
                        return !((String) answer.getValue()).trim().isEmpty();
                    case "yes_or_no":
                        return answer.getValue() instanceof Boolean;  // Fixed: Check if the value is not null and is a Boolean type
                    case "rating":
                    case "rating1_10":
                        return ((Integer) answer.getValue()) >= 1;
                    case "number":
                        return ((Integer) answer.getValue()) != null;
                    case "dropdown_id":
                        return ((Integer) answer.getValue()) > 0;
                    default:
                        return false;
                }
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
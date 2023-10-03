package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

public class Questionnaire extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questionnaire);
        LinearLayout questionContainer = findViewById(R.id.questionContainer);

        //simulate data of questions
        Question[] questions = {
                new Question(1,"question 1", QuestionType.SINGLE_CHOICE),
                new Question(2,"question 2",QuestionType.FILL_IN_THE_BLANK),
                new Question(3,"question 3", QuestionType.SINGLE_CHOICE),
                new Question(4,"question 4", QuestionType.SINGLE_CHOICE)
        };

        //Dynamically generated questionnaires
        for(Question question : questions){
            LinearLayout questionView = null;
            if(question.getType() == QuestionType.SINGLE_CHOICE){
                questionView = generateSingleChoiceQuestionView(question);
            } else if (question.getType()==QuestionType.FILL_IN_THE_BLANK) {
                questionView = generateFillInTheBlankView(question);

            }
            if(questionView != null){
                questionContainer.addView(questionView);
            }
        }
    }
    private LinearLayout generateSingleChoiceQuestionView(Question question){
        TextView questionText = new TextView(this);
        questionText.setText(questionText.getText());
        String[] options = {"option 1","option 2", "option 3", "option 4"};
        RadioGroup radioGroup = new RadioGroup(this);
        for(int i = 0; i < options.length; i++){
            RadioButton radioButton = new RadioButton(this);
            radioButton.setText(options[i]);
            radioButton.setId(i);
            radioGroup.addView(radioButton);
        }
        LinearLayout questionView = new LinearLayout(this);
        questionView.setOrientation(LinearLayout.VERTICAL);
        questionView.addView(questionText);
        questionView.addView(radioGroup);

        return questionView;
    }

    private LinearLayout generateFillInTheBlankView(Question question){
        TextView questionText = new TextView(this);
        questionText.setText(question.getText());

        EditText editText = new EditText(this);
        editText.setHint("Please enter your answer");

        LinearLayout questionView = new LinearLayout(this);
        questionView.setOrientation(LinearLayout.VERTICAL);
        questionView.addView(questionText);
        questionView.addView(editText);

        return questionView;
    }
}
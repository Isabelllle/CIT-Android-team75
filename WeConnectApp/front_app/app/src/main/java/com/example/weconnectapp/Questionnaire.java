package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class Questionnaire extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questionnaire);
        LinearLayout questionContainer = findViewById(R.id.questionContainer);

        //simulate data of questions
        Questions[] questions = {
                new Questions(1,QuestionType.FILL_IN_THE_BLANK,QuestionTopic.STORY,"question 1"),
                new Questions(2,QuestionType.FILL_IN_THE_BLANK,QuestionTopic.STORY,"question 2"),
                new Questions(3,QuestionType.YES_NO, QuestionTopic.STORY,"question 3"),
                new Questions(4,QuestionType.FILL_IN_THE_BLANK,QuestionTopic.STORY,"question 4")
        };

        //Dynamically generated questionnaires
        for(Questions question : questions){
            LinearLayout questionView = null;
            if(question.getType() == QuestionType.YES_NO){
                questionView = generateYesNoQuestionView(question);
            } else if (question.getType()==QuestionType.FILL_IN_THE_BLANK) {
                questionView = generateFillInTheBlankView(question);

            }
            if(questionView != null){
                questionContainer.addView(questionView);
            }
        }
    }

    //Question Type: Yes or No
    private LinearLayout generateYesNoQuestionView(Questions question){
        TextView questionText = new TextView(this);
        questionText.setText(questionText.getText());
        String[] options = {"YES","NO"};
        RadioGroup radioGroup = new RadioGroup(this);
        for(int i = 0; i < options.length; i++){
            RadioButton radioButton = new RadioButton(this);
            radioButton.setText(options[i]);
            radioButton.setId(i);
            radioGroup.addView(radioButton);
        }
        LinearLayout questionView = new LinearLayout(this);
        questionView.setPadding(30,25,30,25);
        questionView.addView(questionText);
        questionView.addView(radioGroup);

        return questionView;
    }

    //Question Type: Enter Text
    private LinearLayout generateFillInTheBlankView(Questions question){
        TextView questionText = new TextView(this);
        questionText.setText(question.getText());

        EditText editText = new EditText(this);
        editText.setHint("Please enter your answer");

        LinearLayout questionView = new LinearLayout(this);
        questionView.setOrientation(LinearLayout.VERTICAL);
        questionView.setPadding(16,16,16,16);
        questionView.addView(questionText);
        questionView.addView(editText);

        return questionView;
    }

    //Question Type: Enter Number
    //Question Type: Rating 1-5
    //Question Type: Rating 1-10
    //Question Type: Drop Down
}
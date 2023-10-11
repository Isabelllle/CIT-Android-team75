package com.example.weconnectapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.ArrayAdapter;
import android.widget.Button;

public class QuestionSearchDropdown extends AppCompatActivity {

    private AutoCompleteTextView autoCompleteTextView;
    private static final String[] data = new String[]{ "Afghanistan", "Albania", "Algeria", "Andorra",
            "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
            "Azerbaijan","Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia","Canada","Chile",
            "China", "Colombia","Finland", "France","Greece","Iceland", "India","Japan","Malaysia",
            "United Kingdom (UK)", "United States of America (USA)","South Korea"};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_search_dropdown);

        autoCompleteTextView = (AutoCompleteTextView) findViewById(R.id.dropdown_text_box);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(QuestionSearchDropdown.
                this, android.R.layout.simple_dropdown_item_1line, data);
        autoCompleteTextView.setAdapter(adapter);

        //Redirection to congrats page when click on "next" button
        Button button1 = findViewById(R.id.next_button);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(QuestionSearchDropdown.this, QuestionActivity.class);
                startActivity(intent);
            }
        });

        //Redirection to previous page when click on "previous" button
        Button button2 = findViewById(R.id.previous_button);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(QuestionSearchDropdown.this, SurveyPrivacyPolice.class);
                startActivity(intent);
            }
        });

    }
}
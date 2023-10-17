package com.example.weconnectapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;


import com.example.weconnectapp.databinding.MainPageBinding;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_page);

        /*
        // call main_page.xml
        binding = MainPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        */


        //Redirection to Volunteer home page.
        ImageButton buttonNext = findViewById(R.id.right_button);
        buttonNext.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent();
                intent.setClass(MainActivity.this, NavHomePage.class);
                // launch the Volunteer home page.
                startActivity(intent);
            }
        });

    }


}
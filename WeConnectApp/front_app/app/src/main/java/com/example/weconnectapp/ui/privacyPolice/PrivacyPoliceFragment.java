package com.example.weconnectapp.ui.privacyPolice;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;


import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import android.text.Html;


import com.example.weconnectapp.databinding.FragmentPrivacyPoliceBinding;

public class PrivacyPoliceFragment extends Fragment {

    private FragmentPrivacyPoliceBinding binding;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentPrivacyPoliceBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        return root;
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
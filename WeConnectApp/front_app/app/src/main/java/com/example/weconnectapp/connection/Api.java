package com.example.weconnectapp.connection;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import com.example.weconnectapp.VolunteerDetails;

public interface Api {
    @POST("/api/volunteer/volunteerDetails")
    Call<Void> postVolunteerDetails(@Body VolunteerDetails details);

}


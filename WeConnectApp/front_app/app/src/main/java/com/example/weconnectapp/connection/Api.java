package com.example.weconnectapp.connection;

import com.example.weconnectapp.Questions;
import com.example.weconnectapp.Response;
import com.example.weconnectapp.VolunteerDetails;
import retrofit2.http.Path;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface Api {
    @POST("/api/volunteer/volunteerDetails")
    Call<Void> postVolunteerDetails(@Body VolunteerDetails details);

    @GET("/api/survey/questions")
    Call<List<Questions>> getQuestions(@Query("page") int page, @Query("limit") int limit);

    @POST("/api/survey/responses")
    Call<Void> submitResponse(@Body Response response);

    @GET("/api/dropdown-options/{questionId}")
    Call<List<String>> getDropdownOptions(@Path("questionId") int questionId);
}


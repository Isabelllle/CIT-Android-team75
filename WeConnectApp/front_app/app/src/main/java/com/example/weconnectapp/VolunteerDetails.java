package com.example.weconnectapp;

public class VolunteerDetails {

    private String firstName;
    private String lastName;
    private String email;
    private int postcode;
    private String managerEmail;
    private Integer groupId; 
    private String groupName;
    private String otherGroupName;
    private String firstSubTime; 
    private String secSubTime;
    private String fcmToken;

    public VolunteerDetails(String firstName, String lastName, String email, int postcode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.postcode = postcode;
        this.managerEmail = null;
        this.groupId = null;
        this.groupName = null;
        this.otherGroupName = null;
        this.firstSubTime = null;
        this.secSubTime = null;
        this.fcmToken = null;
    }
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPostcode() {
        return postcode;
    }

    public void setPostcode(int postcode) {
        this.postcode = postcode;
    }

    public String getManagerEmail() {
        return managerEmail;
    }

    public void setManagerEmail(String managerEmail) {
        this.managerEmail = managerEmail;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getOtherGroupName() {
        return otherGroupName;
    }

    public void setOtherGroupName(String otherGroupName) {
        this.otherGroupName = otherGroupName;
    }

    public String getFirstSubTime() {
        return firstSubTime;
    }

    public void setFirstSubTime(String firstSubTime) {
        this.firstSubTime = firstSubTime;
    }

    public String getSecSubTime() {
        return secSubTime;
    }

    public void setSecSubTime(String secSubTime) {
        this.secSubTime = secSubTime;
    }

    public String getFcmToken() {
        return fcmToken;
    }

    public void setFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }
}

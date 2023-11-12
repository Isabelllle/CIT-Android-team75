## Table of Content
* [Collective Impact Tool](#collective-impact-tool)
* [Introduction](#introduction)
* [Our team members](#our-team-members)
* [Project Background](#project-background)
* [Demo](#demo)
* [Documentation](#documentation)
* [System Requirements](#system-requirements)
* [Installation Guide](#installation-guide)
* [Changelog](#changelog)
* [Traceability Matrix](#traceability-matrix)

## Collective Impact Tool

Welcome to the Collective Impact Tool (CIT) Android app, developed by Team WI5DOM. This app is designed to empower users to participate in surveys and provide valuable insights over time.  

## Introduction  

The Collective Impact Tool (CIT) Android app focuses on two key aspects:  
1. **User Surveys**: This app enables users to register and participate in surveys. Users can register to participate in surveys and complete follow-up surveys after a set period.  
2. **Admin Dashboard**: The admin page provides detailed statistics on completed surveys.   

## Our team members  

Xinyu Shi     1174419  
Yijun Guo     1255197  
Zixian Li     1240140  
Zhiyi Wang    1173477  
Jielong Zeng  1214079  

## Project Background

The product is primarily inspired by the spirit of Volunteering Victoria, embodying the mission to foster the advocacy sector and boost the volunteer community in Victoria. Aligned with this objective, the WeConnect Application for volunteers to take surveys, along with the Admin Management System for administrators to visualize survey results, have been developed.
 
WeConnect Application is designed to collect data about a volunteer’s experience, skills, and changes with three domains involving Volunteer well-being, Volunteer Confidence, and Volunteer to Job potential. To track the changes, two surveys are expected to be completed. The first survey is required to be finished at the beginning of a volunteer placement. Subsequently, there will be another follow-up survey after two months, which will be notified by reminders.
 
Admin Management System is a website to visualize and analyze survey results for administrators and managers. Different access permissions are developed to show the trends and insights of volunteers’ personal development as well as the changes across the three domains mentioned above. Therefore, administrators or managers can reflect on this quantitative data collection and support future improvements in volunteer programs.
 
With user-centric design and strategic functionalities, our product stands ready to inspire volunteer management and engagement in Victoria, inviting administrators and volunteers alike to join us in this innovative leap forward.


## Demo

## Documentation

## System Requirements
The database we used is called **PgAdmin4**. The database deployed on Amazon is designed to provide a secure and stable cloud-based solution. 

Here is the account we create: 
User name: 'postgres', password:  "Qezc5566".

PgAdmin4 can be used for conveniently viewing and managing the cloud database. Below is the download link
https://www.pgadmin.org/download/

Entity-Relationship Diagram (ERD):      
![Image](https://[raw.github.com/yourName/repositpry/master/yourprojectName/img-folder/test.jpg](https://github.com/Isabelllle/CIT-Android-team75/blob/Edit-Readme-file---Basic-Structure/HandoverResource/Image/database_model.png))


The relationships between various entities can be illustrated using an Entity-Relationship Diagram (ERD).

Relationships below:
Each **admin** belongs to one **group**.
Each **admin** manages several **volunteersv.
**Volunteers** who do not take the second survey on time will be put in the **reminder list**.
**Volunteers** can **respond** to the **questions** of the survey.
The survey has **dropdown questions**.


## Installation Guide 
Steps: 
1. Download(Git clone)
2. Start by navigating to the 'main' branch on your version control system. Make sure you're working with the latest code.  
Command for git through Terminal: 
`git checkout main`    
3. Both frontend and backend servers need to be running simultaneously.  
     **Run Frontend:**     
     Open a terminal window and navigate to the AdminWeb/front_web/admin_react directory.    
     Use the following command to start the frontend server:     
     `npm start`    
     *Note: You need to install npm before running*  
     `npm install`
            
     **Run Backend:**    
     Open a new terminal window and navigate to the AdminWeb/back_web directory.    
     Start the backend server using the following command:   
    `node app.js`   
     Access The Website:    
4. Open a web browser and go to the address: http://localhost3001/static/login (Login Page)
         
**Admin account provided for the test is:**    
username: weconnect@volunteeringvictoria.org.au     
password: adminpassword    
**Manager account provided for the test is:**   
username: 123456789@gmail.com   
password: managerpassword    

Additionally, you can access the signup page at http://localhost:3001/static/signin.   

## Changelog

## Traceability Matrix


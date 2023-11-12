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

## Demo

## Documentation

## System Requirements
The database we used is called **PgAdmin4**. The database deployed on Amazon is designed to provide a secure and stable cloud-based solution. 

Here is the account we create: 
User name: 'postgres', password:  "Qezc5566".

PgAdmin4 can be used for conveniently viewing and managing the cloud database. Below is the download link
https://www.pgadmin.org/download/

Entity-Relationship Diagram (ERD): 


The relationships between various entities can be illustrated using an Entity-Relationship Diagram (ERD).

Relationships below:
Each **admin** belongs to one **group**.
Each **admin** manages several **volunteersv.
**Volunteers** who do not take the second survey on time will be put in the **reminder list**.
**Volunteers** can **respond** to the **questions** of the survey.
The survey has **dropdown questions**.






## Installation Guide

## Changelog

## Traceability Matrix


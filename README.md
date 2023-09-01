# Collective Impact Tool (CIT) - Android App

Welcome to the Collective Impact Tool (CIT) Android app, developed by Team WI5DOM. This app is designed to empower users to participate in surveys and provide valuable insights over time.  

## Introduction  

The Collective Impact Tool (CIT) Android app focuses on two key aspects:  
1. **User Surveys**: This app enables users to register and participate in surveys. Users can register to participate in surveys and complete follow-up surveys after a set period.  
2. **Admin Dashboard**: The admin page provides detailed statistics on completed surveys.   

## Our team members  

Xinyu Shi   
Yijun Guo     1255197  
Zixian Li     1240140  
Zhiyi Wang  
Jielong Zeng  

# My Status Badge of Pipeline
[![Build Status](https://dev.azure.com/CIT-team75/CIT-Android-team75/_apis/build/status%2FIsabelllle.CIT-Android-team75?branchName=main)](https://dev.azure.com/CIT-team75/CIT-Android-team75/_build/latest?definitionId=1&branchName=main)

## Announcements  

During the collaborative development process, please note the following:  

### Branch Management  

1. AVOID making changes directly to the main branch. All work should be conducted within specific feature branches.  
2. For front-end development, each page should be developed on its own separate branch.  
3. For back-end development, each functional module should be developed on its own separate branch.  

### Preparing for Merges  

1. Before merging code, MAKE SURE that there are no unresolved conflicts in the codebase. If conflicts arise, collaborate with the involved developers to resolve them.  
2. AVOID making unilateral code changes. Discuss and resolve conflicts jointly with the involved developers.  

### Code Merges  

1. MAKE SURE to dicuss with the involved developers before merging. DO NOT merge code without prior consultation.  
2. All merge requests should undergo code review and pass CI tests to ensure code quality.  

### Comment Messages  
When committing code, provide clear commit messages that describe your changes.   
**DO NOT PROVIDE MEANINGLESS OR IRRELEVANT COMMENTS**  

### Testing
1. Ensure that all code changes are accompanied by appropriate test cases to validate functionality.
2. Define and adhere to a testing strategy that includes unit, integration, and end-to-end testing.  

## Git Commands
See What Branch You're On: `$ git status`
Create a New Branch：`$ git checkout -b my-branch-name` (replacing my-branch-name with whatever name you want)  
Switch to a Branch In Your Local Repo：`$ git checkout my-branch-name`  
Push to a Branch: `$ git push -u origin my-branch-name` **or** `$ git push -u origin HEAD` (If your local branch does not exist on the remote)  
                  `$ git push` (If your local branch already exists on the remote)  
Add files: `$ git add .`  
Delete files:  `$ git rm filename`  
Commit files: `$ git commit -m "Message that describes what this change does"`  
Merge a Branch: 
1. First, Must check out the branch that you want to merge another branch into, if not in desired branch: `$ git checkout master` (Replace master with another branch name as needed)  
2. Now you can merge another branch into the current branch: `$ git merge my-branch-name`  
Delete Branches: 
To delete a remote branch, run this command:
`$ git push origin --delete my-branch-name`
To delete a local branch, run either of these commands:
`$ git branch -d my-branch-name` or `$ git branch -D my-branch-name`

###########Directory Structure Description
├── Readme.md                   // help
├── azure-pipelines             // pipeline

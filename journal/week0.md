# Week 0 — Billing and Architecture

## AWS CLI installation and verification was done by committing through gitpod.
I struggled with invalidtokenid error for a while when I tried aws sts get-caller-identity command.
Workspace was starting with AWS CLI installed as the video.
I had my gitpod env variables saved as well.
I uninstalled and reinstalled all my VSCode extensions.
It did not solve the problem.
Finally I was able to figure out. VSCode was looking for a specific file name, and I was naming them differently.
It was super frustrating since both VSCode and Gitpod are new tools for me. I have used Jupyter/Colab notebooks in my projects before this project.


## Creating budget
I have created a budget for $10. And I have set alarm for 50%, 75% and 100%.
It will be emailing me if any of the threshold is exceeded.
My AWS account alias is esen-general-admin
You can see it in the following image.
![Budget](assets/Budget.png)


## Created napkin model on a napkin
[Napkin Model](assets/Napkin_model.pdf)

## Creating Logical model on LucidChart
I enjoyed creating the chart. I could not find third party serverless icon on LucidCharts.
I took a screenshot of Momento icon from google and drag/drop into LucidCharts.
It was quiet impressive to experience how flexible LucidCharts is.
Here is my final flowchart.

[Logical model of Cruddur](https://lucid.app/lucidchart/cc75068e-4823-449a-a9f4-f91ab9da75e5/edit?viewport_loc=35%2C-92%2C2487%2C1301%2C0_0&invitationId=inv_e55e919e-4758-44df-b2e0-376790691283)


# Week 5 — DynamoDB and Serverless Caching
DynamoDB table creation
We created a single table to store instant messaging in DynamoDB.
DynamoDB is a NOSQL database. It is extremely fast and scalable.
Therefore we decided to use DynamoDB in direct messaging in Cruddur app.
In DynamoDB, instead of indexes compared to SQL databases, there are partition key and sort key.
Partition key and sort key are used to query the data.
We have used message group ids as partition key and user ids as sort key.
When we query with partition key, it will be returning a message group and messages that belong to this message group.
The most difficult part of creating single table design was deciding primary keys according to the access patterns we have.
We outlined the access patterns and layout the table structure before creating the table.

![Access patterns](assets/DynamoDb_single_table_access_patterns.png)

After creating DynamoDB database. We worked only in the local. We set AWS_END_POINT in Docker Compose file to be http://dynamodb-local:8000
Then by using the RDS local database we gave created in week 4, we loaded schema and seeded our data. 
In our seed data we did not have Cognito user ids. We created a Pythin script by using BOTO3 library. In order to get conversations between two users, I created another Cognito User for Bayko. Then we can connected to our Cognito identity pool, obtained Cognitio user ids and updated our RDS local database with Cognito user ids. Code for the bash scripts and python scripts can be found in the following ![commit](https://github.com/ebusen/aws-bootcamp-cruddur-2023/commit/3daa5b9f4b05b71c815941b291605dacf19336f3)
After updating Cognito user ids, we loaded our schema to local DynamoDB and seed data into the table.
After uploading data, we were able to get conversations and list conversation between the two Cognito Users we had. ![commit](https://github.com/ebusen/aws-bootcamp-cruddur-2023/commit/b9fc8eabe3697db16780b937ba3cf1b615af947a)

Implementing conversations also required multiple changes on the frontend pages. We also added new message page, updated their routes.
I was stuck at this week for almost two weeks. Finally, here is the final screenshots of my accomplishment.


![update](assets/updating_an_existing_message_group.png)

![create](assets/Creating_a_new_message_group_with_Mock_user.png)

#DynamoDB implementation#
Ddb Schema is updated with global secondary index. Then the local endpoint is commented out. Since there is no mmore local endpoint, seed script will use AWS DynamoDB as endpoint url. We uploaded schema to production environment.Double checked the creation of our table on AWS DynamoDB. Then we turned on DynamoDB stream. And added a trigger function. Whenever, a message is added into cruddur, it will be invoking a lambda function which will be inserting the message into DynamoDB. We needed LambdaInvoke and DynamoDB permissions. Lambdainvoke permission was managed by AWS and we created DynamoDB query, delete item and put item permission by using policy editor. After attaching correct policies to IAM exceutive lambda role, we tested the system by manually entering data. By using the handle url (.../messages/new/bayko or ...messages/messages/new/londo) we were able to enter data manually. This step was necessary so that we do not create any cost.
Here is a screenshot of my messages.

![messages](assets/Messages.png)

Here is the CloudWatch Logs for the above messages.

![Cloudwatch logs for messages](assets/Cloudwatch_logs_for_messages.png)


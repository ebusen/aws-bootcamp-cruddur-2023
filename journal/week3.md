# Week 3 — Decentralized Authentication

**User authentication with AWS Cognito frontend implementation:**
In week 3, we started working on authentication of users during sign up and sign in. We decided to use Cognito user pool provider for sign in experience, in which users can sign in by using their thrid party emails. The second provider is federated identity user pool provider. We did not use federated identity user pool cause this pool enables users to access AWS services. That is why we decided to use Cognito user pool provider for authentication.
While we ere configuring Cognito user pool, we enabled self registration and decided to verify users by emailing them using Cognito email service since notification with messages was not free. We also did not setup Simple Email Service since it required further configuration. Then in the user pool, we integrated our app as a public service. We recorded user pool id and app client id. 

For authenticaton, we first installed AWS amplify in our frontend container. Then configured environment variables to use AWS Amplify; region, client id, cognito user pool id. We updated docker compose file to include these environment variables to react app at every start of workspace.
Then we have made multiple changes in several frontend pages including profileinfo, desktopsidebar, sign in, sign up, confirmation and recovery pages.
We have also updated CORS for our app. By using Cognito we authenticated the user and stored access token in local store.

**Backend implementation: Cognito JWT Token transfer to backend**
After authenticating the user, we were storing access token in the local storage. We need to send this token to our backend application.
In the backend, the next step is to validate this token if it is correct or not. 


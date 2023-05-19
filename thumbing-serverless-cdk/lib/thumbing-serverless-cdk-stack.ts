import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as dotenv from "dotenv";
// import * as sqs from 'aws-cdk-lib/aws-sqs';


dotenv.config();

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucketName: string =process.env.THUMBING_BUCKET_NAME as string;
    //const bucket=this.createBucket(bucketName);
    const bucket=this.importBucket(bucketName);
    const folderInput: string = process.env.THUMBING_S3_FOLDER_INPUT as string;
    const folderOutput: string = process.env.THUMBING_S3_FOLDER_OUTPUT as string;
    const webhookUrl: string = process.env.THUMBING_WEBHOOK_URL as string;
    const topicName: string = process.env.THUMBING_TOPIC_NAME as string;
    const functionPath: string = process.env.THUMBING_FUNCTION_PATH as string;
    const lambda=this.createFunction(functionPath,bucketName,folderInput,folderOutput);
    this.createS3NotifyToLambda(folderInput,lambda,bucket);
    const s3ReadWritePolicy=this.createPolicyBucketAccess(bucket.bucketArn);
    lambda.addToRolePolicy(s3ReadWritePolicy);
    //const snsPublishPolicy = this.createPolicySnSPublish(snsTopic.topicArn)
    //lambda.addToRolePolicy(snsPublishPolicy);
    const snsTopic = this.createSnsTopic(topicName);
    this.createSnsSubscription(snsTopic,webhookUrl);
    this.createS3NotifyToSns(folderOutput,snsTopic,bucket);



  }
  importBucket(bucketName:string){
    const bucket=s3.Bucket.fromBucketName(this,'AssetsBucket',bucketName);
    return bucket;
  }
  /*createBucket(bucketName:string): s3.IBucket{
    const bucket=new s3.Bucket(this,'AssetsBucket',{
      bucketName:bucketName,
      removalPolicy:cdk.RemovalPolicy.DESTROY
    });
    return bucket;
  }*/
  createFunction(functionPath:string,bucketName:string,folderInput:string, folderOutput:string): lambda.IFunction{
    const lambdaFunction=new lambda.Function(this,'THUMBING_LAMBDA',{
      code: lambda.Code.fromAsset(functionPath),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      environment:{
        DEST_BUCKET_NAME:bucketName,
        FOLDER_INPUT: folderInput,
        FOLDER_OUTPUT: folderOutput,
        PROCESS_WIDTH:'512',
        PROCESS_HEIGHT:'512'
      }
    });
    return lambdaFunction;
    }
    createS3NotifyToLambda(prefix: string, lambda: lambda.IFunction, bucket: s3.IBucket):  void{
      const destination = new s3n.LambdaDestination(lambda);
      bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT,
      destination,
      {prefix: prefix}
    )
    }
    createPolicyBucketAccess(bucketArn: string){
      const s3ReadWritePolicy = new iam.PolicyStatement({
        actions: [
          's3:GetObject',
          's3:PutObject',
        ],
        resources: [
          `${bucketArn}/*`,
        ]
      });
      return s3ReadWritePolicy;
    }
  createSnsTopic(topicName: string): sns.ITopic{
    const logicalName = "Thumbing Topic";
    const snsTopic = new sns.Topic(this, logicalName, {
      topicName: topicName
    });
    return snsTopic;
  }
  createSnsSubscription(snsTopic: sns.ITopic, webhookUrl: string): sns.Subscription {
    const snsSubscription = snsTopic.addSubscription(
      new subscriptions.UrlSubscription(webhookUrl)
    )
    return snsSubscription;
  }
  createS3NotifyToSns(prefix: string, snsTopic: sns.ITopic, bucket: s3.IBucket): void {
    const destination = new s3n.SnsDestination(snsTopic)
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT, 
      destination,
      {prefix: prefix}
    );
  }
  /*
    createPolicySnSPublish(topicArn: string){
    const snsPublishPolicy = new iam.PolicyStatement({
      actions: [
        'sns:Publish',
      ],
      resources: [
        topicArn
      ]
    });
    return snsPublishPolicy;
  } */
     
}
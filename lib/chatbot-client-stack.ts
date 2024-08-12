import { aws_chatbot as chatbot, aws_logs as logs, aws_sns, aws_ssm, RemovalPolicy, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { SlackChannelConfiguration } from 'aws-cdk-lib/aws-chatbot';
import { Construct } from 'constructs';
import { slackChannelId, slackWorkspaceId } from './shared';
import {
    Effect,
    ManagedPolicy,
    PolicyStatement,
    Role,
    ServicePrincipal
} from 'aws-cdk-lib/aws-iam';


export class ChatBotClientStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const chatBotClientRole = new Role(this, 'ChatBotClientRole', {
            assumedBy: new ServicePrincipal('chatbot.amazonaws.com'),
        });

        chatBotClientRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
                'logs:DescribeLogStreams',
                'logs:DescribeLogGroups',],
            resources: ['arn:aws:logs:*:*:log-group:/aws/chatbot/*'],
        }));

        chatBotClientRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['cloudwatch:Describe*',
                'cloudwatch:Get*',
                'cloudwatch:List*'],
            resources: ['*'],
        }));

        chatBotClientRole.addToPolicy(new PolicyStatement({
            effect: Effect.DENY,
            actions: ['iam:*',
                's3:GetBucketPolicy',
                'ssm:*',
                'sts:*',
                'kms:*',
                'cognito-idp:GetSigningCertificate',
                'ec2:GetPasswordData',
                'ecr:GetAuthorizationToken',
                'gamelift:RequestUploadCredentials',
                'gamelift:GetInstanceAccess',
                'lightsail:DownloadDefaultKeyPair',
                'lightsail:GetInstanceAccessDetails',
                'lightsail:GetKeyPair',
                'lightsail:GetKeyPairs',
                'redshift:GetClusterCredentials',
                'storagegateway:DescribeChapCredentials'],
            resources: ['*'],
        }));

        chatBotClientRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['sns:ListSubscriptionsByTopic',
                'sns:ListTopics',
                'sns:Unsubscribe',
                'sns:Subscribe',
                'sns:ListSubscriptions'],
            resources: ['*'],
        }));

        chatBotClientRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonQFullAccess'))
        chatBotClientRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSResourceExplorerReadOnlyAccess'))
        chatBotClientRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'))

        const chatbotTopicOne = new aws_sns.Topic(this, 'ChatbotSnsTopicOne', {},);
        const chatbotTopicTwo = new aws_sns.Topic(this, 'ChatbotSnsTopicTwo', {},);
        const chatbotTopicThree = new aws_sns.Topic(this, 'ChatbotSnsTopicThree', {},);
        
        new aws_ssm.StringParameter(this, 'ChatbotTopicArnOne', {
            stringValue: 'Chatbot.TopicArnOne',
            parameterName: '/chatbot/topic-arn-one',
        });
        new aws_ssm.StringParameter(this, 'ChatbotTopicArnTwo', {
            stringValue: 'Chatbot.TopicArnTwo',
            parameterName: '/chatbot/topic-arn-two',
        });
        new aws_ssm.StringParameter(this, 'ChatbotTopicArnThree', {
            stringValue: 'Chatbot.TopicArnThree',
            parameterName: '/chatbot/topic-arn-three',
        });
        
        const slackConfigurationOne = new SlackChannelConfiguration(this, 'SlackConfigurationOne', {
            slackChannelConfigurationName: 'SlackConfigurationOne',
            slackWorkspaceId: slackWorkspaceId,
            slackChannelId: slackChannelId,
            logRetention: logs.RetentionDays.ONE_DAY,
            loggingLevel: chatbot.LoggingLevel.ERROR,
            notificationTopics: [ chatbotTopicOne ],
            role: chatBotClientRole,
        });
        slackConfigurationOne.applyRemovalPolicy(RemovalPolicy.DESTROY);
        Tags.of(slackConfigurationOne).add('chatbot-loggroup-location', 'LOGGROUP-LOCATION-US-EAST-1');
        
        const slackConfigurationTwo = new SlackChannelConfiguration(this, 'SlackConfigurationTwo', {
            slackChannelConfigurationName: 'SlackConfigurationTwo',
            slackWorkspaceId: slackWorkspaceId,
            slackChannelId: slackChannelId,
            logRetention: logs.RetentionDays.ONE_DAY,
            loggingLevel: chatbot.LoggingLevel.ERROR,
            notificationTopics: [ chatbotTopicTwo ],
            role: chatBotClientRole,
        });
        slackConfigurationTwo.applyRemovalPolicy(RemovalPolicy.DESTROY);
        Tags.of(slackConfigurationTwo).add('chatbot-loggroup-location', 'LOGGROUP-LOCATION-US-EAST-1');
        
        const slackConfigurationThree = new SlackChannelConfiguration(this, 'SlackConfigurationThree', {
            slackChannelConfigurationName: 'SlackConfigurationThree',
            slackWorkspaceId: slackWorkspaceId,
            slackChannelId: slackChannelId,
            logRetention: logs.RetentionDays.ONE_DAY,
            loggingLevel: chatbot.LoggingLevel.ERROR,
            notificationTopics: [ chatbotTopicThree ],
            role: chatBotClientRole,
        });
        slackConfigurationThree.applyRemovalPolicy(RemovalPolicy.DESTROY);
        Tags.of(slackConfigurationThree).add('chatbot-loggroup-location', 'LOGGROUP-LOCATION-US-EAST-1');
    }
}

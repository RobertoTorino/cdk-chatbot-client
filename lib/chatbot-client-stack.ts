import { aws_chatbot as chatbot, aws_logs as logs, aws_sns, aws_ssm, RemovalPolicy, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { SlackChannelConfiguration } from 'aws-cdk-lib/aws-chatbot';
import { Construct } from 'constructs';
import { slackChannelId, slackWorkspaceId } from './shared';


export class ChatBotClientStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        
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
            notificationTopics: [ chatbotTopicOne ]
        });
        slackConfigurationOne.applyRemovalPolicy(RemovalPolicy.DESTROY);
        Tags.of(slackConfigurationOne).add('chatbot-loggroup-location', 'LOGGROUP-LOCATION-US-EAST-1');
        
        const slackConfigurationTwo = new SlackChannelConfiguration(this, 'SlackConfigurationTwo', {
            slackChannelConfigurationName: 'SlackConfigurationTwo',
            slackWorkspaceId: slackWorkspaceId,
            slackChannelId: slackChannelId,
            logRetention: logs.RetentionDays.ONE_DAY,
            loggingLevel: chatbot.LoggingLevel.ERROR,
            notificationTopics: [ chatbotTopicTwo ]
        });
        slackConfigurationTwo.applyRemovalPolicy(RemovalPolicy.DESTROY);
        Tags.of(slackConfigurationTwo).add('chatbot-loggroup-location', 'LOGGROUP-LOCATION-US-EAST-1');
        
        const slackConfigurationThree = new SlackChannelConfiguration(this, 'SlackConfigurationThree', {
            slackChannelConfigurationName: 'SlackConfigurationThree',
            slackWorkspaceId: slackWorkspaceId,
            slackChannelId: slackChannelId,
            logRetention: logs.RetentionDays.ONE_DAY,
            loggingLevel: chatbot.LoggingLevel.ERROR,
            notificationTopics: [ chatbotTopicThree ]
        });
        slackConfigurationThree.applyRemovalPolicy(RemovalPolicy.DESTROY);
        Tags.of(slackConfigurationThree).add('chatbot-loggroup-location', 'LOGGROUP-LOCATION-US-EAST-1');
    }
}

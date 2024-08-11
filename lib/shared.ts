import { CodePipelineSource } from 'aws-cdk-lib/pipelines';
import {
    Stack,
    Tags
} from 'aws-cdk-lib';

export const env = {
    account: process.env.CDK_SYNTH_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_SYNTH_REGION || process.env.CDK_DEFAULT_REGION,
};

export const addTags = (stack: Stack, environment: Environment) => {
    Tags.of(stack).add('Application', appName, {
        applyToLaunchedInstances: true,
        priority: 100,
        includeResourceTypes: [],
    });
    Tags.of(stack).add('Stage', environment, {
        applyToLaunchedInstances: true,
        priority: 100,
        includeResourceTypes: [],
    });
};

export enum StageName {
    Prod = 'prod',
}

export enum Environment {
    Prod = 'Prod'
}

export const appName = 'chatbot-client';
export const repositoryName = 'chatbot-client';
export const branchName = 'main';

export const codePipelineCodeStarArn = `arn:aws:codestar-connections:eu-west-1:[aws-account-id-here]:connection/[connection-id-here]`;
export const sourceCode = CodePipelineSource.connection('persgroep/' + repositoryName, branchName, {
    connectionArn: codePipelineCodeStarArn,
    triggerOnPush: true,
});

export const slackWorkspaceId = 'TE92U6HDY';
export const slackChannelId = 'C03G4UH6WCE';
export const chatBotSubscriptionEndpoint = 'https://global.sns-api.chatbot.amazonaws.com';

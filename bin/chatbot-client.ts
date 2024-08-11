#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {
    addTags,
    env,
    Environment
} from '../lib/shared';
import { ChatbotClientPipelineStack } from '../lib/chatbot-client-pipeline-stack';

const app = new cdk.App();

export const chatbotClientPipelineStack = new ChatbotClientPipelineStack(app, 'ChatbotClientPipelineStack', {
    stackName: 'ChatbotClientPipelineStack',
    description: 'Pipeline Stack for a ChatBot Client',
    env,
});
addTags(chatbotClientPipelineStack, Environment.Prod);

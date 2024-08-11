#!/bin/bash

# get possible arguments
npx cdk-dia --help

# only diagram chosen stacks
npx cdk-dia --include stackOne stackFour

# choose stacks by path (nested stacks, pipeline stacks)
npx cdk-dia --include ChatbotClientPipelineStack/ChatBotForRegionOne/chatbot-client

# exclude chosen stacks from the diagram
npx cdk-dia --exclude stackOne
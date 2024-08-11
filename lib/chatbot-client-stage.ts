import {
    Stage,
    StageProps
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
    addTags,
    appName,
    Environment
} from './shared';
import { ChatBotClientStack } from './chatbot-client-stack';


export class ChatbotClientStageOne extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const chatBotClientStackOne = new ChatBotClientStack(this, appName, {
            description: 'ChatBot Client',
            env: {
                region: process.env.CDK_DEFAULT_REGION,
            },
        });
        addTags(chatBotClientStackOne, Environment.Prod);
    }
}

export class ChatBotClientStageTwo extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const chatBotClientStackTwo = new ChatBotClientStack(this, appName, {
            description: 'ChatBot Client',
            env: {
                region: process.env.CDK_DEFAULT_REGION,
            },
        });
        addTags(chatBotClientStackTwo, Environment.Prod);
    }
}

export class ChatBotClientStageThree extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const chatBotClientStackThree = new ChatBotClientStack(this, appName, {
            description: 'ChatBot Client',
            env: {
                region: process.env.CDK_DEFAULT_REGION,
            },
        });
        addTags(chatBotClientStackThree, Environment.Prod);
    }
}

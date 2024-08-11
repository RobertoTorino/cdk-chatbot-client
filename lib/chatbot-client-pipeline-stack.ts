import {
    pipelines,
    Stack,
    StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
    env,
    sourceCode
} from './shared';
import {
    ChatbotClientStageOne,
    ChatBotClientStageThree,
    ChatBotClientStageTwo
} from './chatbot-client-stage';

export class ChatbotClientPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const chatBotClientPipeline = new pipelines.CodePipeline(this, 'ChatbotPipeline', {
            crossAccountKeys: true,
            selfMutation: true,
            pipelineName: 'ChatbotPipeline',
            synth: new pipelines.ShellStep('Synthesize', {
                input: sourceCode,
                primaryOutputDirectory: 'cdk.out',
                commands: ['npm ci',
                    'npm run build',
                    'npx cdk synth',
                    'npx cdk ls -q'],
            }),
        });

        const preStep = new pipelines.ShellStep('PreStep', {
            commands: ['npm ci',
                'npm i -g --no-audit --save-exact aws-cdk && cdk --version',
                'npm run build',
                'npx cdk synth -q']
        });

        const chatBotWave = chatBotClientPipeline.addWave('ChatbotForThePipelineStatus');

        chatBotWave.addPre(preStep);

        chatBotWave.addStage(new ChatbotClientStageOne(this, 'ChatBotForRegionOne', {
            env
        }));
        chatBotWave.addStage(new ChatBotClientStageTwo(this, 'ChatBotForRegionTwo', {
            env
        }));
        chatBotWave.addStage(new ChatBotClientStageThree(this, 'ChatBotForRegionThree', {
            env
        }));
    }
}

# AWS CDK Chatbot Client Pipeline

### First steps to deploy the self-mutating pipeline construct and get it running

* `git commit -a -m "initial commit"`
* `git push`
* `cdk deploy`

#### Now the only thing you have to do is push your changes to GitHub and the CDK Pipeline starts building.


#### CDK Deploy
Before creating a change set, `cdk deploy` will compare the template and tags of the currently deployed stack to the template and tags that are about to be
deployed and will skip deployment if they are identical. Use `--force` to override this behavior and always deploy the stack.


> #### Tip:
> If the pipeline fails before it reaches the Update Pipeline Stage you have to do a `cdk deploy` local. Then it will pick up the latest code changes again.


### Waves: deploy your stacks in parallel

By default calling `addStage()` will deploy all CDK apps in sequence.                
By calling `addWave()` instead of `addStage()` you can deploy multiple apps in parallel which speeds up the deployment process.               
A *wave* is a set of stages that are deployed in parallel.             
The following example will deploy two copies of an application to `eu-west-1` and `eu-central-1` in parallel:                

```ts

const pipeline: pipelines.CodePipeline;

const europeWave = pipeline.addWave('Europe');

    europeWave.addStage(new MyApplicationStage(this, 'Ireland', {
        env: {region: 'eu-west-1'}
}));

    europeWave.addStage(new MyApplicationStage(this, 'Germany', {
        env: {region: 'eu-central-1'}
}));

```


### Add parameter to the AWS Systems Manager Parameter Store Construct

```ts
new aws_ssm.StringParameter(this, 'MyParameter', {
    stringValue: 'MyParameterValue',
    description: 'My parameter Description',
    parameterName: 'My Parameter Name',
    simpleName: true,
});
```

#### Get the latest or specified version for a plain string attribute

```ts

import * as ssm from 'aws-cdk-lib/aws-ssm';

// always latest version
const latestStringToken = aws_ssm.StringParameter.valueForStringParameter(
this, 'plain-parameter-name');

// in this example version 1
const versionOfStringToken = aws_ssm.StringParameter.valueForStringParameter(
this, 'plain-parameter-name', 1);   

```

#### Get the latest or specified version for a secure string attribute

```ts

// mandatory to specify version (version 1 in this example)
const secureStringToken = aws_ssm.StringParameter.valueForSecureStringParameter(
this, 'secure-parameter-name', 1);   

```

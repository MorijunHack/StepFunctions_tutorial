import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';


export class AwsStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const configCount = new sfn.Pass(this, 'ConfigureCount', {
            result: sfn.Result.fromObject({
                count: 10,
                index: 0,
                step: 1,
            }),
            resultPath: '$.iterator'
        });

        const role = new iam.Role(this, `LambdaExecuteRole`, {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        });
        role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));

        let iterlambda = new lambda.Function(this, 'IteratorLambda', {
            functionName: 'IteratorLambda',
            code: lambda.Code.fromAsset('../.dist/iterator'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            tracing: lambda.Tracing.ACTIVE,
            role
        });

        const iterator = new tasks.LambdaInvoke(this, 'Iterator', {
            lambdaFunction: iterlambda,
            resultPath: '$.iterator',
            payloadResponseOnly: true,
        });

        const isCountReached = new sfn.Choice(this, 'IsCountReached');

        const exampleWork = new sfn.Pass(this, 'ExampleWork', {
            result: sfn.Result.fromObject({
                success: true
            }),
            resultPath: '$.result'
        });
        const done = new sfn.Pass(this, 'Done', {});

        const definition = configCount
            .next(iterator)
            .next(isCountReached
                .when(sfn.Condition.booleanEquals('$.iterator.continue', true), exampleWork.next(iterator))
                .otherwise(done)
            );
        
        const stateMachine = new sfn.StateMachine(this, 'CdkLoop', {
            definition,
        });
    }
}

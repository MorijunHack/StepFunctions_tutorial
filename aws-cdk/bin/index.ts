import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsStack } from '../lib'; // デプロイするパッケージの中身は../lib/aws-stackにて定義されている

const account = 'AWS_ID';
const app = new cdk.App();

new AwsStack(app, 'CdkLoopDev', {tags: {stage: 'dev'}, env: {region: 'ap-northeast-1', account}}); // stg環境をデプロイする際のCloudFormationパッケージ
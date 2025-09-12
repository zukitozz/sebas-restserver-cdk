import {  Duration } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class EventRule extends Construct {

    public readonly rule: Rule

    constructor(scope: Construct, id: string) {
        super(scope, id);
        this.rule = new Rule(this, 'twoMinutesRule', {
            schedule: Schedule.rate(Duration.minutes(2)),
        });
    }
}
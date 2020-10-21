import * as lambda from 'aws-lambda';

export async function handler(event: Event, context: lambda.Context, callback: lambda.Callback) {
    console.log(event);

    let {index, step, count} = event.iterator;

    index = index + step;

    return {
        index, step, count,
        continue: count > index
    };
}

type Event = {
    iterator: {
        index: number,
        step: number,
        count: number,
    }
}
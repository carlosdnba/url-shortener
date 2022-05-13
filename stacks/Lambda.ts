/* eslint-disable no-new, no-unused-vars, @typescript-eslint/no-unused-vars */
import * as sst from '@serverless-stack/resources'

export default class Api extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    // API to receive Discord's webhooks
    const api = new sst.Api(this, 'DiscordHooks', {
      routes: {
        'GET /health-check': {
          function: 'src/handlers/health-check.handler'
        }
      }
    })

    this.addOutputs({
      ApiEndpoint: api.url,
    })
  }
}

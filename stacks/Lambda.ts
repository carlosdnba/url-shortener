import {
  Api,
  ReactStaticSite,
  Stack,
  StackProps,
  App,
} from "@serverless-stack/resources";


export default class ApiStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    // API to receive Discord's webhooks
    const api = new Api(this, 'DiscordHooks', {
      routes: {
        'GET /health-check': {
          function: 'src/handlers/health-check.handler'
        }
      }
    })

    const site = new ReactStaticSite(this, 'Website', {
      path: 'frontend',
      environment: {
        REACT_APP_API_URL: api.url,
      },
    });

    this.addOutputs({
      SiteUrl: site.url,
      ApiEndpoint: api.url,
    })
  }
}

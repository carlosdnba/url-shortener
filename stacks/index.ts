import * as sst from '@serverless-stack/resources'
import { vars, buildEnvVarObject } from './helpers/env'
import StorageStack from './Storage'
import LambdaStack from './Lambda'

export default function main(app: sst.App): void {
  const storage = new StorageStack(app, 'storage')
  const table = storage.getTable()

  // Adding default settings to lambdas
  app.setDefaultFunctionProps({
    timeout: 30,
    runtime: 'nodejs14.x',
    bundle: {
      format: 'cjs',
    },
    environment: {
      ...buildEnvVarObject(vars),
      TABLE_NAME: table.tableName,
      DEBUG: `${app.name}:*`,
      PROJECT_NAME: app.name,
      STAGE: app.stage
    }
  })

  // Adding permission for all stacks to access the storage
  app.addDefaultFunctionPermissions([table])

  new LambdaStack(app, 'lambdas')
}

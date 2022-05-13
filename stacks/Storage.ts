import * as sst from '@serverless-stack/resources'

export default class Table extends sst.Stack {
  table: sst.Table
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    this.table = new sst.Table(this, 'table', {
      fields: {
        pk: 'string',
        sk: 'string'
      },
      primaryIndex: { partitionKey: 'pk', sortKey: 'sk' }
    })
  }

  getTable() {
    return this.table
  }
}

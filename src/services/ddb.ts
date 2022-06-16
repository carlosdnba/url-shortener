import { DynamoDB } from 'aws-sdk'

export const ddb = new DynamoDB()
const { marshall, unmarshall } = DynamoDB.Converter

export const getLink = async (id: string) => {
  const { Items, Count } = await ddb.query({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'pk = :id',
    ExpressionAttributeValues: {
      ':id': { S: id },
    },
  }).promise()

  if (Items && !Items[0]) throw new Error('No link found')
  return unmarshall(Items[0])
}

export const createLink = async (id: string, url: string) => {
  const record = marshall({
    pk: id,
    sk: url,
    link: url,
  })
  return await ddb.putItem({
    TableName: process.env.TABLE_NAME,
    Item: record,
  }).promise()
}

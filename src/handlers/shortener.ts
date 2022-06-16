import uid from 'uniqid'
import { createLink, getLink } from '../services/ddb'

interface EventType {
  body: {
    url: string
  }
  queryStringParameters: {
    shortenedId: string
  }
}

export const create = async (event: EventType) => {
  const { url } = event.body
  console.log(event.body)
  const id = uid().slice(0, 5)
  await createLink(id, url)
  return {
    statusCode: 200,
    body: id,
  }
}

export const get = async (event: EventType) => {
  const { shortenedId } = event.queryStringParameters
  const result = await getLink(shortenedId)

  return {
    statusCode: 200,
    body: result,
  }
}

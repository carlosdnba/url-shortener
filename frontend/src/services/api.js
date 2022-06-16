import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const getUrl = async shortenedId => {
  const { data } = await client.get(`/shortener?shortenedId=${shortenedId}`)
  return data.link;
}

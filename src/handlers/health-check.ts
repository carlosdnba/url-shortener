export const handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'OK',
    timestamp: new Date().toISOString(),
  }),
})

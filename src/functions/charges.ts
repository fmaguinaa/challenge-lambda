import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as jwt from 'jsonwebtoken'
import { SEED } from '../constants'

export const handler: APIGatewayProxyHandler = async (event:APIGatewayProxyEvent ): Promise<APIGatewayProxyResult> => {
  try{
    const bearer = event.headers.authorization
    const token = bearer?.replace('Bearer','').trim()
    const result = validatePayment(token)
    return {
      statusCode: 200,
      body: JSON.stringify({card: result, success: true})
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: error})
    }
  }
}

export const validatePayment = (token) => {
  const decoded = jwt.verify(token, SEED)
  decoded.cvv = undefined
  return decoded
}
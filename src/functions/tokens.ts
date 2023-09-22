import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda'
import * as jwt from 'jsonwebtoken'

// import {createConnection} from '../config/database'
import {validateFields} from '../validations'
import {SEED} from '../constants'

export const handler: APIGatewayProxyHandler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try{
    // const client = await createConnection()
    const result = tokenizer(event.body)
    
    const response = !result.error ? {
      statusCode: 200,
      // headers: {
      //   // Required for CORS support to work
      //   'Access-Control-Allow-Origin': '*',
      //   // Required for cookies, authorization headers with HTTPS
      //   'Access-Control-Allow-Credentials': true,
      // },
      body: JSON.stringify({token: result.token})
    } : {
      statusCode: 400,
      body: JSON.stringify({error: result.error})
    }

    return response
  } catch (error) {
    const badResponse = {
      statusCode: 500,
      body: JSON.stringify({error: error})
    }
    return badResponse
  }
}

export const tokenizer = form => {
  const {error, value } = validateFields(form)
  if(!Boolean(error)){
    const token = jwt.sign(value, SEED, {expiresIn: '15m'} )
    return {
      token: token,
    }
  }
  return {
    error: error
  }
}

import http from 'k6/http';
import { sleep, check } from 'k6';

const client = '02867130204'
const url = 'https://clix.homolog.meutudo.app/clix/invoice/2023-08-01'
const headers ={
  'X-Document': client 
}

 export const options = {
  stages: [
    { duration: '10s', target: 5},
    { duration: '30s', target: 30},
    { duration: '10s', target: 10},
  ]
} 

export default () => {
  let res = http.batch([
    {method: 'GET', url: url, params: {headers: headers }}
  ])
  res.forEach( function(res){
    check(res, {
    'is status 200': (r) => r.status === 200,
    'body is not null': (r) => r.body != null
  }) 
  })
   
}
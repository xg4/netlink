import fetch from 'node-fetch'

// https://free-ssr.xyz
async function bootstrap() {
  const result = await fetch('http://www.baidu.com')

  console.log(result)
}

bootstrap()

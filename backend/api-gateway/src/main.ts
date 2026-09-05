import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Fungsinya agar React.js dapat memanggil API tanpa terhalang browser security
  app.enableCors()

  await app.listen(process.env.PORT || 3000)
  console.log('API Gateway running on port 3000')
}
await bootstrap();

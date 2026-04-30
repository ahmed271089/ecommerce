import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import sequelize from './config/index.js';
import userRoutes from './routes/userRoute.js';
import productsRoute from './routes/productsRoute.js'

const port=process.env.PORT;
const app=express()

app.use(express.json())
app.use(cors())

app.use('/api/users',userRoutes)
app.use('/api/products',productsRoute)



sequelize.sync({ alter: true })
  .then(() => {
    console.log('database connected');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to database:', err);
  });
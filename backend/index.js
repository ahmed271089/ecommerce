import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import "./models/relations.js"
import sequelize from './config/index.js';
import userRoutes from './routes/userRoute.js';
import productsRoute from './routes/productsRoute.js';
import cartRoutes from './routes/cartRoute.js'

const port=process.env.PORT;
const app=express()

app.use(express.json())
app.use(cors())

app.use('/api/users',userRoutes)
app.use('/api/products',productsRoute)
app.use('/api/cart', cartRoutes);



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
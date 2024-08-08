const express = require('express');
const mongoose = require('mongoose');
const { connectToMongoDb } = require('./configuration/dbconfig')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;


const furnitureSchema = new mongoose.Schema({
  FurnitureId:String,
  FurnitureName: String,
  Price: String
});

const exportSchema = new mongoose.Schema({
  FurnitureId: String,
  ExportDate: Date,
  Quantity: Number,
});

const Furniture = mongoose.model('Furniture', furnitureSchema);
const Export = mongoose.model('Export', exportSchema);

app.get('/furniture/:FurnitureId', async (req, res) => {
  try {

    const {FurnitureId} = req.params;
    console.log(FurnitureId)
    const furniture = await Furniture.findById(FurnitureId);

    res.status(200).json(furniture);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
    
  }
});

app.get('/furniture', async (req, res) => {
  try {
    const furniture = await Furniture.find({});
    res.status(200).json(furniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
});
app.get('/export', async (req, res) => {
  try {
    const exporti= await Export.find({})
    res.status(200).json(exporti);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
});


app.post('/furniture', async (req, res) => {
  try {
    const { FurnitureName, Price} = req.body;
    const newFurniture = new Furniture({ FurnitureName,Price });
    await newFurniture.save();
    res.status(200).json({ message: 'Furniture item added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/export', async (req, res) => {
  try {
    const { FurnitureId, ExportDate, Quantity } = req.body;
    const newExport = new Export({ FurnitureId, ExportDate, Quantity });
    await newExport.save();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/furniture/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const updatedFurniture = await Furniture.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedFurniture);

  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete furniture item
app.delete('/api/furniture/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Furniture.findByIdAndDelete(id);
    res.json({ message: 'Furniture item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

connectToMongoDb().then(()=>{
  app.listen(PORT,()=>console.log(`listening to the app ${PORT}`))
  })





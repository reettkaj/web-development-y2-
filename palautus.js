import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy mock data (nollautuu aina, kun sovelluksen käynnistää uudelleen)
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Banaaneja'},
];

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// API root
app.get('/', (req, res) => {
  res.send('This is dummy items API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get item based on id
app.get('/items/:id', (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({message: 'item not found'});
  }
});

// TODO: add PUT route for items
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: 'item not found' });
  }

  item.name = req.body.name;
  res.json(item);
});

// TODO: add DELETE route for items
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'item not found' });
  }

  items.splice(index, 1);
  res.json({ message: 'item deleted' });
});

// Add new item
  //console.log('add item request body', req.body);
  // TODO: lisää id listaan lisättävälle objektille
app.post('/items', (req, res) => {
  const newId = items.length ? items[items.length - 1].id + 1 : 1;

  const newItem = {
    id: newId,
    name: req.body.name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

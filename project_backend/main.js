const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const fs = require("fs");
const path = require("path");


app.use('/images', express.static(path.join(__dirname, 'images')));

let submittedData = [];
let imageCache = {};

app.post('/submit', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    submittedData.push({ name, email, password: hashedPassword });
    res.status(200).send({ message: 'Dane zostały wysłane' });
  } catch (error) {
    console.error('Błąd podczas hashowania', error);
    res.status(500).send({ message: 'Wystąpił błąd' });
  }
});

app.get('/data', (req, res) => {
  res.status(200).json(submittedData);
});

app.get('/images', async (req, res) => {
  const { filename } = req.query;
  const imagesDir = path.join(__dirname, 'images');

  if (filename) {
    if (imageCache[filename]) {
      console.log(`Serving ${filename} from cache`);
      return res.status(200).sendFile(imageCache[filename]);
    }

    const imagePath = path.join(imagesDir, filename);
    if (fs.existsSync(imagePath)) {
      console.log(`Loading ${filename} with delay`);
      setTimeout(() => {
        imageCache[filename] = imagePath;
        res.status(200).sendFile(imagePath);
      }, 3000);
    } else {
      res.status(404).send({ message: 'Obraz nie znaleziony' });
    }
  } else {
    try {
      const files = fs.readdirSync(imagesDir).filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
      res.status(200).json(files);
    } catch (error) {
      console.error('Błąd odczytu folderu obrazów', error);
      res.status(500).send({ message: 'Błąd serwera' });
    }
  }
});


  // pokedex ponizej

  const pokedex = require("./data/pokedex.json");
  const types = require("./data/types.json");


  // app.get("/pokemon/:id", (req, res) => {
  //   const pokemonId = req.params.id; 
  

  //   const pokemon = pokedex.find((p) => p.id === parseInt(pokemonId));
  
  //   if (!pokemon) {
  //     return res.status(404).json({ error: "Pokémon not found" });
  //   }
  
  //   const imagePath = path.join(__dirname, "images", `${String(pokemon.id).padStart(3, "0")}.png`);
  //   const image = fs.existsSync(imagePath) ? fs.readFileSync(imagePath, "base64") : null;
  
  //   const enrichedPokemon = {
  //     ...pokemon,
  //     image: image ? `data:image/png;base64,${image}` : null
  //   };
  
  //   res.json(enrichedPokemon);
  // });

  app.get("/pokemon", (req, res) => {
    const { query, types } = req.query;

    let filteredPokemon = pokedex;

    if (types) {
      const typeArray = Array.isArray(types) ? types : [types];
      filteredPokemon = filteredPokemon.filter((p) =>
        typeArray.some((type) => p.type.includes(type))
      );
    }

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredPokemon = filteredPokemon.filter((p) =>
        p.name.english.toLowerCase().includes(lowerCaseQuery)
      );
    }

    const enrichedPokemon = filteredPokemon.map((p) => {
      const imagePath = path.join(
        __dirname,
        "images",
        `${String(p.id).padStart(3, "0")}.png`
      );
      const image = fs.existsSync(imagePath)
        ? fs.readFileSync(imagePath, "base64")
        : null;
      return { ...p, image: image ? `data:image/png;base64,${image}` : null };
    });

    res.json(enrichedPokemon);
  });

  app.get("/pokemon/type/:type", (req, res) => {
    const type = req.params.type;
    const filteredPokemon = pokedex.filter((p) => p.type.includes(type));

    const enrichedPokemon = filteredPokemon.map((p) => {
      const imagePath = path.join(
        __dirname,
        "images",
        `${String(p.id).padStart(3, "0")}.png`
      );
      const image = fs.existsSync(imagePath)
        ? fs.readFileSync(imagePath, "base64")
        : null;
      return { ...p, image: image ? `data:image/png;base64,${image}` : null };
    });

    res.json(enrichedPokemon);
  });

  app.get("/pokemon/image/:id", (req, res) => {
    const id = req.params.id.padStart(3, "0");
    const imagePath = path.join(__dirname, "images", `${id}.png`);

    if (fs.existsSync(imagePath)) {
      const image = fs.readFileSync(imagePath, { encoding: "base64" });
      res.json({ base64: `data:image/png;base64,${image}` });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  });

  app.get("/pokemon/search", (req, res) => {
    const { query, type } = req.query;
  
    let filteredPokemon = pokedex;
  
    if (type) {
      const typeArray = type;
      filteredPokemon = filteredPokemon.filter((p) =>
        typeArray.every((t) => p.type.includes(t)) 
      );
    }
  
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredPokemon = filteredPokemon.filter((p) =>
        p.name.english.toLowerCase().includes(lowerCaseQuery)
      );
    }
  
    const enrichedPokemon = filteredPokemon.map((p) => {
      const imagePath = path.join(__dirname, "images", `${String(p.id).padStart(3, "0")}.png`);
      const image = fs.existsSync(imagePath) ? fs.readFileSync(imagePath, "base64") : null;
      return { ...p, image: image ? `data:image/png;base64,${image}` : null };
    });
  
    res.json(enrichedPokemon);
  });
  
  app.get("/pokemon/types", (req, res) => {
    res.json(types);
  });


  let allFormData = [];

  app.post("/task02/postData", (req, res) => {
    const newData = req.body;
    allFormData.push(newData);
    res.status(200).send({ message: "Data received" });
  });

  app.get("/task02/getData", (req, res) => {
    res.status(200).json({
      message: "Fetched all form data successfully!",
      data: allFormData,
    });
  });

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.get("/abc", (req, res) => {
    res.statusCode = 500;
    res.send("hello world");
  });

  // sci / 4c / abc

  const sciRouter = express.Router();

  sciRouter.get("/", (req, res) => {
    res.send("Sci");
  });

  sciRouter.get("/json", (req, res) => {
    const data = [
      {
        key1: "text",
        key2: 20,
      },
    ];
    res.json(data);
  });

  app.post("/abc", (req, res) => {
    res.statusCode = 500;
    res.send("hello world cos innego");
  });

  app.delete("/abc", (req, res) => {
    res.statusCode = 500;
    res.send("hello world cos innego ale do usuniecia");
  });

  app.listen(8080, () => {
    console.log("Cokolwiek");
  });

  app.use("/sci/4c/abc", sciRouter);

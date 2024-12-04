const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const fs = require("fs");
const path = require("path");

// pokedex ponizej

const pokedex = require("./data/pokedex.json");
const types = require("./data/types.json");

app.get("/pokemon", (req, res) => {
  const pokemonWithImages = pokedex.map((pokemon) => {
    const id = pokemon.id.toString().padStart(3, "0");
    const imagePath = path.join(__dirname, "images", `${id}.png`);
    let base64Image = null;

    if (fs.existsSync(imagePath)) {
      const image = fs.readFileSync(imagePath, { encoding: "base64" });
      base64Image = `data:image/png;base64,${image}`;
    }

    return {
      ...pokemon,
      image: base64Image,
    };
  });

  res.json(pokemonWithImages);
});

app.get("/pokemon/types", (req, res) => {
  res.json(types);
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
    filteredPokemon = filteredPokemon.filter((p) => p.type.includes(type));
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

// zadanie przed pokedexem

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

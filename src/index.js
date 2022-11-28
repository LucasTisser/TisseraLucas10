import express from "express";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import userRouter from "./routes/user.js";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import mongoStore from "connect-mongo";

const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const ___dirname = path.dirname(__filename);

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "hbs");

// // Handlebars options
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: ___dirname + "/views/layouts",
    partialsDir: ___dirname + "/views/partials",
  })
);

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewParser: true,
        useUnifiedTopology: true,
      },
    }),

    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, //10 min.
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productRouter);
app.use("/api/carritos", cartRouter);
app.use("/api/usuario", userRouter);

const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => console.log(err));

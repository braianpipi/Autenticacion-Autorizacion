// Implementar sobre el entregable que venimos realizando un mecanismo de
// autenticación. Para ello:
// Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos
// se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando
// que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).
// Una vista de login, donde se pida email y contraseña, y que realice la autenticación
// del lado del servidor a través de una estrategia de passport local.
// Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a
// la otra.
// Una vez logueado el usario, se lo redirigirá al inicio, el cual ahora mostrará también
// su email, y un botón par desolquearse.
// Además, se activará un espacio de sesión controlado por la sesión de passport.
// Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.
// Agregar también vistas de error para login (credenciales no validas) y registro
// (usuario ya registrado).
// El resto de la funciones, deben quedar tal cual estaban el proyecto original.
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB_TITLE = process.env.DB_TITLE;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.5si1ej1.mongodb.net/${DB_TITLE}?retryWrites=true&w=majority`,
    }),
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

// Este es el motor de la plantillas
app.set("views", "./public/views");
app.set("view engine", "ejs");

const getNombreSession = (req) => {
  console.log(req.session.nombre);
  return req.session.nombre ? req.session.nombre : "Invitado";
};
let login = true;
const singInOrUp= (req)=>{
    return req.session.nombre ? login=false : login = true; 
}


app.get("/", (req, res) => {
  let userName = getNombreSession(req);
  login = singInOrUp(req)
  res.render("login.ejs", { userName, login });
});

app.post('/registro', (req,res)=>{
    if(usuario.some(usuario=> usuario.nombre === req.body.nombre)){
        return res.render('errorRegistro.ejs')
    }
    usuarios.push(req.body)
    login = singInOrUp(req)
    res.render('login.ejs', login)
})


app.post("/login", (req, res) => {
  // let {nombre, password} = req.body
  // console.log(nombre, password)
  req.session.nombre = req.body.nombre;
  req.session.contador = 1;
  let userName = getNombreSession(req);
  console.log(userName);
  
  login = singInOrUp(req)
  res.redirect("/");
  return login , userName;
});


app.post("/logout", (req, res) => {
  let userName = getNombreSession(req);
  login = singInOrUp(req)
  req.session.destroy((err) => {
    if (err) {
      res.send(`<h1>Error al eliminar la sesion</h1>`);
    } else {
      res.render("logout.ejs", { userName });
    }
  });

  return login ;
});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

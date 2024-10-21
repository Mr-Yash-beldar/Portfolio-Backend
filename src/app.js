const express = require("express");

/**
 * load middleware
 */
const cors = require("cors");
const { HttpExceptionTransformer } = require("http-exception-transformer");
const helmet = require("helmet");  // Security enhancement

/**
 * load services
 */



/**
 * load routes
 */
const BlogRoutes = require("./routes/blog.routes");
const ProjectRoutes = require("./routes/project.routes");
const ContactRoutes = require("./routes/contact.routes");
const ProfileRoutes = require("./routes/profile.routes");

/**
 * declare application and load middleware
 */
const app = express();

// Security middleware to add headers
app.use(helmet());


// OR specify options for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Allow credentials (if necessary)
}));


/**
 * use json parser and body parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * initialize services
 */

/**
 * show alive status on server root
 */
app.get("/", (req, res) => {
  res.send({ alive: true });
});

/**
 * bind all routes to application
 */
app.use("/api/blog", BlogRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/profile", ProfileRoutes);

/**
 * 404 - Not Found Handler
 * Catches requests to non-existing routes and returns a 404 error.
 */
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

/**
 * Global Error Handler
 * Catches all unhandled errors and responds with a standardized error message.
 */
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).send({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

/**
 * transform all errors into standard messages
 * (optional if HttpExceptionTransformer already handles some of this)
 */
app.use(HttpExceptionTransformer);

/**
 * export application to be served or tested
 */
module.exports = { app };

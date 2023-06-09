//  const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const roasterRoute = require("./routes/roaster-route");
const cartRoute = require("./routes/cart-route");


const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/roaster", roasterRoute);
app.use("/cart", cartRoute);



app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.bgYellowBright.italic(`Server running on port: ${port}`))
);

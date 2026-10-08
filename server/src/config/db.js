import mongoose from "mongoose";
import { db_name } from "../constants/project_constants.js";

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const codes = { reset: 0, bold: 1, dim: 2, red: 31, green: 32, yellow: 33, cyan: 36 };
const paint = (name, text) => (useColor ? `\x1b[${codes[name]}m${text}\x1b[0m` : text);

const log = (symbol, color, message) => {
  const time = paint("dim", new Date().toLocaleTimeString("en-GB"));
  console.log(`${time} ${paint(color, symbol)} ${paint("bold", "[MongoDB]")} ${message}`);
};

const detail = (label, value) =>
  console.log(`           ${paint("dim", label.padEnd(5))} ${value}`);

let listenersAttached = false;

const attachListeners = () => {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on("disconnected", () => log("⚠", "yellow", "Disconnected"));
  mongoose.connection.on("reconnected", () => log("✔", "green", "Reconnected"));
  mongoose.connection.on("error", (err) => log("✖", "red", `Error: ${err.message}`));

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    log("●", "cyan", "Connection closed (SIGINT)");
    process.exit(0);
  });
};

const connectDB = async () => {
  attachListeners();
  const startedAt = Date.now();
  log("●", "cyan", "Connecting...");

  try {
    const { connection } = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);

    log("✔", "green", paint("green", `Connected in ${Date.now() - startedAt}ms`));
    detail("host", connection.host);
    detail("db", connection.name);
  } catch (error) {
    log("✖", "red", paint("red", `Connection failed: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
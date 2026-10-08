import { customAlphabet } from "nanoid";
import { SHORT_CODE_LENGTH } from "../models/url.model.js";

// Base62 alphabet, matching SHORT_CODE_PATTERN in the model.
const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const generateCode = customAlphabet(ALPHABET, SHORT_CODE_LENGTH);

export default generateCode;
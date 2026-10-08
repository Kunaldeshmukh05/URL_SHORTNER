import mongoose from "mongoose";
// reviewed the model and made manual changes
const { Schema, model } = mongoose;

// Keep these in sync with the short code generator (e.g. nanoid customAlphabet).
export const SHORT_CODE_LENGTH = 7;
export const SHORT_CODE_PATTERN = /^[A-Za-z0-9]+$/; //searched abd reviewed on google
export const MAX_URL_LENGTH = 2048;

const isHttpUrl = (value) => {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

const urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "originalUrl is required"],
      trim: true, //trimming added for extra spaces
      maxlength: [MAX_URL_LENGTH, `originalUrl must be at most ${MAX_URL_LENGTH} characters`],
      validate: {
        validator: isHttpUrl,
        message: "originalUrl must be a valid http or https URL",
      },
    },

    shortCode: {
      type: String,
      required: [true, "shortCode is required"],
      unique: true, // builds the unique index used for redirect lookups and collision safety
      immutable: true, // a short code must never change once created
      trim: true, // deliberately no `lowercase`: codes are case-sensitive
      minlength: SHORT_CODE_LENGTH,
      maxlength: SHORT_CODE_LENGTH,
      match: [SHORT_CODE_PATTERN, "shortCode contains invalid characters"],
    },

    // Server-controlled: only ever changed through $inc on the redirect path.
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastAccessedAt: {
      type: Date,
    },

    // Optional expiry. Absent means the link never expires.
    expiresAt: {
      type: Date,
      validate: {
        validator: function (value) {
          return !this.isNew || value > new Date();
        },
        message: "expiresAt must be in the future",
      },
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false,
    collection: "urls",
  }
);
    // this optimization is made
// TTL index: MongoDB removes documents once expiresAt has passed.
// Documents without expiresAt are ignored. The sweep runs about every 60s,
// so the redirect handler should still check expiresAt and return 410.
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Url = model("Url", urlSchema);

export default Url;
// Read env lazily (inside the function) so it works regardless of when dotenv loads.
const getBaseUrl = () => {
  const base = process.env.BASE_URL ?? `http://localhost:${process.env.PORT ?? 5000}`;
  return base.replace(/\/+$/, "");
};

export default getBaseUrl;
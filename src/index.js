import { Elysia, NotFoundError } from "elysia";
import countries from "./data/countries.json"
import cors from "@elysiajs/cors";

const app = new Elysia();
app.use(cors())

app.get("/", () => "Hello Elysia v0.0.25")

app.get("/countries", ({ query: { key_words } }) => {
  if (key_words) {
    try {
      const lowerKey = key_words.toLowerCase()
      const country = countries.find((country) => country.Country.toLowerCase().includes(lowerKey))
      if (country) {
        return country
      } else {
        throw new NotFoundError()
      }
    } catch (e) {
      throw e
    }
  }
  const new_countries = countries.map((country, index) => {
    country.id = index;
    return country
  })
  return new_countries
})

app.get("/countries/:id", ({ params: { id } }) => {
  try {
    const country = countries.find((_, index) => index === +id)
    if (country) {
      return country
    } else {
      throw new NotFoundError()
    }
  } catch (e) {
    throw e
  }
})

app.listen(4000);

console.log(
  `🦊 Port ${app.server?.hostname}:${app.server?.port}`
);

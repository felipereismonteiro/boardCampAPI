export default async function rentalsGetController(req, res, next) {
  try {
    res.send("termino no final do projeto");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

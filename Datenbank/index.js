const express = require('express');
const app = express();
const db=require('./datenbank.js')

app.get("/",(_, res) => {
  res.send("Produce Database")
})

app.get("/produce/:name", async (req, res) => {
  const produce = (await db.getProduce (req.params.name))[0]
  res.status(200).json({ 
    "typ": produce.typ,
    "name": produce.name,
    "season": JSON.parse("{"+ produce.season+"}").origin
   })

})

app.get("/mittelpunkt/:laendercode", async (req, res) => {
  const mittelpunkt = await db.getMittelpunkt (req.params.laendercode)
  res.status(200).json({ mittelpunkt })
})

app.get("/geo_daten/:laendercode", async (req, res)=>{
  let data= (await db.getGeojson (req.params.laendercode))[0]
  res.status(200).json( {
    "laendercode": data.laendercode,
    "geo_json": JSON.parse(data.geo_json)
  } )
  
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}..`))
//app.listen(8080, () => console.log("Server is running on port 8080"));

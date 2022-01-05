const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')

// Middleware
app.use(express.json())

//parkings
app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})

app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})


// get all reservations
app.get('/reservations', (req,res) => {
    res.status(200).json(reservations)
})


// get all reservations for a specific parking
app.get('/parkings/:id/reservations', (req,res) => {
    const id = parseInt(req.params.id)
    const reservs = reservations.filter(reservs => reservs.parkingId === id)
    res.status(200).json(reservs)
})

//get a specific reservation for a specific parking
app.get('/parkings/:idp/reservations/:idr', (req,res) => {
    const idp = parseInt(req.params.idp)
    const idr = parseInt(req.params.idr)
    const reserv = reservations.find(reserv => reserv.parkingId === idp && reserv.id === idr)
    res.status(200).json(reserv)
})

//add a new reservation
app.post('/parkings/:id/reservations', (req,res) => {
    reservations.push(req.body)
    res.status(200).json(reservations)
})

//modify a reservation
app.put('/parkings/:idp/reservations/:idr', (req,res) => {
    const idp = parseInt(req.params.idp)
    const idr = parseInt(req.params.idr)
    const reserv = reservations.find(reserv => reserv.parkingId === idp && reserv.id === idr)
    reserv.parking = req.body.parking,
    reserv.parkingId = idp,
    reserv.city = req.body.city,
    reserv.clientName = req.body.clientName,
    reserv.vehicle = req.body.vehicle,
    reserv.licensePlate = req.body.licensePlate,
    reserv.checkin = req.body.checkin,
    reserv.checkout = req.body.checkout,
    res.status(200).json(reserv)
})

app.delete('/parkings/:idp/reservations/:idr', (req,res) => {
    const idp = parseInt(req.params.idp)
    const idr = parseInt(req.params.idr)
    let reserv = reservations.find(reserv => reserv.parkingId === idp && reserv.id === idr)
    reservations.splice(reservations.indexOf(reserv),1)
    res.status(200).json(reserv)
})
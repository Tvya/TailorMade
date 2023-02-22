const router = require ("express").Router()
const db = require("../db")
const bcrypt = require ("bcrypt")
const nodemailer = require ('nodemailer')
const jwtGenerator = require("../utils/jwtGenerator")

//Connect to DB
db.on('connect', (client) => {
    client.query("SET search_path TO 'TailorMade' "); // Set to the Schema
  });


  module.exports = router;
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const URL = `https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences`

const fetchData = async() => {
    const allData = await axios(URL)
    console.log(allData)
}
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const removeSimilars = require('./services/removeSimilars')
const URL = `https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences`

app = express()
app.use(cors())



const fetchData = async() => {
    const diFunction = (a, b) => {
        let difference = 0;
        for (key in a){
                if(a.key == b.key)
                    difference++;
        }
        return difference;
}
    const res = await axios(URL)
    let paid = res.data.paid
    let free = res.data.free
    let all = paid.concat(free)
    let uniqueConf = Array.from(new Set(all.map(a => a.confName)))
    .map(confName => {
      return all.find(a => a.confName === confName)
    })
    let diffo
    let duplicateFlagger = []

    for(let i = 0; i < all.length; i++){
        for(let j = 0; j < i; j++) {
            try {
                diffo = diFunction(all[i], all[j])
                if(diffo < 3)
                    duplicateFlagger.push(true)
            } catch(e) {
                console.log(e.message)
            }

        }
    }
    let finalUnique = []
    for(let i =0; i < all.length; i++) {
        if(!duplicateFlagger[i])
            finalUnique.push(all[i])
    }
    console.log(finalUnique)
}

fetchData()
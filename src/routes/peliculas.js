const { Router } = require('express');
const router = Router();
const request = require('request');
const _ = require('underscore')
const moment = require('moment');
const key = require('../environments/conexcion')

const apikey = key.apikey

const urlMovi = key.url

router.get('/', (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
})


router.get('/recientes', (req, res)=>{

    let pagina = req.query.page;

    if(!pagina){
        pagina = 1
    }

    let desde = moment().add(1, 'months').format('YYYY-MM-DD');
    let hasta = moment().add(7, 'days').add(1, 'months').format('YYYY-MM-DD');

    request(`${urlMovi}/discover/movie?primary_release_date.gte=${desde}&primary_release_date.lte=${hasta}&region=us&api_key=${apikey}&page=${pagina}&language=es`, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.json(data);
        } 
    });
});

router.get('/calificacion', (req, res)=>{
    let pagina = req.query.page;

    if(!pagina){
        pagina = 1
    }
    request(`${urlMovi}/movie/top_rated?sort_by=popularity.desc&region=co&api_key=${apikey}&page=${pagina}&language=es`, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.json(data);
        } 
    })
    
});


router.get('/populares', (req, res)=>{
    let pagina = req.query.page;
    if(!pagina){
        pagina = 1
    }
    request(`${urlMovi}/discover/movie?sort_by=popularity.desc&api_key=${apikey}&page=${pagina}&language=es`, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.json(data);
        } 
    })
    
});

router.post('/buscar', (req, res)=>{
    request(`${urlMovi}/search/movie?query=${ req.body.buscar }&api_key=${ apikey }&language=es`, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.json(data);
        } 
    })
})

router.get('/pelicula/:id', (req, res)=>{
    const { id } = req.params
    request(`${urlMovi}/movie/${id}?api_key=${apikey}&language=es`, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.json(data);
        } 
    })
    
});


module.exports = router;
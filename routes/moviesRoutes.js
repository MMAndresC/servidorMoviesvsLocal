const express = require('express');

const router = express.Router();

const movies = require('../movies');


router.get('/',(req,res) =>{ //4 Crear un endpoint get que devuelva todas las películas.
    return res.send(movies);
})

 router.get('/id/:id',(req,res)=>{ //5 rear un endpoint get que devuelva una película según su _id
    const movieId = req.params.id;
    if(!movies[movieId]){
        return res.send('No existe esa pelicula en la db');
    }
    return res.send(movies[movieId]);
})

const goAwayTildes = (string) => { //Solo sirve para castellano simbolo ´ uno solo por palabra
    const stringMin = string.toLowerCase();
    const letters = [
        { conTilde:'á', sinTilde:'a'},
        { conTilde:'é', sinTilde:'e'},
        { conTilde:'í', sinTilde:'i'},
        { conTilde:'ó', sinTilde:'o'},
        { conTilde:'ú', sinTilde:'u'}
    ];

    for (let i = 0; i < 5; i++){
        let aux = '';
        aux = stringMin.replace(letters[i].conTilde, letters[i].sinTilde);
        if(stringMin !== aux){
            return aux;
        }
    }
    return stringMin;
}

const searchBy = (criteria,data,res) =>{ 
    const result = movies.filter(movie => goAwayTildes(movie[criteria]) == data.toLowerCase());
    if (!!result.length){
        return res.send(result);
    }else{
        return res.send('No existe esa pelicula en la db');
    }
}

router.get('/title/:title',(req,res) =>{ //6 Crear un endpoint get que devuelva un valor por su titulo.
    const {title} = req.params;
    searchBy('title',title,res);
})

router.get('/genre/:genre',(req,res) =>{  //7 Crear un endpoint get que devuelva los documentos según su género.
    const {genre} = req.params;
    searchBy('genre',genre,res);    
})

router.get('/year',(req,res) => {  //8 Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010.
    const result = movies.filter(movie => movie.year > 2010);
    if(result.length >0){
        return res.send(result);
    }else{
        return res.send('No hay en catalogo peliculas a partir de 2010');            
    } 
})


module.exports = router;

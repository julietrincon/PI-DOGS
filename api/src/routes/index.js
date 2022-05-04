const { Router } = require('express');
const axios = require('axios'); 
const {Dog, Temperament} = require('../db.js');
require('dotenv').config(); 
const { YOUR_API_KEY } = process.env; 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Trae información de la API
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    let apiInfo = await apiUrl.data.map((element) => {
        return {
            id: element.id,
            name: element.name,
            height: element.height.metric,
            weight: element.weight.metric,
            life_span: element.life_span,
            image: element.image.url,
            temperament: element.temperament,
        }
    });
    return apiInfo;
};

//Trae información de la DB
const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo(); //Await: espera.
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}

//GET /dogs
router.get('/dogs', async (req, res, next) => {
    try{
        const name = req.query.name
        let dogsTotal = await getAllDogs(); //Traigo toda la info tanto de db como api.
        if (name) {
            let nameDogs = await dogsTotal.filter((element) => element.name.toLowerCase().includes(name.toLowerCase()))
            nameDogs.length ? res.status(200).send(nameDogs) :
            res.status(404).send({info: 'Sorry, the dog you are looking for is not here.'});
        } else {
            res.status(200).send(dogsTotal)
        }
    } catch (error){
        next(error)
   };
});

//GET /dogs/{idRaza}
router.get('/dogs/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const dogTotal = await getAllDogs();
        if (id) {
            let dogId = await dogTotal.filter(el => el.id == id)
            dogId.length ? res.status(200).send(dogId) :
            res.status(404).send({info: 'Dog  breed not found.'})
        }
    } catch (error){
        next (error)
    };
});

//GET /temperament
router.get('/temperament', async(req, res) => {
    const temperamentApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)).data
    let temperaments = temperamentApi.map((a) => a.temperament);
    temperaments = temperaments.join().split(','); //Separa por , el resultado.
    temperaments = temperaments.filter(a => a)
    temperaments = [...new Set(temperaments)].sort(); //Set permite almacenar valores unicos, sort: Ordena los elementos.
    console.log(temperaments)
    temperaments.forEach((a) => {
        Temperament.findOrCreate({ //ejecuta la funcion una vez por cada elemento.
            where: {name : a},
        });
    });
    const allTemperament = await Temperament.findAll(); //Busqueda de multiples elementos en la db.
    res.send(allTemperament)
    });

//POST /dog
router.post('/dog', async (req, res, next) => {
    try {
        const { name, height, weight, life_span, image, createdInBd, temperament } = req.body;
        const breedsNew = await Dog.create({ //Crea entradas de bases de datos en un form.
            name,
            height,
            weight,
            life_span,
            image,
            createdInBd
        })
        let temperamentDb = await Temperament.findAll({
            where: { name: temperament }
        })
        await breedsNew.addTemperament(temperamentDb)
        res.status(201).send({info: 'New breeds created successfully.'})
    } catch (error) {
        next (error)
    };
});

router.post('/temperament', async (req, res, next) => {
    const { name } = req.body
    const temperamentNew = await Temperament.create({name})
    console.log(temperamentNew)
    res.send(temperamentNew)
})

module.exports = router;
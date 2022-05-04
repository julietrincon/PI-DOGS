import axios from "axios";

export function getDogs(){
    return async function(dispatch){
            var dogJson = await axios.get("http://localhost:3001/dogs/"); //Se genera la conexion entre front y back.
            return dispatch({
                type: "GET_DOGS",
                payload: dogJson.data
            })
          } 
        };


export function dogDetail(id){
    return async function(dispatch){
            var dogJson = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: "DOG_DETAIL",
                payload: dogJson.data
            })
          }
        };


export function getDogsName(name){
    return async function(dispatch){
            var dogJson = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_DOGS_NAME",
                payload: dogJson.data
            })
          }
        };


export function getTemperaments(){
    return async function(dispatch){
            var dogJson = await axios.get("http://localhost:3001/temperament/");
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: dogJson.data
            })
          }
        };


export function postDog(payload){
    return async function(dispatch){
        var dogJson = await axios.post("http://localhost:3001/dog/", payload);
        return dispatch({
            type: "POST_DOG",
            payload: dogJson.data
        })
      }
    };


export function filterDogsCreated(payload){
    return{
        type: "FILTER_DOGS_CREATED",
        payload
    }
};

export function filterDogTemp(payload){
    return{
        type: "FILTER_BY_TEMP",
        payload
    }
};

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByWeight(payload){
    return{
        type: "ORDER_BY_WEIGHT",
        payload
    }
};
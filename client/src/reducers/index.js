const initialState = {
    dogs : [],
    allDogs : [],
    orderDogs : [],
    weightDogs : [],
    temperaments : [],                      
    detail : [],                    
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload, 
                allDogs: action.payload            
            }
        case "DOG_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "GET_DOGS_NAME":
            return{
                ...state,
                dogs: action.payload
            }
        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperaments: action.payload
            }
        case "POST_DOG":
            return{
                ...state,
            }
        case "FILTER_DOGS_CREATED":
            const dogFiltered = action.payload === "Created" ? state.allDogs.filter((dog) => dog.createdInBd):
            state.allDogs.filter((dog) => !dog.createdInBd);
            return {
                ...state,
                dogs: action.payload === "All" ? state.allDogs : dogFiltered
            }
        case "FILTER_BY_TEMP":
            const allDogs = state.allDogs;
            const filteredDogs = allDogs.filter((element) =>
            element.temperament?.includes(action.payload)
            );
            return{
                ...state,
                dogs: filteredDogs,
            }
        case "ORDER_BY_NAME":
            const orderDogs = action.payload === "Asc" ? state.dogs.sort(function(a,b){
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }):
            state.dogs.sort(function(a,b){
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            return{
                ...state, 
                dogs: orderDogs
            };
        case "ORDER_BY_WEIGHT":
            const weightDogs = action.payload === "Weight 1" ? state.dogs.sort(function(a,b){
                if(typeof action.payload.weight === "string") {
                    if(a.weight > b.weight) return 1
                    if(a.weight < b.weight) return -1
                    return 0;
                } else {
                    if(parseInt(a.weight) > parseInt(b.weight)) return 1
                    if(parseInt(a.weight) < parseInt(b.weight)) return -1
                    return 0
                }
            }):
            state.dogs.sort(function(a,b){
                if(typeof action.payload.weight === "string") {
                    if(a.weight > b.weight) return -1
                    if(a.weight < b.weight) return 1
                    return 0;
                } else {
                    if(parseInt(a.weight) > parseInt(b.weight)) return -1
                    if(parseInt(a.weight) > parseInt(b.weight)) return 1
                    return 0
                }
            });
            return{
                ...state,
                dogs: weightDogs
            };
            default: return state;
            }
           }

export default rootReducer;
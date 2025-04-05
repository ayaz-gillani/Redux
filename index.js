const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const immer = require('immer');
const produce = immer.produce
const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSIT_MONEY = "DEPOSIT_MONEY";
const OPEN_ACCOUNT = "OPEN_ACCOUNT";
const UPDATE_STREET = "UPDATE_STREET";

function withdraw(){
    return {
        type: WITHDRAW_MONEY,
        amount: 50
    }
}
function deposit(val){
    return {
        type: DEPOSIT_MONEY,
        amount: val
    }
}
function openAcc(){
    return {
        type: OPEN_ACCOUNT,
        details: {
            accTitle: "John",
            accNum: 12345345345,
            address: {
                branch: "Faisal Town",
                street: "Milad street",
                building_no: "1-B"
            }
        }
    }
}
function updateStreet(val){
    return {
        type: UPDATE_STREET,
        street: val
    }
}

const accountInitialState = {
    amount: 1000,
}
const detailsInitialState = {
    details: {
        accTitle: "",
        accNum: null,
        address: {
            branch: "",
            street: "",
            building_no: ""
        }
    }
}

function accountReducer(prevState = accountInitialState, action){
    switch(action.type){
        case WITHDRAW_MONEY:
            return {
                ...prevState,
                amount: prevState.amount - action.amount
            }
        case DEPOSIT_MONEY:
            return {
                ...prevState,
                amount: prevState.amount + action.amount
            }
        default:
            return prevState
    }
}

function detailsReducer(prevState = detailsInitialState, action){
    switch(action.type){
        case OPEN_ACCOUNT:
            return {
                ...prevState,
                details: action.details
            }
        case UPDATE_STREET:
            // return {
            //     ...prevState,
            //     details: {
            //        ...prevState.details,
            //         address: {
            //            ...prevState.details.address,
            //            street: action.street
            //         }
            //     }
               
            // }
            return produce(prevState, (draft)=>{
                draft.details.address.street = action.street
            })
            
        default:
            return prevState
    }
}

const rootReducer = combineReducers({
    accountReducer,
    detailsReducer
})
const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial State: ", store.getState())
const unsubscribe = store.subscribe(()=>{
    // console.log("Updated State: ", store.getState())
})

store.dispatch(withdraw())
store.dispatch(withdraw())
store.dispatch(deposit(100))
store.dispatch(openAcc())
store.dispatch(updateStreet("BOR street"))
unsubscribe()
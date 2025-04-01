const redux = require('redux');
const createStore = redux.createStore;
const immer = require('immer');
const produce = immer.produce
const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSIT_MONEY = "DEPOSIT_MONEY";


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

const initialState = {
    amount: 1000,
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

function reducer(prevState = initialState, action){
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

const store = createStore(reducer);
console.log("Initial State: ", store.getState())
const unsubscribe = store.subscribe(()=>{
    console.log("Updated State: ", store.getState())
})

store.dispatch(withdraw())
store.dispatch(withdraw())
store.dispatch(deposit(100))
store.dispatch(openAcc())
store.dispatch(updateStreet("BOR street"))
unsubscribe()
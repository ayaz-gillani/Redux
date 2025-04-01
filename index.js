const redux = require('redux');
const createStore = redux.createStore;

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


const initialState = {
    amount: 1000,
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
unsubscribe()
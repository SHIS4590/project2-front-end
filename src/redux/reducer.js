import { Actions } from "./actions";

const initState = {
    mobiles: [],
    computers: [],
    books: [],
    msg: ""
}

function reducer (state = initState, action) {
    let obj = {}
    state.msg = ""
    switch (action.type) {
        case Actions.loadBooks:
            return Object.assign({}, state, {
                books: action.payload
            })
        case Actions.loadComputers:
            return Object.assign({}, state, {
                computers: action.payload
            })
        case Actions.loadMobiles:
            return Object.assign({}, state, { mobiles: action.payload })
        case Actions.deleteProduct:
            if (action.payload.category === 'mobile')
                obj = { mobiles: state.mobiles.filter(e => e.id !== action.payload.id) }
            if (action.payload.category === 'computer')
                obj = { computers: state.computers.filter(e => e.id !== action.payload.id) }
            if (action.payload.category === 'book')
                obj = { books: state.books.filter(e => e.id !== action.payload.id) }
            return Object.assign({}, state, obj)
        case Actions.updateProduct:
            if (action.payload.category === 'mobile') {
                let p = state.mobiles.find(e => e.id === action.payload.id)
                p.quantity = action.payload.quantity
                obj = { mobiles: [...state.mobiles] }
            }
            else if (action.payload.category === 'computer') {
                let p = state.computers.find(e => e.id === action.payload.id)
                p.quantity = action.payload.quantity
                obj = { computers: [...state.computers] }
            }

            else if (action.payload.category === 'book') {
                let p = state.books.find(e => e.id === action.payload.id)
                p.quantity = action.payload.quantity
                obj = { books: [...state.books] }
            }
            return Object.assign({}, state, obj)
        case Actions.createProduct:
            if (action.payload.category === 'mobile') {
                obj = { mobiles: [...state.mobiles, action.payload] }
            }
            else if (action.payload.category === 'computer') {
                obj = { computers: [...state.computers, action.payload] }
            }

            else if (action.payload.category === 'book') {
                obj = { books: [...state.books, action.payload] }
            }
            return Object.assign({}, state, obj)
        case Actions.updateErrorMsg:
            return { ...state, msg: action.payload }
        case Actions.checkProduct:
            if (action.payload.category === 'mobile') {
                let p = state.mobiles.find(e => e.id === action.payload.id)
                p.checked = !p.checked
                obj = { mobiles: [...state.mobiles] }
            }
            else if (action.payload.category === 'computer') {
                let p = state.computers.find(e => e.id === action.payload.id)
                p.checked = !p.checked
                obj = { computers: [...state.computers] }
            }

            else if (action.payload.category === 'book') {
                let p = state.books.find(e => e.id === action.payload.id)
                p.checked = !p.checked
                obj = { books: [...state.books] }
            }
            return Object.assign({}, state, obj)
        default:
            return state;
    }
}

export default reducer;
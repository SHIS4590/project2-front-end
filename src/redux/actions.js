export const Actions = Object.freeze({
    loadMobiles: "LOAD_MOBILES",
    loadComputers: "LOAD_COMPUTERS",
    loadBooks: "LOAD_BOOKS",
    deleteProduct: "DELETE_PRODUCT",
    updateProduct: "UPDATE_PRODUCT",
    createProduct: "CREATE_PRODUCT",
    updateErrorMsg: "UPDATE_ERROR_MSG",
    checkProduct: "CHECK_PRODUCT"
})

function loadMobiles (mobiles) {
    return {
        type: Actions.loadMobiles,
        payload: mobiles
    }
}

function loadComputers (computers) {
    return {
        type: Actions.loadComputers,
        payload: computers
    }
}

function loadBooks (books) {
    return {
        type: Actions.loadBooks,
        payload: books
    }
}

function deleteProduct (id, category) {
    return {
        type: Actions.deleteProduct,
        payload: {
            id, category
        }
    }
}

function updateProduct (id, category, quantity) {
    return {
        type: Actions.updateProduct,
        payload: {
            id, category, quantity
        }
    }
}

function createProduct (product) {
    return {
        type: Actions.createProduct,
        payload: product
    }
}

function updateErrorMsg (msg) {
    return {
        type: Actions.updateErrorMsg,
        payload: msg
    }
}

function check (payload) {
    return {
        type: Actions.checkProduct,
        payload: payload
    }
}

function checkErrors (res) {
    if (!res.ok) {
        throw Error(`${res.status}:${res.statusText}`)
    }
    return res.json();
}


const  host = "https://cart-api.duckdns.org:8442";

export function loadProducts () {
    return dispatch => {
        fetch(`${host}/products`)
            .then(checkErrors)
            .then(data => {
                if (data.ok) {
                    dispatch(loadBooks(data.books))
                    dispatch(loadComputers(data.computers))
                    dispatch(loadMobiles(data.mobiles))
                }
            })
    }
}

export function deleteProductById (id, category) {
    return dispatch => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`${host}/product/${id}`, options)
            .then(checkErrors)
            .then(data => {
                if (data.ok) {
                    dispatch(deleteProduct(id, category))
                }
            })
    }
}

export function changeQuantityById (id, category, quantity) {
    return dispatch => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`${host}/product/${id}/${quantity}`, options)
            .then(checkErrors)
            .then(data => {
                if (data.ok) {
                    dispatch(updateProduct(id, category, quantity))
                }
            })
    }
}

export function newProduct (name, price, category) {
    let product = { name, price, category }
    if (name === '' || price === '') {
        return updateErrorMsg("Missing Infos")

    }

    return dispatch => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        }
        fetch(`${host}/product`, options)
            .then(checkErrors)
            .then(data => {
                if (data.ok) {
                    product.id = data.id;
                    product.quantity = 1;
                    dispatch(createProduct(product))
                } else {
                    dispatch(updateErrorMsg(data.msg))
                }
            })
    }
}

export function checkProduct (id, category) {
    return check({ id, category })
}
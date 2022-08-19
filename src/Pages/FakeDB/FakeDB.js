// use local storage as your db for now

const addToDb = id => {
    const exists = getDb();
    let eventUser = {};
    if (!exists) {
        eventUser = { ...id };
    }
    else {
        eventUser = JSON.parse(exists);
        eventUser = { ...eventUser, ...id };
    }
    updateDb(eventUser);
}

const getDb = () => localStorage.getItem('miu-cse-routine-store-v1');

const updateDb = cart => {
    localStorage.setItem('miu-cse-routine-store-v1', JSON.stringify(cart));
}

const removeFromDb = () => {
    const exists = getDb();
    if (!exists) {

    }
    else {
        let eventUser = JSON.parse(exists);
        eventUser = {};
        updateDb(eventUser);
    }
}

const getStoredCart = () => {
    const exists = getDb();
    return exists ? JSON.parse(exists) : {};
}

const clearTheCart = () => {
    localStorage.removeItem('miu-cse-routine-store-v1');
}

export { addToDb, removeFromDb, clearTheCart, getStoredCart }
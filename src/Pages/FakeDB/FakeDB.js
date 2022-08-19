// use local storage as your db for now

const addToDb = id => {
    const exists = getDb();
    let eventUser = {};
    if (!exists) {
        eventUser['user'] = id;
    }
    else {
        eventUser = JSON.parse(exists);
        eventUser['user'] = id;
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
        const eventUser = JSON.parse(exists);
        delete eventUser['user'];
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
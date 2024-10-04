const sessionRecordMap = new Map();

const setSession = (id, user) => {
    sessionRecordMap.set(id, user);
};

const getSession = (id) => {   
    return sessionRecordMap.get(id);
};

module.exports = {
    setSession,
    getSession
}
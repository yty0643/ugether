import { getDatabase, ref, set, child, get, update, onValue } from "firebase/database";

class Database{
    async read(path) {
        const dbRef = ref(getDatabase());
        const res = await get(child(dbRef, path))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    throw Error("1", "No data");
                }
            })
        return res;
    }

    update(path, value) {
        const db = getDatabase();
        const updates = {};
        updates[`${path}`] = value;
        return update(ref(db), updates);
    }

    observer(path, setState) {
        const db = getDatabase();
        const dbRef = ref(db, path);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setState(data);
        });
    }
}
export default Database;
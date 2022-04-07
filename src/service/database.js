import { getDatabase, ref, set, child, get, update, onValue } from "firebase/database";

class Database{

    write(nickname, thumbnail, email) {
        const db = getDatabase();
        set(ref(db, `users/${email}`), {
            nickname,
            thumbnail,
            email,
            connectedUser: "",
            isConnect: false,
            isAccess: false,
        });
    }

    async read(email) {
        
        const dbRef = ref(getDatabase());
        const res = await get(child(dbRef, `users/${email}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return false;
            }
        })
        return res;
        //     .catch((error) => {
        //         console.error(error);
        // });
    }

    update(email, connectEmail) {
        const db = getDatabase();
        const updates = {};
        updates['/users/' + email + '/connectedUser'] = connectEmail;
        updates['/users/' + connectEmail + '/isConnect'] = true;
        return update(ref(db), updates);
    }

    test(email) {
        const db = getDatabase();
        const updates = {};
        updates['/users/' + email + '/isConnect'] = true;
        return update(ref(db), updates);
    }

    test2(email) {
        const db = getDatabase();
        const updates = {};
        updates['/users/' + email + '/isConnect'] = false;
        return update(ref(db), updates);
    }

    observer(email, setIsConnect) {
        const db = getDatabase();
        const isConnectRef = ref(db, 'users/' + email + '/isConnect');
        onValue(isConnectRef, (snapshot) => {
            const data = snapshot.val();
            setIsConnect(data);
        });
    }
}
export default Database;
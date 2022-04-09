import { getDatabase, ref, set, child, get, update, onValue } from "firebase/database";

class Database{

    write(nickname, thumbnail, email) {
        const db = getDatabase();
        set(ref(db, `users/${email}`), {
            nickname,
            thumbnail,
            email,
            partner: "",
            isOnline: false,
            isLink: false,
        });
    }

    async read(email) {
        
        const dbRef = ref(getDatabase());
        const res = await get(child(dbRef, `users/${email}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    return false;
                }
            })
        return res;
    }

    update(email, path, value) {
        const db = getDatabase();
        const updates = {};
        updates[`/users/${email}/${path}`] = value;
        return update(ref(db), updates);
    }

    linkObserver(email, partner, setState) { //partner이메일로 바꿔야함.
        const db = getDatabase();
        const partnerRef = ref(db, `users/${partner}/partner`);
        onValue(partnerRef, (snapshot) => {
            const data = snapshot.val();
            if (email == data) setState();
        });
    }

    partnerObserver(partner, setState) {
        const db = getDatabase();
        const partnerRef = ref(db, `users/${partner}`);
        onValue(partnerRef, (snapshot) => {
            const data = snapshot.val();
            setState(data);
        });
    }
}
export default Database;
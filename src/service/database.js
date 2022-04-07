import { getDatabase, ref, set, child, get } from "firebase/database";

class Database{

    write(nickname, thumbnail, email) {
        const db = getDatabase();
        set(ref(db, `users/${email}`), {
            nickname,
            thumbnail,
            email,
            linkedUser: "",
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
}
export default Database;
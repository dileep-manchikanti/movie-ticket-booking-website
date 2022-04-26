import { app } from "../firebase/connect";
import { getFirestore,getDoc,doc} from "firebase/firestore";
const db=getFirestore(app);
export const getTickets = async (title) =>
{
    const docRef = doc(db, "tickets",title);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
    return docSnap.data();
}
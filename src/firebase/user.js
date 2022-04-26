import {getAuth} from 'firebase/auth';
const auth=getAuth();
export  const user=auth.currentUser;
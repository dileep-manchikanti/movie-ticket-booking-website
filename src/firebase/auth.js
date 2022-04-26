import {app} from './connect';
import {getAuth} from 'firebase/auth';
export const auth=getAuth(app);
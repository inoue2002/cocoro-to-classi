import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

interface LoginUser {
  uid: string;
  token: string;
}
export const useAuth = () => {
  const loginUser = useState<LoginUser>('loginUser', () => null);
  async function signIn(email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              loginUser.value = {
                token: idToken,
                uid: userCredential.user.uid,
              };
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  async function signOut() {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      firebaseSignOut(auth)
        .then(() => {
          loginUser.value = {
            token: null,
            uid: null,
          };
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function checkAuthState() {
    return await new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) return resolve();
      const auth = getAuth();
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user
              .getIdToken()
              .then((idtoken) => {
                loginUser.value = {
                  token : idtoken,
                  uid : user.uid
                }
                resolve();
              })
              .catch(reject);
          } else {
            loginUser.value = null
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  return {
    signIn,
    signOut,
    checkAuthState,
    loginUser
  };
};

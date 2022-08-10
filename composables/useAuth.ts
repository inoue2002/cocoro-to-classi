import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

export const useAuth = () => {
  const token = useState<string>('token', () => null);
  async function signIn(email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log({ userCredential });
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken;
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
          token.value = null;
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
                token.value = idtoken;
                resolve();
              })
              .catch(reject);
          } else {
            token.value = null;
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
    token,
    checkAuthState,
  };
};

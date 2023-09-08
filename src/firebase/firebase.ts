// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
//
// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// 	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
//
// const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
//
// const auth = getAuth(app);
// const firestore = getFirestore(app);
//
// export { auth, firestore, app };
type MockedAuth = {
    currentUser: any;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    // ... any other required properties or methods
};

type MockedFirestore = {
    collection: (name: string) => any;
    // ... any other required properties or methods
};

const auth: MockedAuth = {
    currentUser: null,
    signInWithEmailAndPassword: async (email, password) => {
        return { user: { email } };
    },
    signOut: async () => { }
};

const firestore = {
    currentUser: null,
    signInWithEmailAndPassword: async (email: string, password: string) => {
        // mocked implementation
        return { user: { email: email } };
    },
    signOut: async () => {
        // mocked implementation
    },
    collection: (name: string) => ({
        add: (data: object) => {
            // mocked implementation
        },
        doc: (id: string) => ({
            get: () => ({
                data: () => ({})
                // mocked data
            })
        })
    })
};


const app = {};

export { auth, firestore, app };

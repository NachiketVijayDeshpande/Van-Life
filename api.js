//config firebase
import { initializeApp } from "firebase/app"

import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite"


//config firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwpC_OYGCToy6w3RzpqnrBgszBHOfeW8w",
  authDomain: "vanlife-9f78c.firebaseapp.com",
  projectId: "vanlife-9f78c",
  storageBucket: "vanlife-9f78c.appspot.com",
  messagingSenderId: "840912872043",
  appId: "1:840912872043:web:9fee9231795e70c7fec72e"
};


//config firebase
const app = initializeApp(firebaseConfig)


const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}



export async function getHostVan(id) {
    const q = query(
        vansCollectionRef,
        where(documentId(), "==", id),
        where("hostId", "==", "123")
    )
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans[0]
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
import { database } from "@/services/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const initializeNewUser = async (currentUser: any) => {
  try {
    if (!currentUser || !currentUser.uid) {
      throw new Error("Invalid user object or missing UID.")
    }

    const usersRef = doc(database, "userData", currentUser.uid)
    await setDoc(usersRef, { saved_invoices: [] })
  } catch (error) {
    console.error("Error while initializing new user:", error)
    throw error
  }
}

export const getUserData = async (currentUser: any) => {
  try {
    if (!currentUser || !currentUser.uid) {
      throw new Error("Invalid user object or missing UID.")
    }

    const docRef = doc(database, "userData", currentUser.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error while getting user data:", error)
    throw error
  }
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "CHANGE_THIS",
  authDomain: "CHANGE_THIS",
  databaseURL: "CHANGE_THIS",
  projectId: "CHANGE_THIS",
  storageBucket: "CHANGE_THIS",
  messagingSenderId: "CHANGE_THIS",
  appId: "CHANGE_THIS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

signInAnonymously(auth)
  .then((res) => 
  {
    console.log("Logged Anon");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

  onAuthStateChanged(auth, (user) => 
  {
    if (user) 
    {
      window.cookie = user.uid;
      const uid = user.uid;
      const snippetRef = doc(getFirestore(app), "snippets", uid);

      getDoc(snippetRef)
        .then(snap => {
          if (snap.exists())
          {
            textAce.setValue(snap.data().code);
          }
        })
        .catch(() => {
          console.log("error trayendo snipet");
        });

      $("#btnGuardar").fadeIn();
      $("#btnShare").fadeIn();
      $("#btnGuardar").on("click", function() 
      {
        const snippetRef = collection(getFirestore(app), "snippets");

         setDoc(doc(snippetRef, uid), {
          id: uid,
          name: "file1",
          code: textAce.getValue(),
          userId: uid,
          createdAt: new Date()
         }).then(res => 
         {
          ;
         }).catch(err => 
         {
          console.log(err);
         });

      });
    } 
    else 
    {
      ;
    }
  });

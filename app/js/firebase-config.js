import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJmSs7PsVCQRrkKntc4fQNk9pswC1sfLI",
  authDomain: "erlan-2017.firebaseapp.com",
  databaseURL: "https://erlan-2017.firebaseio.com",
  projectId: "erlan-2017",
  storageBucket: "erlan-2017.appspot.com",
  messagingSenderId: "924389614614",
  appId: "1:924389614614:web:5674d8c6722da154478137"
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
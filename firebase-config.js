// ===================================================
// Firebase Configuration
// ===================================================
// 
// הוראות הגדרה:
// 1. לך אל: https://console.firebase.google.com/
// 2. לחץ על "Add project" או בחר פרויקט קיים
// 3. בחר את הפרויקט שלך
// 4. לחץ על הגלגל ⚙️ ליד "Project Overview" > "Project settings"
// 5. גלול למטה ל-"Your apps" ולחץ על </> (Web)
// 6. תן כינוי לאפליקציה (לדוגמה: "Sushi Burger App")
// 7. העתק את פרטי ההגדרות מה-"firebaseConfig"
// 8. החלף את הערכים למטה בערכים שלך
// 9. שמור את הקובץ
//
// ===================================================

const firebaseConfig = {
    apiKey: "AIzaSyDc1vzrZwezvVsSsVh46MyeIQw0xAJbV1o",
    authDomain: "sushi-burger-a9639.firebaseapp.com",
    databaseURL: "https://sushi-burger-a9639-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sushi-burger-a9639",
    storageBucket: "sushi-burger-a9639.firebasestorage.app",
    messagingSenderId: "298120394110",
    appId: "1:298120394110:web:cd589a65028f607a8a2f2f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Export database reference for use in app.js
window.db = database;

console.log("✅ Firebase initialized successfully!");

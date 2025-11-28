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
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Export database reference for use in app.js
window.db = database;

console.log("✅ Firebase initialized successfully!");

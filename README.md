# Sushi Burger - אפליקצית הזמנות משפחתית 🍔🍣

אפליקציית ווב מהממת לארוחת ערב משפחתית עם סנכרון בזמן אמת בין כל המכשירים!

## ✨ תכונות

- 🔥 **סנכרון בזמן אמת** - כל אחד רואה את ההזמנות של כולם מיד
- 📱 **עובד על כל המכשירים** - טלפון, טאבלט, מחשב
- 🐟 **בחירת סלמון** - עם סלמון או ללא סלמון
- 🥑 **תוספות משתנות** - אפשרות להוסיף תוספות חדשות שכולם יוכלו לבחור
- 🎨 **עיצוב מודרני** - glassmorphism, gradients, אנימציות
- 🌐 **תמיכה מלאה בעברית** - RTL וטיפוגרפיה עברית

## 🚀 התקנה והפעלה

### שלב 1: הגדרת Firebase

1. לך אל [Firebase Console](https://console.firebase.google.com/)
2. לחץ על "Add project" (או בחר פרויקט קיים)
3. תן שם לפרויקט (לדוגמה: "sushi-burger")
4. ב-Firebase Console, לך ל-**Realtime Database**:
   - לחץ על "Create Database"
   - בחר מיקום (Europe לישראל)
   - בחר "Start in **test mode**" (לפיתוח)
   - לחץ Enable
5. לחץ על ⚙️ > Project settings
6. גלול ל-"Your apps" ולחץ על `</>` (Web)
7. תן כינוי: "Sushi Burger App"
8. העתק את פרטי ה-`firebaseConfig`
9. פתח את הקובץ `firebase-config.js` והחלף את הערכים

### שלב 2: פתיחת האפליקציה

פתח את `index.html` בדפדפן, או הרץ שרת לוקלי:

```bash
cd sushi-burger-app
python3 -m http.server 8000
```

ואז פתח: `http://localhost:8000`

## 📁 מבנה הפרויקט

```
sushi-burger-app/
├── index.html          # מבנה HTML
├── style.css           # עיצוב מודרני
├── app.js             # לוגיקה + Firebase sync
├── firebase-config.js  # הגדרות Firebase (צריך למלא!)
├── logo.png           # לוגו
└── README.md          # הקובץ הזה
```

## 🔒 אבטחה

**חשוב:** כרגע האפליקציה מוגדרת ב-test mode, כלומר כל אחד יכול לקרוא ולכתוב.

לשימוש ארוך-טווח, עדכן את ה-Security Rules ב-Firebase Console:

```json
{
  "rules": {
    "orders": {
      ".read": true,
      ".write": true
    },
    "toppings": {
      ".read": true,
      ".write": true
    }
  }
}
```

## 🌐 העלאה ל-GitHub Pages

האפליקציה מוכנה להעלאה ל-GitHub Pages:

```bash
git init
git add .
git commit -m "Initial commit - Sushi Burger App"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

ואז ב-GitHub Repository Settings > Pages > בחר Source: "main branch"

## 🛠️ טכנולוגיות

- HTML5, CSS3, Vanilla JavaScript
- Firebase Realtime Database
- Google Fonts (Heebo)
- Responsive Design

## 📝 רישיון

MIT - השתמש בחופשיות!

---

**בתאבון! 🍣🍔**

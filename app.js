import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

// الـ Config الخاصة بـ XXSB اللي طلعناها سوا
const firebaseConfig = {
  apiKey: "AIzaSyCyiLPBJ0qDVZhAtW5r0psuvz8iyIy8VLI",
  authDomain: "xxsb-6bd79.firebaseapp.com",
  projectId: "xxsb-6bd79",
  storageBucket: "xxsb-6bd79.firebasestorage.app",
  messagingSenderId: "6915419205",
  appId: "1:6915419205:web:06a25cea4a0133cdb9472c",
  measurementId: "G-LLMEGHR9PV"
};

// تهيئة الفايربيز
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// استماع لحظي (Realtime) لتحديثات الغرفة (مثال لغرفة تجريبية ROOM_001)
const roomRef = doc(db, "rooms", "ROOM_001");

onSnapshot(roomRef, (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.data();
        
        // تحديث إجمالي الخزنة في الشاشة
        document.getElementById("total-pool").innerText = `$${data.totalPool || 0}`;
        
        // التحكم في حالة التجميد والـ UI
        const statusDiv = document.getElementById("room-status");
        const frozenSection = document.getElementById("frozen-section");
        
        if (data.status === "frozen") {
            statusDiv.innerText = "مجمّدة ❄️";
            statusDiv.className = "status frozen";
            frozenSection.classList.remove("hidden"); // إظهار سيكشن التذاكر
        } else {
            statusDiv.innerText = "نشطة 🟢";
            statusDiv.className = "status active";
            frozenSection.classList.add("hidden");
        }
    }
});

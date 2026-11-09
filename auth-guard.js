// auth-guard.js
// প্রতিটি সুরক্ষিত পেজে ব্যবহার করুন:
//   import { requireRole, logout } from "./auth-guard.js";
//   const { user, profile } = await requireRole(['owner']);
// পেজের <body> এ style="display:none" দিয়ে রাখুন, লগইন ও রোল ঠিক হলে এটি দেখাবে।

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const ROLE_HOME = {
    owner: "owner-dashboard.html",
    helper: "helper-dashboard.html",
    delivery: "delivery-man.html"
};

export async function getProfile(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function requireRole(allowedRoles) {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                location.replace("login.html");
                return;
            }
            try {
                const profile = await getProfile(user.uid);
                if (!profile || !allowedRoles.includes(profile.role)) {
                    alert("এই পেজে আপনার প্রবেশের অনুমতি নেই!");
                    await signOut(auth);
                    location.replace("login.html");
                    return;
                }
                document.body.style.display = "block";
                resolve({ user, profile });
            } catch (err) {
                console.error(err);
                alert("যাচাই করতে সমস্যা হয়েছে: " + err.message);
                location.replace("login.html");
            }
        });
    });
}

export async function logout() {
    if (!confirm("আপনি কি লগআউট করতে চান?")) return;
    await signOut(auth);
    location.replace("login.html");
}

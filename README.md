# 🏛️ NCitizen

**NCitizen** is a community-driven platform that allows users to engage with various societal and geographic issues. The platform lets users join communities based on interests like **politics, military, healthcare, education**, and more — including geographic communities for specific **cities and locations**.

## ✨ Features

-   ✅ **Responsive UI**
-   📊 **Animated poll result bars**
-   🖼️ **Poll cards** with title, date, image, and metadata
-   📌 **Toggleable poll views**: Raw, Weighted, Party, Gender, Race, Age, Region, Education
-   🔄 **Smooth transition animations**
-   🎨 **Color-coded poll bars** with dynamic labels
-   🔐 **Firebase Authentication** – Users can log in securely
-   🧩 **Join/Leave Communities** – Saved using `localStorage`
-   📱 **Responsive Design** – Fully mobile-friendly
-   📦 **Dynamic Community Cards** – Each with images and join/leave toggle

---

## 🧰 Tech Stack

-   **Frontend**: React.js (with TypeScript)
-   **Backend**: Firebase (Authentication + Firestore)
-   **Routing**: React Router
-   **Styling**: Tailwind CSS
-   **React Hooks**: `useState`, `useEffect`, `useContext`

---

## 🧠 Data Structure

-   Polls are dynamically generated from an array of objects.
-   Each poll view (Raw, Party, Gender, etc.) shows unique `yes` and `no` percentages.
-   Poll bars auto-adjust and animate based on selected demographics.

---

## 🌐 Communities

NCitizen supports two types of communities:

1. **Issue-based communities**  
   Topics like Media, Military, Healthcare, Education, etc.

2. **Geographic-based communities**  
   Locations like New York, Texas, California, Tennessee, etc.

> 📌 Each community has an associated image, and users can join or leave with a single click. If not logged in, users are prompted to log in before joining.

---

## 🔥 Firebase Integration

-   **Authentication**: Firebase Auth handles user sign-ins.
-   **Persistence**: Community join state is saved in `localStorage` to maintain data across sessions.
-   **Protected Actions**: Only logged-in users can join/leave communities.

---

## 👨‍💻 Author

**Obayomi Taofeek**  
Frontend Developer & React Enthusiast  
📧 obayomitaofeek7@gmail.com  
🐦 [Twitter / X](https://x.com/ObayomiTaofeek)  
💻 [GitHub](https://github.com/Tobless-Scripts)

---

## 🪪 License

MIT License © 2025 Obayomi Taofeek

---

## ⚙️ Setup Instructions

1.  **Clone the Repository**

        ```bash
        git clone https://github.com/Tobless-scripts/ncitizen.git
        cd ncitizen
        npm install
        npm run dev

        ```

import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home.tsx";
import Community from "./components/Community.tsx";
import Login from "./components/Login.tsx";
import { useState } from "react";
import Profile from "./components/Profile.tsx";
import { NotificationProvider } from "../src/components/Notifications";
import Signup from "./components/Signup.tsx";
import { AuthProvider } from "./components/AuthContext.tsx";

function App() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    return (
        <>
            <AuthProvider>
                {" "}
                <NotificationProvider>
                    <Router>
                        <Header profileImage={profileImage} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/* ✅ Home as default route */}
                            <Route path="/home" element={<Home />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        profileImage={profileImage}
                                        setProfileImage={setProfileImage}
                                    />
                                }
                            />
                            <Route path="/signup" element={<Signup />} />
                        </Routes>
                    </Router>
                </NotificationProvider>{" "}
            </AuthProvider>
        </>
    );
}

export default App;

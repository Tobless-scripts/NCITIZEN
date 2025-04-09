import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home.tsx";
import Community from "./components/Community.tsx";
import Login from "./components/Login.tsx";
import { ImageProvider } from "./Context/ImageContext.tsx";
import Profile from "./components/Profile.tsx";
import { NotificationProvider } from "../src/components/Notifications";
import Signup from "./components/Signup.tsx";
import { UserProvider } from "./Context/UserContext";
import { AuthProvider } from "./Context/AuthContext.tsx";

function App() {
    return (
        <>
            <UserProvider>
                <ImageProvider>
                    <AuthProvider>
                        {" "}
                        <NotificationProvider>
                            <Router>
                                <Header />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    {/* ✅ Home as default route */}
                                    <Route path="/home" element={<Home />} />
                                    <Route
                                        path="/community"
                                        element={<Community />}
                                    />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/profile"
                                        element={<Profile />}
                                    />
                                    <Route
                                        path="/signup"
                                        element={<Signup />}
                                    />
                                </Routes>
                            </Router>
                        </NotificationProvider>{" "}
                    </AuthProvider>
                </ImageProvider>
            </UserProvider>
        </>
    );
}

export default App;

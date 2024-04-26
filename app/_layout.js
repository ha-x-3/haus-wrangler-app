import { Slot } from "expo-router";
import { AuthProvider, logToken } from "./AuthContext";
import Header from "./Header";

export default function Layout() {

    //logToken();

    return (
        <AuthProvider>
            <Header />
            <Slot />
        </AuthProvider>
    );
}
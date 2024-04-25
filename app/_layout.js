import { Slot } from "expo-router";
import { AuthProvider, logToken } from "./AuthContext";

export default function Layout() {

    logToken();

    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
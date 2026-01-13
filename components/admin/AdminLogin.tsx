"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FiLock, FiLogIn } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminLoginProps {
    onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Authentication failed");
                return;
            }

            onSuccess();
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <FiLock className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
                        <p className="text-muted-foreground text-sm mt-2">
                            Enter your password to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-background"
                                required
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-red-500 text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            <FiLogIn className="h-4 w-4 mr-2" />
                            {isLoading ? "Authenticating..." : "Sign In"}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;

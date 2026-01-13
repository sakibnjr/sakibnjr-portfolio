"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "motion/react";
import { FiGithub, FiGitCommit, FiGitPullRequest, FiClock } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubEvent {
    id: string;
    type: string;
    repo: {
        name: string;
    };
    payload: {
        commits?: Array<{
            message: string;
            sha: string;
        }>;
        pull_request?: {
            title: string;
            number: number;
        };
        action?: string;
    };
    created_at: string;
}

const GithubActivity = () => {
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://api.github.com/users/sakibnjr/events/public");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setEvents(data.slice(0, 5)); // Get last 5 events
                }
            } catch (error) {
                console.error("Error fetching GitHub events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getEventIcon = (type: string) => {
        switch (type) {
            case "PushEvent":
                return <FiGitCommit className="h-4 w-4 text-rose-500" />;
            case "PullRequestEvent":
                return <FiGitPullRequest className="h-4 w-4 text-blue-500" />;
            default:
                return <FiGithub className="h-4 w-4 text-muted-foreground" />;
        }
    };

    const getEventText = (event: GitHubEvent) => {
        const repoName = event.repo.name.split("/")[1] || event.repo.name;

        if (event.type === "PushEvent" && event.payload.commits) {
            return (
                <>
                    Pushed {event.payload.commits.length} commit{event.payload.commits.length > 1 ? "s" : ""} to{" "}
                    <span className="text-foreground font-medium">{repoName}</span>
                </>
            );
        }

        if (event.type === "PullRequestEvent") {
            return (
                <>
                    {event.payload.action === "opened" ? "Opened" : "Closed"} pull request in{" "}
                    <span className="text-foreground font-medium">{repoName}</span>
                </>
            );
        }

        if (event.type === "CreateEvent") {
            return (
                <>
                    Created repository <span className="text-foreground font-medium">{repoName}</span>
                </>
            );
        }

        return (
            <>
                Activity in <span className="text-foreground font-medium">{repoName}</span>
            </>
        );
    };

    return (
        <section id="activity" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-foreground text-center"
                    >
                        GitHub <span className="text-rose-500">Activity</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base sm:text-lg text-muted-foreground mt-4 text-center max-w-2xl mx-auto"
                    >
                        A real-time look into my contributions and commits in the developer community.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Heatmap Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-rose-500/10">
                                <FiGithub className="h-5 w-5 text-rose-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Contribution Graph</h3>
                                <p className="text-xs text-muted-foreground">Stats from the past year</p>
                            </div>
                        </div>

                        <div className="flex justify-center overflow-x-auto pb-4 custom-scrollbar">
                            {mounted ? (
                                <GitHubCalendar
                                    username="sakibnjr"
                                    colorScheme={theme === "dark" ? "dark" : "light"}
                                    fontSize={12}
                                    blockSize={12}
                                    blockMargin={4}
                                    theme={{
                                        dark: ["#1e293b", "#f43f5e", "#fb7185", "#fda4af", "#fff1f2"].reverse(),
                                        light: ["#f1f5f9", "#fff1f2", "#fda4af", "#fb7185", "#f43f5e"],
                                    }}
                                />
                            ) : (
                                <Skeleton className="h-[128px] w-full max-w-[800px] rounded-xl" />
                            )}
                        </div>

                        {/* Activity Feed Loading State */}
                        {loading && (
                            <div className="space-y-4 max-w-4xl mx-auto">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center space-x-4 p-4 border border-border rounded-xl">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>


                    {/* Recent Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-2xl p-6 flex flex-col h-full"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <FiClock className="h-5 w-5 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Recent Feed</h3>
                        </div>

                        <div className="space-y-6 flex-1">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-8 w-8 rounded-full mt-1" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))
                            ) : events.length > 0 ? (
                                events.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="mt-1">
                                            <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center p-1.5 border border-border group-hover:border-rose-500/30 transition-colors">
                                                {getEventIcon(event.type)}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-foreground/90 leading-snug">
                                                {getEventText(event)}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 uppercase tracking-wider">
                                                {new Date(event.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground text-sm">
                                    No public events found.
                                </div>
                            )}
                        </div>

                        <a
                            href="https://github.com/sakibnjr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 flex items-center justify-center gap-2 p-3 text-xs font-semibold rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer border border-border"
                        >
                            <FiGithub className="h-4 w-4" />
                            View full profile
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GithubActivity;

'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const achievements = [
    {
        title: 'MLH Track Winner',
        event: 'HackCBS 8.0',
        year: '2025',
        icon: FaTrophy,
        color: '#F59E0B',
        description: 'Recognized for best use of Generative AI & Auth0 at one of India\'s premier hackathons'
    },
    {
        title: 'Top 10 Global Finalist',
        event: 'GSMA Gateway Hackathon | Nokia\'s Network as Code Challenge',
        year: '2025',
        icon: FaMedal,
        color: '#3B82F6',
        description: 'Secured top 10 position globally at IMC 2025 among hundreds of participants'
    },
    {
        title: 'SIH 2024 Finalist',
        event: 'Smart India Hackathon 2024',
        year: '2024',
        icon: FaAward,
        color: '#10B981',
        description: 'Ranked Top 5 teams out of 500 for Problem Statement 1682'
    },
    {
        title: '4th Position',
        event: 'HackUnicorn 1.0',
        year: '2023',
        icon: FaMedal,
        color: '#8B5CF6',
        description: 'Secured 4th position competing against top engineering teams'
    },
    {
        title: '3rd Position',
        event: 'Hack Heaven Hackathon',
        year: '2023',
        icon: FaTrophy,
        color: '#EC4899',
        description: 'Won 3rd place for innovative problem-solving and technical execution'
    },
];

export default function AchievementsSection() {
    return (
        <section
            id="achievements"
            className="relative py-20 min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.08) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
                        Achievements
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Recognition and awards from hackathons and competitions
                    </p>
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="relative group"
                        >
                            <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
                                {/* Icon */}
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                                    style={{
                                        backgroundColor: `${achievement.color}20`,
                                        border: `2px solid ${achievement.color}40`
                                    }}
                                >
                                    <achievement.icon
                                        size={32}
                                        style={{ color: achievement.color }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="text-center flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        {achievement.event}
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                        {achievement.description}
                                    </p>
                                    <div className="mt-auto">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                                            style={{
                                                backgroundColor: `${achievement.color}20`,
                                                color: achievement.color,
                                                border: `1px solid ${achievement.color}40`
                                            }}
                                        >
                                            {achievement.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Glow effect on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                                    style={{
                                        background: `radial-gradient(circle at center, ${achievement.color} 0%, transparent 70%)`
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

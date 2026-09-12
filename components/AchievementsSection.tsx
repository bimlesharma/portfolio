'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
            className="relative overflow-x-hidden bg-background py-12"
        >
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-8 text-center"
                >
                    <h2 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Achievements
                    </h2>
                    <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                        Recognition and awards from hackathons and competitions
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="h-full"
                        >
                            <Card className="h-full py-5">
                                <CardContent className="flex h-full flex-col items-center text-center">
                                    <div className="mb-4 flex size-12 items-center justify-center border bg-muted">
                                        <achievement.icon size={22} className="text-foreground" />
                                    </div>
                                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                                        {achievement.title}
                                    </h3>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                                        {achievement.event}
                                    </p>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        {achievement.description}
                                    </p>
                                    <Badge variant="outline" className="mt-auto">
                                        {achievement.year}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

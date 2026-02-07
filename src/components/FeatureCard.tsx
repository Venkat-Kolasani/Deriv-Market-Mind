'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, Share2, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: 'brain' | 'shield' | 'share';
    delay?: number;
}

const iconMap: Record<string, LucideIcon> = {
    brain: Brain,
    shield: Shield,
    share: Share2,
};

/**
 * FeatureCard Component
 * Displays a solution feature with icon, title, and description
 */
export default function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
    const IconComponent = iconMap[icon];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="card p-8 card-hover group"
        >
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue-dim)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent-blue)]/20 transition-colors">
                <IconComponent className="w-6 h-6 text-[var(--accent-blue)]" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white mb-3">
                {title}
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

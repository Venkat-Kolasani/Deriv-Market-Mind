'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Shield, Share2, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: 'brain' | 'shield' | 'share';
  href: string;
  delay?: number;
}

const iconMap: Record<'brain' | 'shield' | 'share', LucideIcon> = {
  brain: Brain,
  shield: Shield,
  share: Share2,
};

export default function FeatureCard({
  title,
  description,
  icon,
  href,
  delay = 0,
}: FeatureCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Link href={href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="card p-8 card-hover group cursor-pointer"
      >
        {/* ICON */}
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue-dim)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent-blue)]/20 transition-colors">
          <IconComponent className="w-6 h-6 text-[var(--accent-blue)]" />
        </div>

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-3">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}

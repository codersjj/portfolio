import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Background: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Generate particles
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 1;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = Math.random() > 0.5 ? '#fbbf24' : '#ffffff'; // Amber or White
            particle.style.position = 'absolute';
            particle.style.borderRadius = '50%';
            particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            containerRef.current.appendChild(particle);

            // Animate
            gsap.to(particle, {
                y: `-${Math.random() * 200 + 100}px`,
                x: `${Math.random() * 100 - 50}px`,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 5
            });

            gsap.to(particle, {
                opacity: 0,
                duration: Math.random() * 5 + 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-90"></div>
        </div>
    );
};

export default Background;

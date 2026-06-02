'use client';

import { motion } from 'framer-motion';
import BottleFlacon from '@/components/svg/BottleFlacon';
import BottleRound from '@/components/svg/BottleRound';
import BottleFaceted from '@/components/svg/BottleFaceted';

export default function ThePain() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--s10) var(--s3)',
        background: '#070707',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        textAlign: 'center',
      }}
    >
      {/* Radial gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(55% 65% at 50% 22%, rgba(201,169,97,0.18) 0%, transparent 62%),
            radial-gradient(45% 55% at 50% 110%, rgba(201,169,97,0.08) 0%, transparent 60%)
          `,
        }}
      />
      {/* Tech grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          WebkitMaskImage:
            'radial-gradient(75% 70% at 50% 35%, black 0%, transparent 72%)',
          maskImage:
            'radial-gradient(75% 70% at 50% 35%, black 0%, transparent 72%)',
          opacity: 0.5,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          maxWidth: 760,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--s3)',
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            fontSize: 10.5,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#c9a961',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: 18, height: 1, background: '#c9a961', display: 'inline-block' }}
          />
          נשמע מוכר?
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 50px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#f5f5f5',
            maxWidth: 640,
          }}
        >
          כמה בקבוקים יושבים אצלך במגירה?
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: '#b8b8b8',
            maxWidth: 560,
            margin: 0,
          }}
        >
          קנית בושם לפי תיאור באינטרנט. הגיע, התלהבת, ענדת פעמיים — והבנת שזה פשוט לא אתה.
          400&#8362;, 800&#8362;, לפעמים יותר. שוב ושוב.
        </p>

        {/* Faded bottles */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 14,
            margin: 'var(--s3) 0 var(--s1)',
            filter: 'grayscale(0.7)',
          }}
        >
          <BottleRound width={30} height={42} />
          <BottleFaceted width={34} height={48} />
          <BottleFlacon width={40} height={56} />
          <BottleRound width={34} height={48} />
          <BottleFaceted width={30} height={42} />
        </motion.div>

        {/* Gold italic quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.5vw, 27px)',
            lineHeight: 1.5,
            color: '#c9a961',
            maxWidth: 660,
            margin: 'var(--s4) auto 0',
          }}
        >
          הבעיה אף פעם לא היית אתה. הבעיה הייתה שאף אחד לא באמת הקשיב למה שאתה אוהב.
        </motion.p>
      </motion.div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import BottleFlacon from '@/components/svg/BottleFlacon';
import BottleRound from '@/components/svg/BottleRound';
import BottleFaceted from '@/components/svg/BottleFaceted';

export default function ThePain() {
  return (
    <section className="ed-pain">
      <div className="ed-pain-inner">
        {/* Lead — serif headline anchored right */}
        <motion.div
          className="ed-pain-lead"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ed-pain-eyebrow">נשמע מוכר?</span>
          <h2 className="ed-pain-h">כמה בקבוקים יושבים אצלך במגירה?</h2>
          <p className="ed-pain-body">
            קנית בושם לפי תיאור באינטרנט. הגיע, התלהבת, ענדת פעמיים — והבנת שזה פשוט לא אתה.
            400&#8362;, 800&#8362;, לפעמים יותר. שוב ושוב.
          </p>
        </motion.div>

        {/* Faint bottles drift to the empty left side */}
        <motion.div
          className="ed-pain-bottles"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.22 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <BottleRound width={26} height={36} />
          <BottleFaceted width={30} height={42} />
          <BottleFlacon width={36} height={50} />
          <BottleRound width={30} height={42} />
          <BottleFaceted width={26} height={36} />
        </motion.div>

        {/* Gold-leaf pull-quote above hairline rule */}
        <motion.figure
          className="ed-pullquote"
          style={{ margin: '96px auto 0' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            הבעיה אף פעם לא היית אתה. הבעיה הייתה שאף אחד לא באמת הקשיב למה שאתה אוהב.
          </p>
        </motion.figure>
      </div>
    </section>
  );
}

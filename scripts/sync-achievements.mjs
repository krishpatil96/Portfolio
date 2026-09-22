import fs from 'fs';
import path from 'path';

const achievementsDir = path.resolve('public/achievements');
const distAchievementsDir = path.resolve('dist/achievements');

if (!fs.existsSync(achievementsDir)) {
  fs.mkdirSync(achievementsDir, { recursive: true });
}

// Mapping between clean filename and original WhatsApp filename
const fileMappings = [
  {
    clean: 'python-bootcamp-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.15 PM (1).jpeg',
  },
  {
    clean: 'python-bootcamp-event-gps.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.15 PM (2).jpeg',
  },
  {
    clean: 'adobe-hackathon-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.15 PM (3).jpeg',
  },
  {
    clean: 'python-bootcamp-event-stage.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.15 PM.jpeg',
  },
  {
    clean: 'simplilearn-python-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.16 PM (1).jpeg',
  },
  {
    clean: 'tata-crucible-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.16 PM (2).jpeg',
  },
  {
    clean: 'guvi-fullstack-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.16 PM (3).jpeg',
  },
  {
    clean: 'prompt-engineering-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.16 PM.jpeg',
  },
  {
    clean: 'google-foundations-cybersecurity.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.17 PM (1).jpeg',
  },
  {
    clean: 'redhat-rh134-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.17 PM (2).jpeg',
  },
  {
    clean: 'google-cybersecurity-professional-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.17 PM.jpeg',
  },
  {
    clean: 'coursera-django-migrations.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.18 PM (1).jpeg',
  },
  {
    clean: 'ai-impact-summit-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.18 PM (2).jpeg',
  },
  {
    clean: 'vibeinity-ai-coding-certificate.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.18 PM (3).jpeg',
  },
  {
    clean: 'anantam-fest-award-proof.jpeg',
    raw: 'WhatsApp Image 2026-09-21 at 7.00.18 PM.jpeg',
  },
];

let synced = 0;
for (const mapping of fileMappings) {
  const cleanPath = path.join(achievementsDir, mapping.clean);
  const rawPath = path.join(achievementsDir, mapping.raw);

  if (fs.existsSync(rawPath) && !fs.existsSync(cleanPath)) {
    try {
      fs.copyFileSync(rawPath, cleanPath);
      synced++;
    } catch {
      // ignore
    }
  } else if (fs.existsSync(cleanPath) && !fs.existsSync(rawPath)) {
    try {
      fs.copyFileSync(cleanPath, rawPath);
      synced++;
    } catch {
      // ignore
    }
  }
}

if (fs.existsSync(distAchievementsDir)) {
  for (const f of fs.readdirSync(achievementsDir)) {
    const src = path.join(achievementsDir, f);
    const dest = path.join(distAchievementsDir, f);
    if (fs.statSync(src).isFile()) {
      try {
        fs.copyFileSync(src, dest);
      } catch {
        // ignore
      }
    }
  }
}

console.log(`Achievements asset sync completed. Synced ${synced} aliases.`);

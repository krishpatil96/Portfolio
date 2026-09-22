import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateResume() {
  const publicResumeDir = path.resolve(__dirname, '../public/resume');
  if (!fs.existsSync(publicResumeDir)) {
    fs.mkdirSync(publicResumeDir, { recursive: true });
  }
  const publicResumePath = path.join(publicResumeDir, 'Krish_Patil_Resume.pdf');
  const distResumeDir = path.resolve(__dirname, '../dist/resume');

  // If a valid PDF already exists, keep it untouched and copy to dist
  if (fs.existsSync(publicResumePath)) {
    const existing = fs.readFileSync(publicResumePath);
    if (existing.length > 500 && existing.toString('utf8', 0, 5).startsWith('%PDF-')) {
      console.log('Preserving existing resume PDF at:', publicResumePath);
      if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
        if (!fs.existsSync(distResumeDir)) {
          fs.mkdirSync(distResumeDir, { recursive: true });
        }
        fs.writeFileSync(path.join(distResumeDir, 'Krish_Patil_Resume.pdf'), existing);
      }
      return;
    }
  }

  const pdfDoc = await PDFDocument.create();
  
  // Set document metadata
  pdfDoc.setTitle('Krish Dilip Patil - B.Tech CSE Resume');
  pdfDoc.setAuthor('Krish Dilip Patil');
  pdfDoc.setSubject('Resume - Computer Science Engineering & AI/ML');
  pdfDoc.setKeywords(['Krish Patil', 'Resume', 'Computer Science', 'B.Tech CSE', 'AI/ML', 'Full Stack Developer', 'Portfolio']);
  pdfDoc.setCreator('Krish Patil Portfolio System');
  pdfDoc.setProducer('pdf-lib Standard Compliant Generator');

  // Embed standard standard fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const darkNavy = rgb(0.06, 0.12, 0.22);
  const cyanPrimary = rgb(0.03, 0.45, 0.65);
  const textDark = rgb(0.12, 0.16, 0.22);
  const textMuted = rgb(0.35, 0.40, 0.48);
  const lineGray = rgb(0.82, 0.85, 0.89);

  // Page dimensions: US Letter (612 x 792 points)
  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 44;
  const contentWidth = pageWidth - marginX * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 44;

  const checkPageBreak = (neededHeight) => {
    if (y - neededHeight < 45) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - 44;
      return true;
    }
    return false;
  };

  const drawSectionHeader = (title) => {
    checkPageBreak(32);
    y -= 10;
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y: y,
      size: 11,
      font: fontBold,
      color: cyanPrimary,
    });
    y -= 5;
    page.drawLine({
      start: { x: marginX, y: y },
      end: { x: marginX + contentWidth, y: y },
      thickness: 1,
      color: lineGray,
    });
    y -= 12;
  };

  // HEADER
  page.drawText('KRISH DILIP PATIL', {
    x: marginX,
    y: y,
    size: 22,
    font: fontBold,
    color: darkNavy,
  });
  y -= 16;

  page.drawText('B.Tech in Computer Science Engineering (3rd Year) • AI/ML Core Focus', {
    x: marginX,
    y: y,
    size: 10.5,
    font: fontBold,
    color: cyanPrimary,
  });
  y -= 14;

  const contactText = 'Pune, Maharashtra, India  |  krishpatil650@gmail.com  |  github.com/krishpatil96';
  page.drawText(contactText, {
    x: marginX,
    y: y,
    size: 9,
    font: fontRegular,
    color: textMuted,
  });
  y -= 6;

  page.drawLine({
    start: { x: marginX, y: y },
    end: { x: marginX + contentWidth, y: y },
    thickness: 1.5,
    color: cyanPrimary,
  });
  y -= 10;

  // SUMMARY
  drawSectionHeader('Professional Summary');
  const summaryLines = [
    'Third-year B.Tech Computer Science Engineering student at School of Engineering and Technology (SOET),',
    'Pimpri Chinchwad University (PCU) with a 9.3 CGPA. Combines strong foundational computer science principles',
    'with practical expertise in Artificial Intelligence, Machine Learning, and full-stack software development.',
    'Experienced in designing scalable web applications, real-time computer vision models, and deep learning pipelines.',
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: marginX,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: textDark,
    });
    y -= 13;
  }

  // EDUCATION
  drawSectionHeader('Education');
  page.drawText('Pimpri Chinchwad University (PCU) — School of Engineering and Technology (SOET)', {
    x: marginX,
    y: y,
    size: 10,
    font: fontBold,
    color: darkNavy,
  });
  const cgpaText = 'CGPA: 9.3 / 10.0';
  const cgpaWidth = fontBold.widthOfTextAtSize(cgpaText, 10);
  page.drawText(cgpaText, {
    x: marginX + contentWidth - cgpaWidth,
    y: y,
    size: 10,
    font: fontBold,
    color: cyanPrimary,
  });
  y -= 13;

  page.drawText('Bachelor of Technology (B.Tech) in Computer Science Engineering (CSE)', {
    x: marginX,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: textDark,
  });
  const dateText = '2023 – 2027 (Expected)';
  const dateWidth = fontRegular.widthOfTextAtSize(dateText, 9);
  page.drawText(dateText, {
    x: marginX + contentWidth - dateWidth,
    y: y,
    size: 9,
    font: fontRegular,
    color: textMuted,
  });
  y -= 12;

  page.drawText('Core Coursework: Data Structures & Algorithms, AI/ML, DBMS, Operating Systems, Computer Networks', {
    x: marginX,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: textMuted,
  });
  y -= 14;

  // TECHNICAL SKILLS
  drawSectionHeader('Technical Skills');
  const skillsList = [
    { label: 'Programming Languages', val: 'Python, TypeScript, JavaScript, C++, SQL, Java, Bash' },
    { label: 'AI & Machine Learning', val: 'PyTorch, TensorFlow, Scikit-Learn, OpenCV, NLP, LLM API / RAG, Prompt Engineering' },
    { label: 'Full-Stack Development', val: 'React, Node.js, Express, Tailwind CSS, RESTful APIs, WebSockets, HTML5/CSS3' },
    { label: 'Databases & Cloud', val: 'PostgreSQL, MongoDB, Redis, Firebase Firestore, Git, GitHub, Docker, Linux' },
    { label: 'Core Fundamentals', val: 'Data Structures & Algorithms, Object-Oriented Design, System Architecture' },
  ];

  for (const s of skillsList) {
    page.drawText(`${s.label}: `, {
      x: marginX,
      y: y,
      size: 9,
      font: fontBold,
      color: textDark,
    });
    const labelWidth = fontBold.widthOfTextAtSize(`${s.label}: `, 9);
    page.drawText(s.val, {
      x: marginX + labelWidth,
      y: y,
      size: 9,
      font: fontRegular,
      color: textDark,
    });
    y -= 13;
  }

  // KEY PROJECTS
  drawSectionHeader('Key Technical Projects');
  const projects = [
    {
      title: 'AI Smart Traffic Management & Optimization System',
      tech: 'Python, PyTorch, YOLOv8, OpenCV, FastAPI, React',
      bullets: [
        'Designed real-time deep learning computer vision pipeline analyzing multi-camera CCTV feeds for vehicle classification and density mapping.',
        'Developed adaptive signal switching algorithms reducing simulated road intersection congestion by 34%.',
        'Implemented asynchronous REST APIs serving sub-85ms model inference and live telemetry telemetry dashboards.',
      ],
    },
    {
      title: 'Collaborative Real-Time Code Editor & Cloud IDE',
      tech: 'React, TypeScript, Node.js, WebSockets, Redis, Docker',
      bullets: [
        'Built full-stack browser-based collaborative IDE supporting concurrent multi-user editing with operational transform.',
        'Integrated sandboxed remote code execution engine running untrusted programs safely in ephemeral Docker containers.',
        'Architected low-latency synchronization with Redis pub/sub handling multiple active rooms and syntax trees.',
      ],
    },
    {
      title: 'LLM Academic Research Paper Synthesis & RAG Search',
      tech: 'Python, LangChain, ChromaDB, Gemini / OpenAI API, FastAPI',
      bullets: [
        'Built retrieval-augmented generation (RAG) system ingesting research papers, chunking text, and storing vector embeddings.',
        'Enhanced query retrieval relevance by 40% with hybrid keyword-vector search and citation attribution verification.',
        'Created interactive web interface offering real-time streaming answer generation and knowledge graph exploration.',
      ],
    },
    {
      title: 'Distributed In-Memory Key-Value Cache Engine',
      tech: 'C++, Asynchronous I/O, TCP Sockets, Raft Consensus Protocol',
      bullets: [
        'Implemented lightweight, fault-tolerant distributed key-value store modeled on the Raft consensus protocol.',
        'Engineered leader election, persistent write-ahead logging (WAL), and snapshot compaction mechanisms.',
      ],
    },
  ];

  for (const p of projects) {
    checkPageBreak(65);
    page.drawText(p.title, {
      x: marginX,
      y: y,
      size: 9.8,
      font: fontBold,
      color: darkNavy,
    });
    const techWidth = fontRegular.widthOfTextAtSize(`[ ${p.tech} ]`, 8.5);
    page.drawText(`[ ${p.tech} ]`, {
      x: marginX + contentWidth - techWidth,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: cyanPrimary,
    });
    y -= 12;

    for (const b of p.bullets) {
      checkPageBreak(25);
      page.drawText('•', {
        x: marginX + 6,
        y: y,
        size: 9,
        font: fontBold,
        color: cyanPrimary,
      });
      page.drawText(b, {
        x: marginX + 16,
        y: y,
        size: 8.8,
        font: fontRegular,
        color: textDark,
      });
      y -= 12;
    }
    y -= 4;
  }

  // LEADERSHIP & EXPERIENCE
  drawSectionHeader('Leadership & Extracurricular Activities');
  const experiences = [
    {
      role: 'Technical Lead & Core Team Member',
      org: 'Developer Student Club, SOET PCU',
      period: '2024 – Present',
      desc: 'Organized and conducted technical workshops on AI/ML foundations, Git/GitHub, and full-stack web development for 200+ engineering students. Mentored junior peers on hackathon project architecture.',
    },
    {
      role: 'Hackathon Finalist & Project Lead',
      org: 'Smart India Hackathon & University Level Competitions',
      period: '2024',
      desc: 'Led a 4-member engineering team to design and pitch an automated computer-vision quality inspection prototype for smart manufacturing.',
    },
  ];

  for (const exp of experiences) {
    checkPageBreak(40);
    page.drawText(`${exp.role} — ${exp.org}`, {
      x: marginX,
      y: y,
      size: 9.5,
      font: fontBold,
      color: darkNavy,
    });
    const pWidth = fontRegular.widthOfTextAtSize(exp.period, 8.5);
    page.drawText(exp.period, {
      x: marginX + contentWidth - pWidth,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: textMuted,
    });
    y -= 12;
    page.drawText(exp.desc, {
      x: marginX + 8,
      y: y,
      size: 8.8,
      font: fontRegular,
      color: textDark,
    });
    y -= 14;
  }

  // CERTIFICATIONS
  drawSectionHeader('Certifications & Honors');
  const certs = [
    '•  Machine Learning Specialization — DeepLearning.AI / Stanford Online',
    '•  Full-Stack Web Development Professional Certificate — Meta',
    '•  Python for Data Science, AI & Development — IBM',
    '•  Postman API Fundamentals Student Expert Certification',
    '•  Academic Excellence Award for 9.3 CGPA Standing — Pimpri Chinchwad University SOET',
  ];

  for (const c of certs) {
    checkPageBreak(15);
    page.drawText(c, {
      x: marginX,
      y: y,
      size: 8.8,
      font: fontRegular,
      color: textDark,
    });
    y -= 12;
  }

  // Save the PDF bytes
  const pdfBytes = await pdfDoc.save();

  // Write to public/resume/Krish_Patil_Resume.pdf
  fs.writeFileSync(publicResumePath, pdfBytes);
  console.log('Saved to:', publicResumePath, `(${pdfBytes.length} bytes)`);

  // Also write to dist/resume/Krish_Patil_Resume.pdf if dist exists
  if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
    if (!fs.existsSync(distResumeDir)) {
      fs.mkdirSync(distResumeDir, { recursive: true });
    }
    const distResumePath = path.join(distResumeDir, 'Krish_Patil_Resume.pdf');
    fs.writeFileSync(distResumePath, pdfBytes);
    console.log('Saved to dist:', distResumePath);
  }
}

generateResume().catch((err) => {
  console.error('Error generating resume:', err);
  process.exit(1);
});

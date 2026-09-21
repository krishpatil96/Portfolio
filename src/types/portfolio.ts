export interface PersonalInfo {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  degree: string;
  specialization: string;
  college: string;
  university: string;
  currentYear: string;
  cgpa: number | string;
  location: string;
  statusBadge: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  phone: string;
  profileImage?: string;
}

export interface StatItem {
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export type ProjectCategory = 'All' | 'AI/ML' | 'Web Development' | 'Data Science' | 'DSA' | 'Other';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI/ML' | 'Web Development' | 'Data Science' | 'DSA' | 'Other';
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  hasInteractiveDemo?: boolean;
  interactiveType?: 'dsa-sorting' | 'infix-postfix' | 'quiz' | 'chart-preview';
  disclaimer?: string;
  highlightBadge?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Hackathon' | 'Leadership / Workshop' | 'Campus Technical Event';
  description: string;
  highlights: string[];
  associatedProject?: string;
  hasVerificationBadge?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  organization: string;
  date: string;
  iconType: 'trophy' | 'academic' | 'code' | 'python' | 'quiz' | 'award';
  description: string;
  badgeText: string;
}

export interface ResearchInterest {
  title: string;
  subtitle: string;
  description: string;
  status: string;
  topics: string[];
  methodologies: string[];
  exploratoryGoal: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  category: 'Cybersecurity' | 'AI & ML' | 'Cloud & Systems' | 'Full-Stack' | 'Programming';
  hoursOrScope?: string;
  status: 'Verified' | 'Completed';
}

export interface EducationItem {
  institution: string;
  school: string;
  degree: string;
  specialization: string;
  currentYear: string;
  cgpa: string;
  location: string;
  duration: string;
  relevantCoursework: string[];
  achievements: string[];
}

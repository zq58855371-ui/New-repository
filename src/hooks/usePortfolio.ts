import { useState, useEffect, useCallback } from 'react';
import type { PortfolioData } from '@/types';
import { DEFAULT_DATA } from '@/types';

const STORAGE_KEY = 'portfolio-data-v1';

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({ ...DEFAULT_DATA, ...parsed });
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updatePersonalInfo = useCallback((updates: Partial<PortfolioData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates },
    }));
  }, []);

  const updateAbout = useCallback((updates: { content?: string; stats?: Partial<{ years: string; projects: string; articles: string; location: string }> }) => {
    setData(prev => ({
      ...prev,
      about: { 
        ...prev.about, 
        ...updates,
        stats: updates.stats ? { ...prev.about.stats, ...updates.stats } : prev.about.stats
      },
    }));
  }, []);

  const updateTimeline = useCallback((timeline: PortfolioData['timeline']) => {
    setData(prev => ({ ...prev, timeline }));
  }, []);

  const addTimelineItem = useCallback((item: Omit<PortfolioData['timeline'][0], 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setData(prev => ({ ...prev, timeline: [newItem, ...prev.timeline] }));
  }, []);

  const updateTimelineItem = useCallback((id: string, updates: Partial<PortfolioData['timeline'][0]>) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const deleteTimelineItem = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.filter(item => item.id !== id),
    }));
  }, []);

  const updateSkills = useCallback((skills: PortfolioData['skills']) => {
    setData(prev => ({ ...prev, skills }));
  }, []);

  const addSkill = useCallback((skill: Omit<PortfolioData['skills'][0], 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<PortfolioData['skills'][0]>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  }, []);

  const updateMilestones = useCallback((milestones: PortfolioData['milestones']) => {
    setData(prev => ({ ...prev, milestones }));
  }, []);

  const addMilestone = useCallback((milestone: Omit<PortfolioData['milestones'][0], 'id'>) => {
    const newMilestone = { ...milestone, id: Date.now().toString() };
    setData(prev => ({ ...prev, milestones: [...prev.milestones, newMilestone] }));
  }, []);

  const updateMilestone = useCallback((id: string, updates: Partial<PortfolioData['milestones'][0]>) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(milestone =>
        milestone.id === id ? { ...milestone, ...updates } : milestone
      ),
    }));
  }, []);

  const deleteMilestone = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(milestone => milestone.id !== id),
    }));
  }, []);

  const addPhoto = useCallback((photo: { url: string; caption: string }) => {
    const newPhoto = { ...photo, id: Date.now().toString(), date: new Date().toLocaleDateString('zh-CN') };
    setData(prev => ({ ...prev, photos: [newPhoto, ...prev.photos] }));
  }, []);

  const deletePhoto = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== id),
    }));
  }, []);

  const updatePhoto = useCallback((id: string, updates: Partial<PortfolioData['photos'][0]>) => {
    setData(prev => ({
      ...prev,
      photos: prev.photos.map(photo =>
        photo.id === id ? { ...photo, ...updates } : photo
      ),
    }));
  }, []);

  const addImportantMoment = useCallback((moment: Omit<PortfolioData['importantMoments'][0], 'id'>) => {
    const newMoment = { ...moment, id: Date.now().toString() };
    setData(prev => ({ ...prev, importantMoments: [newMoment, ...prev.importantMoments] }));
  }, []);

  const updateImportantMoment = useCallback((id: string, updates: Partial<PortfolioData['importantMoments'][0]>) => {
    setData(prev => ({
      ...prev,
      importantMoments: prev.importantMoments.map(moment =>
        moment.id === id ? { ...moment, ...updates } : moment
      ),
    }));
  }, []);

  const deleteImportantMoment = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      importantMoments: prev.importantMoments.filter(moment => moment.id !== id),
    }));
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setData({ ...DEFAULT_DATA, ...parsed });
      return true;
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  }, []);

  const resetData = useCallback(() => {
    if (confirm('确定要重置所有数据吗？此操作不可恢复。')) {
      setData(DEFAULT_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    data,
    isLoaded,
    isEditMode,
    setIsEditMode,
    updatePersonalInfo,
    updateAbout,
    updateTimeline,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    updateSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    updateMilestones,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    addPhoto,
    deletePhoto,
    updatePhoto,
    addImportantMoment,
    updateImportantMoment,
    deleteImportantMoment,
    exportData,
    importData,
    resetData,
  };
}

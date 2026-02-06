import { useState, useEffect } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Timeline from './sections/Timeline';
import Skills from './sections/Skills';
import PhotoGallery from './sections/PhotoGallery';
import ImportantMoments from './sections/ImportantMoments';
import Contact from './sections/Contact';
import { EditButton } from './components/EditButton';
import { usePortfolio } from './hooks/usePortfolio';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  // 新增：用于判断是否拥有管理员权限的内部状态
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  const {
    data,
    isLoaded: isDataLoaded,
    isEditMode,
    setIsEditMode,
    updatePersonalInfo,
    updateAbout,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    addSkill,
    updateSkill,
    deleteSkill,
    addPhoto,
    deletePhoto,
    updatePhoto,
    addImportantMoment,
    updateImportantMoment,
    deleteImportantMoment,
    exportData,
    importData,
    resetData,
  } = usePortfolio();

  useEffect(() => {
    if (isDataLoaded) {
      setIsLoaded(true);
    }
    
    // --- 权限控制逻辑开始 ---
    // 检查 URL 参数中是否有 admin=你的暗号
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '888') { // '888' 可以改成你自定义的任何暗号
      setHasAdminAccess(true);
    } else {
      // 如果没有暗号，强制关闭编辑模式
      setHasAdminAccess(false);
      setIsEditMode(false);
    }
    // --- 权限控制逻辑结束 ---
  }, [isDataLoaded, setIsEditMode]);

  return (
    <div className={`min-h-screen bg-background transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      
      <main>
        <Hero
          personalInfo={data.personalInfo}
          isEditMode={isEditMode}
          onUpdate={updatePersonalInfo}
        />
        
        <About
          about={data.about}
          isEditMode={isEditMode}
          onUpdate={updateAbout}
        />
        
        <Timeline
          timeline={data.timeline}
          isEditMode={isEditMode}
          onAdd={addTimelineItem}
          onEdit={updateTimelineItem}
          onDelete={deleteTimelineItem}
        />
        
        <Skills
          skills={data.skills}
          isEditMode={isEditMode}
          onAdd={addSkill}
          onUpdate={updateSkill}
          onDelete={deleteSkill}
        />
        
        <PhotoGallery
          photos={data.photos}
          isEditMode={isEditMode}
          onAdd={addPhoto}
          onDelete={deletePhoto}
          onUpdate={updatePhoto}
        />
        
        <ImportantMoments
          moments={data.importantMoments}
          isEditMode={isEditMode}
          onAdd={addImportantMoment}
          onUpdate={updateImportantMoment}
          onDelete={deleteImportantMoment}
        />
        
        <Contact
          personalInfo={data.personalInfo}
          isEditMode={isEditMode}
          onUpdate={updatePersonalInfo}
        />
      </main>

      {/* 只有拥有管理权限时，才渲染编辑按钮 */}
      {hasAdminAccess && (
        <EditButton
          isEditMode={isEditMode}
          onToggle={() => setIsEditMode(!isEditMode)}
          onExport={exportData}
          onImport={importData}
          onReset={resetData}
        />
      )}

      {/* 只有拥有管理权限且开启了编辑模式时，才显示提示框 */}
      {hasAdminAccess && isEditMode && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="glass rounded-xl px-4 py-3 text-sm text-muted-foreground">
            <span className="text-primary font-medium">管理员模式已开启</span>
            <br />
            点击内容即可编辑
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
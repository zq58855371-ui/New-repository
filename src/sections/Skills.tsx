import { useEffect, useRef, useState } from 'react';
import { Plus, X, Edit2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Skill } from '@/types';

interface SkillsProps {
  skills: Skill[];
  isEditMode: boolean;
  onAdd: (skill: Omit<Skill, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

const CATEGORIES = ['造价技能', '项目管理', '其他技能', '专业技能', '软件应用'];

export default function Skills({ skills, isEditMode, onAdd, onUpdate, onDelete }: SkillsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: '前端开发',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({ name: '', level: 50, category: '前端开发' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, level: skill.level, category: skill.category });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    
    if (editingSkill) {
      onUpdate(editingSkill.id, formData);
    } else {
      onAdd(formData);
    }
    setIsDialogOpen(false);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            专业技能
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            不断学习，持续成长。以下是我目前掌握的核心技能
          </p>
        </div>

        {isEditMode && (
          <div className="flex justify-center mb-8">
            <Button onClick={handleOpenAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              添加技能
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <div
              key={category}
              className={`glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">
                    {categoryIndex + 1}
                  </span>
                </span>
                {category}
              </h3>

              <div className="space-y-5">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="group relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground font-medium">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-primary font-semibold">
                          {skill.level}%
                        </span>
                        {isEditMode && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => handleOpenEdit(skill)}
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-red-500"
                              onClick={() => onDelete(skill.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? '编辑技能' : '添加技能'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">技能名称</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如：React"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">分类</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-xl border-white/10">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                熟练度: {formData.level}%
              </label>
              <Slider
                value={[formData.level]}
                onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                max={100}
                step={5}
                className="py-2"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                保存
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="ghost">
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

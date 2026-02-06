import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Plus, X, Edit2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import type { TimelineItem } from '@/types';

interface TimelineProps {
  timeline: TimelineItem[];
  isEditMode: boolean;
  onAdd: (item: Omit<TimelineItem, 'id'>) => void;
  onEdit: (id: string, updates: Partial<TimelineItem>) => void;
  onDelete: (id: string) => void;
}

export default function Timeline({ timeline, isEditMode, onAdd, onEdit, onDelete }: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [formData, setFormData] = useState({
    type: 'work' as 'work' | 'education',
    title: '',
    organization: '',
    location: '',
    period: '',
    description: [''],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      type: 'work',
      title: '',
      organization: '',
      location: '',
      period: '',
      description: [''],
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: TimelineItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      organization: item.organization,
      location: item.location,
      period: item.period,
      description: [...item.description],
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const cleanedData = {
      ...formData,
      description: formData.description.filter(d => d.trim() !== ''),
    };
    
    if (editingItem) {
      onEdit(editingItem.id, cleanedData);
    } else {
      onAdd(cleanedData);
    }
    setIsDialogOpen(false);
  };

  const handleAddDescription = () => {
    setFormData({ ...formData, description: [...formData.description, ''] });
  };

  const handleUpdateDescription = (index: number, value: string) => {
    setFormData({
      ...formData,
      description: formData.description.map((d, i) => (i === index ? value : d)),
    });
  };

  const handleRemoveDescription = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            经历时间线
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {isEditMode && (
          <div className="flex justify-center mb-8">
            <Button onClick={handleOpenAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              添加经历
            </Button>
          </div>
        )}

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.id}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}>
                    <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group relative">
                      {isEditMode && (
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleOpenEdit(item)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500"
                            onClick={() => onDelete(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      <div className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {item.type === 'work' ? (
                            <Briefcase className="w-5 h-5 text-primary" />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <span className="text-sm text-primary font-medium">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {item.organization} · {item.location}
                      </p>

                      <ul className={`space-y-2 ${
                        index % 2 === 0 ? 'md:text-right' : ''
                      }`}>
                        {item.description.map((desc, descIndex) => (
                          <li
                            key={descIndex}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                            style={{ flexDirection: index % 2 === 0 ? 'row-reverse' : 'row' }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30" />

                  <div className="hidden md:block flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? '编辑经历' : '添加经历'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">类型</label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as 'work' | 'education' })}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-xl border-white/10">
                  <SelectItem value="work">工作</SelectItem>
                  <SelectItem value="education">教育</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">职位/学位</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如：高级前端工程师"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">公司/学校</label>
                <Input
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="例如：科技创新有限公司"
                  className="bg-white/10 border-white/20"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">地点</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="例如：上海"
                  className="bg-white/10 border-white/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">时间段</label>
              <Input
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="例如：2021 - 至今"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">描述</label>
              <div className="space-y-2">
                {formData.description.map((desc, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={desc}
                      onChange={(e) => handleUpdateDescription(index, e.target.value)}
                      placeholder="添加描述..."
                      className="flex-1 bg-white/10 border-white/20"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveDescription(index)}
                      className="h-10 w-8 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddDescription} variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  添加描述
                </Button>
              </div>
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

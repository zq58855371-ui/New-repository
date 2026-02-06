import { useState } from 'react';
import { Plus, X, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ImportantMoment } from '@/types';

const CATEGORIES = [
  { value: 'career', label: '职业发展', color: 'bg-blue-500' },
  { value: 'life', label: '生活点滴', color: 'bg-green-500' },
  { value: 'travel', label: '旅行足迹', color: 'bg-amber-500' },
  { value: 'family', label: '家庭时光', color: 'bg-pink-500' },
  { value: 'other', label: '其他', color: 'bg-gray-500' },
];

interface MomentEditorProps {
  moments: ImportantMoment[];
  isEditMode: boolean;
  onAdd: (moment: Omit<ImportantMoment, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<ImportantMoment>) => void;
  onDelete: (id: string) => void;
}

export function MomentEditor({ moments, isEditMode, onAdd, onUpdate, onDelete }: MomentEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<ImportantMoment | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'life' as ImportantMoment['category'],
    photos: [] as string[],
  });
  const [photoUrl, setPhotoUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingMoment(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'life',
      photos: [],
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (moment: ImportantMoment) => {
    setEditingMoment(moment);
    setFormData({
      title: moment.title,
      description: moment.description,
      date: moment.date,
      category: moment.category,
      photos: moment.photos || [],
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;
    
    if (editingMoment) {
      onUpdate(editingMoment.id, formData);
    } else {
      onAdd(formData);
    }
    setIsDialogOpen(false);
  };

  const handleAddPhoto = () => {
    if (photoUrl.trim()) {
      setFormData({ ...formData, photos: [...formData.photos, photoUrl.trim()] });
      setPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  const getCategoryColor = (category: string) => {
    return CATEGORIES.find(c => c.value === category)?.color || 'bg-gray-500';
  };

  const getCategoryLabel = (category: string) => {
    return CATEGORIES.find(c => c.value === category)?.label || '其他';
  };

  return (
    <div className="space-y-6">
      {/* Moments Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {moments.map((moment) => (
          <div
            key={moment.id}
            className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs text-white ${getCategoryColor(moment.category)}`}>
                  {getCategoryLabel(moment.category)}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {moment.date}
                </span>
              </div>
              {isEditMode && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleOpenEdit(moment)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-500"
                    onClick={() => onDelete(moment.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">{moment.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {moment.description}
            </p>

            {moment.photos && moment.photos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {moment.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${moment.title} - ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {isEditMode && (
          <button
            onClick={handleOpenAdd}
            className="glass rounded-2xl p-6 border-2 border-dashed border-white/20 hover:border-primary/50 flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors min-h-[200px]"
          >
            <Plus className="w-10 h-10 mb-3" />
            <span className="text-lg font-medium">添加重要时刻</span>
          </button>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMoment ? '编辑重要时刻' : '添加重要时刻'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">标题</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="请输入标题..."
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">日期</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-white/10 border-white/20"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">分类</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as ImportantMoment['category'] })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-xl border-white/10">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">描述</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="请输入描述..."
                rows={4}
                className="bg-white/10 border-white/20 resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">照片链接</label>
              <div className="flex gap-2">
                <Input
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="输入图片URL..."
                  className="bg-white/10 border-white/20 flex-1"
                />
                <Button onClick={handleAddPhoto} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                {editingMoment ? '保存修改' : '添加时刻'}
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="ghost">
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

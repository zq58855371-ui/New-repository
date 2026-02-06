import { useEffect, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Photo } from '@/types';

interface PhotoGalleryProps {
  photos: Photo[];
  isEditMode: boolean;
  onAdd: (photo: { url: string; caption: string }) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Photo>) => void;
}

export default function PhotoGallery({ photos, isEditMode, onAdd, onDelete, onUpdate }: PhotoGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      onAdd({ url: previewUrl, caption });
      setIsDialogOpen(false);
      setPreviewUrl('');
      setCaption('');
    }
  };

  return (
    <section
      id="photos"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Photo Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            照片墙
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            记录生活中的美好瞬间，每一张照片都是一段珍贵的回忆
          </p>
        </div>

        {photos.length === 0 && !isEditMode ? (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">暂无照片，编辑模式下可添加</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`group relative aspect-square rounded-xl overflow-hidden bg-white/5 transition-all duration-700 hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {isEditMode ? (
                      <Input
                        value={photo.caption}
                        onChange={(e) => onUpdate(photo.id, { caption: e.target.value })}
                        className="bg-black/50 border-white/20 text-white text-sm"
                        placeholder="添加描述..."
                      />
                    ) : (
                      <p className="text-white text-sm">{photo.caption || '无描述'}</p>
                    )}
                    <p className="text-white/60 text-xs mt-1">{photo.date}</p>
                  </div>
                </div>
                {isEditMode && (
                  <button
                    onClick={() => onDelete(photo.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            {isEditMode && (
              <button
                onClick={() => setIsDialogOpen(true)}
                className="aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm">添加照片</span>
              </button>
            )}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle>添加照片</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div
              className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">点击选择图片</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="添加照片描述..."
              className="bg-white/10 border-white/20"
            />

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!previewUrl} className="flex-1">
                添加
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

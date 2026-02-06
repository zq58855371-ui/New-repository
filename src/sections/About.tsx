import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Coffee, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AboutProps {
  about: {
    content: string;
    stats: {
      years: string;
      projects: string;
      articles: string;
      location: string;
    };
  };
  isEditMode: boolean;
  onUpdate: (updates: { content?: string; stats?: Partial<{ years: string; projects: string; articles: string; location: string }> }) => void;
}

const statIcons = [
  { key: 'years', icon: Calendar, label: '年工作经验' },
  { key: 'projects', icon: Coffee, label: '完成项目' },
  { key: 'articles', icon: BookOpen, label: '专业文章' },
  { key: 'location', icon: MapPin, label: '所在城市' },
];

export default function About({ about, isEditMode, onUpdate }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ── 新增：头像相关状态 ──
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // 清理预览URL，防止内存泄漏
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    // 可选：限制大小，例如 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小请控制在 5MB 以内');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    // 如果将来要真正保存，可以在这里调用 onUpdate 或上传 API
    // 例如：onUpdate({ avatarFile: file })  // 但目前 props 没这个字段
  };

  const paragraphs = about.content.split('\n\n').filter(p => p.trim());

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            关于我
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 左边照片区域 ── 修复后的部分 */}
<div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
  <div className="relative">
    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-amber-600/10 border border-white/10">
      <div className="w-full h-full flex items-center justify-center relative group">
        {/* 1. 只有在 isEditMode 为 true 时才指向 input 的 id，否则设为 undefined 禁用 label 触发 */}
        <label
          htmlFor={isEditMode ? "avatar-upload" : undefined}
          className={`${isEditMode ? 'cursor-pointer hover:border-primary' : 'cursor-default'} block w-32 h-32 rounded-full overflow-hidden border-4 border-primary/40 transition-all duration-300 shadow-lg`}
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="个人照片"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-amber-900/20 flex items-center justify-center">
              <span className="text-6xl font-light text-primary">
                {about.stats.location.charAt(0) || '南'}
              </span>
            </div>
          )}
        </label>

        {/* 2. 只有在编辑模式下才渲染 input */}
        {isEditMode && (
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        )}

        {/* 3. 悬浮提示：只有在编辑模式下才显示 */}
        {isEditMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-white text-sm font-medium pointer-events-none">
            点击上传照片
          </div>
        )}
      </div>

      {/* 原有小装饰保持不变 */}
      <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30 rounded-xl" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-xl -z-10" />
    </div>
  </div>
</div>

          {/* 右边文字部分保持不变 */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              用热情与专业，
              <br />
              <span className="text-primary">创造无限可能</span>
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              {isEditMode ? (
                <textarea
                  value={about.content}
                  onChange={(e) => onUpdate({ content: e.target.value })}
                  className="w-full bg-white/10 border-white/20 text-foreground rounded-lg p-4 min-h-[200px]"
                />
              ) : (
                paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statIcons.map((stat, index) => {
                const Icon = stat.icon;
                const value = about.stats[stat.key as keyof typeof about.stats];
                return (
                  <div
                    key={stat.key}
                    className={`text-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    {isEditMode ? (
                      <Input
                        value={value}
                        onChange={(e) => onUpdate({
                          stats: { ...about.stats, [stat.key]: e.target.value }
                        })}
                        className="bg-white/10 border-white/20 text-foreground text-center text-lg font-bold mb-1"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {value}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
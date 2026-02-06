import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ImageUpload';
import { EditableText } from '@/components/EditableField';
import type { PersonalInfo } from '@/types';

interface HeroProps {
  personalInfo: PersonalInfo;
  isEditMode: boolean;
  onUpdate: (updates: Partial<PersonalInfo>) => void;
}

export default function Hero({ personalInfo, isEditMode, onUpdate }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || isEditMode) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el, index) => {
        const factor = (index + 1) * 0.5;
        (el as HTMLElement).style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEditMode]);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="parallax absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="parallax absolute top-1/2 right-1/3 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Avatar */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 glow mx-auto">
              <ImageUpload
                currentImage={personalInfo.avatar}
                onUpload={(url) => onUpdate({ avatar: url })}
                isEditMode={isEditMode}
                className="w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background" />
          </div>
        </div>

        {/* Name, Title, etc... */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <EditableText
            value={personalInfo.name}
            onSave={(value) => onUpdate({ name: value })}
            isEditMode={isEditMode}
            className="text-foreground"
          />
        </h1>

        <p className="text-xl md:text-2xl text-primary font-medium mb-2 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <EditableText
            value={personalInfo.title}
            onSave={(value) => onUpdate({ title: value })}
            isEditMode={isEditMode}
          />
        </p>

        <p className="text-lg text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <EditableText
            value={personalInfo.subtitle}
            onSave={(value) => onUpdate({ subtitle: value })}
            isEditMode={isEditMode}
          />
        </p>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <EditableText
            value={personalInfo.description}
            onSave={(value) => onUpdate({ description: value })}
            isEditMode={isEditMode}
            multiline
          />
        </p>

        {/* CTA Buttons */}
        {!isEditMode && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '1s' }}>
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
            >
              了解更多
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-white/20 hover:bg-white/5 px-8 py-6 text-base rounded-full transition-all duration-300"
            >
              联系我
            </Button>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {!isEditMode && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-muted-foreground" size={24} />
        </div>
      )}
    </section>
  );
}
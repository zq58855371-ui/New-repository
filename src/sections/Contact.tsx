import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { PersonalInfo } from '@/types';

interface ContactProps {
  personalInfo: PersonalInfo;
  isEditMode: boolean;
  onUpdate: (updates: Partial<PersonalInfo>) => void;
}

export default function Contact({ personalInfo, isEditMode, onUpdate }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    { key: 'email', label: '邮箱', value: personalInfo.email, icon: Mail },
    // 微信数据路径指向 social.wechat
    { key: 'wechat', label: '微信', value: personalInfo.social?.wechat || '', icon: MessageCircle },
    { key: 'phone', label: '电话', value: personalInfo.phone, icon: Phone },
    // 地址数据路径指向 location
    { key: 'location', label: '地址', value: personalInfo.location, icon: MapPin },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            联系我
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            我始终保持开放的心态，期待与志同道合的朋友交流。
            <br className="hidden md:block" />
            无论是技术探讨、项目合作，都很乐意分享我的经验和见解。
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {contactInfo.map((item) => (
            <div
              key={item.key}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
              {isEditMode ? (
                <Input
                  value={item.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (item.key === 'wechat') {
                      // 核心修复：更新嵌套的 social 对象
                      onUpdate({
                        social: {
                          ...personalInfo.social,
                          wechat: val
                        }
                      });
                    } else if (item.key === 'location') {
                      // 确保地址字段也正确更新
                      onUpdate({ location: val });
                    } else {
                      // 邮箱和电话是根级字段
                      onUpdate({ [item.key]: val });
                    }
                  }}
                  className="bg-white/10 border-white/20 text-center text-white"
                />
              ) : (
                <p className="text-white font-medium text-lg break-all px-2">
                  {item.value || '未设置'}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
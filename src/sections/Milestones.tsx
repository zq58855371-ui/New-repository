import { useEffect, useRef, useState } from 'react';
import { 
  Trophy, 
  Rocket, 
  Heart, 
  Globe, 
  Star,
  Zap,
  Users,
  Target
} from 'lucide-react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    year: '2024',
    title: '技术峰会演讲',
    description: '受邀在年度前端技术大会上分享微前端架构实践经验',
    icon: Trophy,
  },
  {
    year: '2023',
    title: '开源项目突破',
    description: '开源的UI组件库获得5000+ GitHub Stars，被众多开发者使用',
    icon: Rocket,
  },
  {
    year: '2022',
    title: '团队领导角色',
    description: '晋升为技术团队负责人，带领10人团队完成多个重要项目',
    icon: Users,
  },
  {
    year: '2021',
    title: '创业尝试',
    description: '与伙伴共同创立技术咨询公司，服务超过20家企业客户',
    icon: Target,
  },
  {
    year: '2020',
    title: '技术博客突破',
    description: '个人技术博客月访问量突破10万，成为知名技术博主',
    icon: Star,
  },
  {
    year: '2019',
    title: '环游世界',
    description: '完成为期3个月的环球旅行，到访15个国家，开阔视野',
    icon: Globe,
  },
  {
    year: '2018',
    title: '马拉松完赛',
    description: '完成人生第一个全程马拉松，挑战自我极限',
    icon: Heart,
  },
  {
    year: '2016',
    title: '职业生涯起步',
    description: '从浙江大学毕业后，正式开启程序员职业生涯',
    icon: Zap,
  },
];

export default function Milestones() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="milestones"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Milestones
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            人生里程碑
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            每一个里程碑都是成长的印记，记录着我人生中的重要时刻与突破
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="glass rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                {/* Year Badge */}
                <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {milestone.year}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <milestone.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <blockquote className="relative inline-block">
            <span className="absolute -top-4 -left-6 text-6xl text-primary/20 font-serif">"</span>
            <p className="text-xl md:text-2xl text-foreground italic font-light max-w-3xl mx-auto px-8">
              人生不是一场赛跑，而是一段旅程。
              <br />
              <span className="text-primary">重要的不是目的地，而是沿途的风景。</span>
            </p>
            <span className="absolute -bottom-8 -right-6 text-6xl text-primary/20 font-serif">"</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

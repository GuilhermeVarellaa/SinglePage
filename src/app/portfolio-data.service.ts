import { Injectable } from '@angular/core';
import { Observable, delay, map, of, shareReplay, switchMap, timer } from 'rxjs';

export interface HeroContent {
  name: string;
  shortName: string;
  headline: string;
  description: string;
  resumeUrl: string;
}

export interface SkillBadge {
  label: string;
  level: 'Advanced' | 'Intermediate' | 'Learning';
  highlights: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  organisation: string;
  description: string;
  stack: string[];
}

export interface ProjectShowcase {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private readonly heroData: HeroContent = {
    name: 'Guilherme Raul Varella da Silva',
    shortName: 'Guilherme Varella',
    headline: 'Angular Front-end Engineer',
    description:
      'Crio experiências digitais acessíveis, performáticas e escaláveis com foco em Angular, RxJS e boas práticas.',
    resumeUrl: 'https://www.linkedin.com/in/guilherme-varella/'
  };

  private readonly rotatingRoles = [
    'Desenvolvedor Angular',
    'Entusiasta de RxJS',
    'Especialista em UI/UX',
    'Criador de Design Systems',
    'Integrador de APIs Rest'
  ];

  private readonly skills: SkillBadge[] = [
    {
      label: 'Angular',
      level: 'Advanced',
      highlights: [
        'Componentização inteligente com Change Detection otimizado',
        'Formulários reativos, interceptors e roteamento avançado',
        'Criação de bibliotecas compartilháveis e design systems'
      ]
    },
    {
      label: 'RxJS',
      level: 'Advanced',
      highlights: [
        'Arquiteturas reativas, gerenciamento de estados e streams complexos',
        'Uso extenso de Higher-Order Observables, Subjects e multicasting',
        'Padronização de fluxos assíncronos com operadores customizados'
      ]
    },
    {
      label: 'NgRx',
      level: 'Advanced',
      highlights: [
        'Implementação de stores, effects e entity adapters',
        'Criação de facades e selectors memoizados',
        'Integração com REST, WebSocket e caching inteligente'
      ]
    },
    {
      label: 'Node.js & APIs REST',
      level: 'Intermediate',
      highlights: [
        'Desenvolvimento de APIs RESTful com NestJS e Express',
        'Integração com bancos de dados SQL e NoSQL',
        'Automação de pipelines CI/CD e testes de integração'
      ]
    },
    {
      label: 'HTML • CSS • TypeScript',
      level: 'Advanced',
      highlights: [
        'Acessibilidade (WCAG), semântica e internacionalização',
        'Layouts responsivos com CSS moderno (Grid/Flexbox)',
        'Padrões SOLID e clean code em TypeScript'
      ]
    }
  ];

  private readonly timeline: TimelineItem[] = [
    {
      period: '2022 — Atual',
      title: 'Frontend Engineer Pleno',
      organisation: 'Projetos Financeiros & Banking',
      description:
        'Liderança técnica em aplicações financeiras com foco em usabilidade, escalabilidade e monitoramento contínuo.',
      stack: ['Angular', 'NgRx', 'NX', 'Storybook', 'Jest']
    },
    {
      period: '2020 — 2022',
      title: 'Frontend Developer',
      organisation: 'Tecnologia em Meios de Pagamento',
      description:
        'Construção de módulos SPA integrados via micro frontends, evolução de design systems e integrações complexas com APIs.',
      stack: ['Angular', 'RxJS', 'Micro Frontends', 'Node.js']
    },
    {
      period: '2018 — 2020',
      title: 'Fullstack Developer',
      organisation: 'Consultoria de Software',
      description:
        'Atuação em soluções web completas, do backend Node.js ao front Angular, priorizando performance e DX.',
      stack: ['Node.js', 'NestJS', 'PostgreSQL', 'Angular']
    }
  ];

  private readonly projects: ProjectShowcase[] = [
    {
      name: 'Orquestrador de Componentes Financeiros',
      description:
        'Biblioteca Angular compartilhada para consolidar widgets bancários, garantindo consistência visual e telemetria centralizada.',
      tags: ['Angular Library', 'Nx Workspace', 'Storybook', 'Telemetry'],
      github: 'https://github.com/guilhermeyvarella',
      live: 'https://storyboard-guilherme-varella.netlify.app'
    },
    {
      name: 'Dashboard Reativa de Investimentos',
      description:
        'SPA responsiva com streams reativas, WebSockets e caching inteligente para métricas de portfólio em tempo real.',
      tags: ['RxJS', 'WebSockets', 'NgRx', 'Angular Material']
    },
    {
      name: 'API Gateway Node.js',
      description:
        'BFF em Node.js/NestJS para consolidar serviços bancários, aplicar segurança e orquestrar integrações REST.',
      tags: ['Node.js', 'NestJS', 'REST', 'OpenAPI'],
      github: 'https://github.com/guilhermeyvarella'
    }
  ];

  hero$(): Observable<HeroContent> {
    return of(this.heroData).pipe(delay(200));
  }

  rotatingRole$(): Observable<string> {
    return of(this.rotatingRoles).pipe(
      map((roles) => roles.filter(Boolean)),
      switchMap((roles) =>
        timer(0, 2800).pipe(map((tick) => roles[tick % roles.length]))
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  skills$(): Observable<SkillBadge[]> {
    return of(this.skills).pipe(delay(200));
  }

  timeline$(): Observable<TimelineItem[]> {
    return of(this.timeline).pipe(delay(300));
  }

  projects$(): Observable<ProjectShowcase[]> {
    return of(this.projects).pipe(delay(300));
  }
}

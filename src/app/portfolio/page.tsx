"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProjectCategory =
  | "Web Development"
  | "Mobile App"
  | "Cloud Solutions"
  | "UI/UX Design"
  | "Full Stack";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  links: {
    live?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Scalable online store with real-time inventory and payment integration",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    category: "Full Stack",
    links: {
      live: "https://demo-ecommerce.example.com",
      github: "https://github.com/company/ecommerce-platform",
    },
  },
  {
    id: "fitness-tracker-app",
    title: "Fitness Tracker Mobile App",
    description:
      "Cross-platform mobile app for tracking workouts and nutrition",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    category: "Mobile App",
    links: {
      github: "https://github.com/company/fitness-tracker",
    },
  },
  {
    id: "cloud-migration-tool",
    title: "Cloud Migration Tool",
    description:
      "Automated tool for migrating legacy systems to Google Cloud Platform",
    technologies: ["Python", "GCP", "Docker", "Kubernetes", "Terraform"],
    category: "Cloud Solutions",
    links: {
      live: "https://migration-demo.example.com",
    },
  },
  {
    id: "design-system",
    title: "Enterprise Design System",
    description:
      "Comprehensive design system with reusable components and documentation",
    technologies: ["React", "Storybook", "Figma", "TypeScript", "CSS Modules"],
    category: "UI/UX Design",
    links: {
      live: "https://storybook.example.com",
      github: "https://github.com/company/design-system",
    },
  },
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description:
      "Real-time analytics dashboard with custom reporting and data visualization",
    technologies: ["Next.js", "D3.js", "PostgreSQL", "Redis", "Tailwind CSS"],
    category: "Web Development",
    links: {
      live: "https://dashboard-demo.example.com",
    },
  },
  {
    id: "ai-chatbot",
    title: "AI Customer Service Chatbot",
    description:
      "Intelligent chatbot powered by machine learning for automated support",
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "WebSocket"],
    category: "Full Stack",
    links: {
      github: "https://github.com/company/ai-chatbot",
    },
  },
];

const categories = [
  "All",
  "Web Development",
  "Mobile App",
  "Cloud Solutions",
  "UI/UX Design",
  "Full Stack",
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Gradient Placeholder */}
      <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <span className="text-6xl font-bold text-primary/30">
          {project.title[0]}
        </span>
      </div>

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Technologies */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="text-sm text-muted-foreground">{project.category}</div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {project.links.live && (
          <Button asChild className="flex-1">
            <Link href={project.links.live} target="_blank">
              View Live
            </Link>
          </Button>
        )}
        {project.links.github && (
          <Button asChild variant="outline" className="flex-1">
            <Link href={project.links.github} target="_blank">
              GitHub
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold">Our Portfolio</h1>
          <p className="text-xl text-muted-foreground">
            Explore our latest projects and see how we help businesses succeed
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b bg-background px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Let&apos;s work together to bring your vision to life
          </p>
          <Button asChild size="lg">
            <Link href="/contact-us">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

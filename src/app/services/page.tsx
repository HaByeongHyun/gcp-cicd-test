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

const services = [
  {
    title: "Web Development",
    description:
      "Build modern, responsive websites that engage your audience and drive results.",
    features: [
      "Custom website design",
      "Responsive layouts",
      "Performance optimization",
      "SEO-friendly structure",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Create powerful mobile applications for iOS and Android platforms.",
    features: [
      "Native & cross-platform apps",
      "User-friendly interfaces",
      "App store deployment",
      "Ongoing maintenance",
    ],
  },
  {
    title: "Cloud Solutions",
    description:
      "Leverage cloud technology to scale your business efficiently and securely.",
    features: [
      "Cloud migration",
      "Infrastructure setup",
      "Security implementation",
      "24/7 monitoring",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Grow your online presence with data-driven marketing strategies.",
    features: [
      "Social media marketing",
      "Content creation",
      "SEO optimization",
      "Analytics & reporting",
    ],
  },
  {
    title: "UI/UX Design",
    description:
      "Design beautiful, intuitive interfaces that users love to interact with.",
    features: [
      "User research",
      "Wireframing & prototyping",
      "Visual design",
      "Usability testing",
    ],
  },
  {
    title: "Consulting",
    description:
      "Get expert advice to make informed decisions about your technology strategy.",
    features: [
      "Technology assessment",
      "Strategic planning",
      "Process optimization",
      "Team training",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive solutions tailored to meet your business needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="mr-2 text-primary">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/contact-us">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Need a Custom Solution?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            We can create a tailored package that perfectly fits your business
            requirements
          </p>
          <Button asChild size="lg">
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

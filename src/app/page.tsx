import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[600px] items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 px-4">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
            Welcome to MyCompany
          </h1>
          <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
            We provide professional services to help your business grow and
            succeed in the digital age
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact-us">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Why Choose Us
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quality Service</CardTitle>
                <CardDescription>
                  We deliver top-notch quality in everything we do
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our team of experts ensures that every project meets the
                  highest standards of excellence and professionalism.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expert Team</CardTitle>
                <CardDescription>
                  Work with industry-leading professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our experienced team brings years of expertise to help you
                  achieve your business goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  We&apos;re here whenever you need us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Round-the-clock support ensures your business never stops
                  running smoothly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Join hundreds of satisfied clients and take your business to the
            next level
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact-us">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

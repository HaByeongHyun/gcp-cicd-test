import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold">About Us</h1>
          <p className="text-xl text-muted-foreground">
            Learn more about our mission, vision, and the team behind our
            success
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="mb-6 text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We are dedicated to providing exceptional services that empower
              businesses to achieve their full potential. Our mission is to
              deliver innovative solutions that drive growth, efficiency, and
              success for our clients.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-4xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              To be the leading provider of professional services, recognized
              for our commitment to excellence, innovation, and customer
              satisfaction. We envision a future where every business has access
              to the tools and expertise they need to thrive.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="mb-12 text-center text-4xl font-bold">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Excellence</CardTitle>
                  <CardDescription>
                    Striving for the highest quality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    We are committed to delivering exceptional results in
                    everything we do, setting new standards of excellence in our
                    industry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Innovation</CardTitle>
                  <CardDescription>
                    Embracing change and new ideas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    We continuously explore new technologies and methodologies
                    to provide cutting-edge solutions for our clients.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integrity</CardTitle>
                  <CardDescription>
                    Operating with honesty and transparency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    We build trust through transparent communication and ethical
                    business practices in all our relationships.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Our Impact
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">500+</div>
              <div className="text-lg text-muted-foreground">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">1000+</div>
              <div className="text-lg text-muted-foreground">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">15+</div>
              <div className="text-lg text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

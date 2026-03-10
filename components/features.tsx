import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Feature One",
    description: "Description of the first feature and its benefits.",
  },
  {
    title: "Feature Two",
    description: "Description of the second feature and its benefits.",
  },
  {
    title: "Feature Three",
    description: "Description of the third feature and its benefits.",
  },
]

export function Features() {
  return (
    <section id="features" className="container py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Features
        </h2>
        <p className="mt-4 text-muted-foreground">
          Highlight the key features of your product or service.
        </p>
      </div>
      
      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

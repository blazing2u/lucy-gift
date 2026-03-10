import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
          Your Main Headline Goes Here
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">
          A brief description of your product or service. Explain the value proposition 
          and why visitors should care about what you offer.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg">
            Primary Action
          </Button>
          <Button variant="outline" size="lg">
            Secondary Action
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Content() {
  return (
    <section id="about" className="container py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Section
          </h2>
          <p className="mt-4 text-muted-foreground">
            Add more details about your product, company, or service here. 
            This is a great place to tell your story and connect with your audience.
          </p>
          <p className="mt-4 text-muted-foreground">
            You can add multiple paragraphs, lists, or any other content that helps
            communicate your message effectively.
          </p>
        </div>
        
        <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">Image / Media Placeholder</span>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"

export default function Features() {
  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">Built for your placement journey</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>• Resume builder with templates and auto-fill</li>
          <li>• Job and internship application tracker</li>
          <li>• Placement rules and eligibility checks</li>
          <li>• Aptitude and coding practice modules</li>
          <li>• Real-time notifications and reminders</li>
        </ul>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-semibold text-blue-600">10k+</div>
              <div className="text-sm text-muted-foreground">Opportunities listed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-semibold text-blue-600">500+</div>
              <div className="text-sm text-muted-foreground">Hiring partners</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl">
        <img
          src="/images/categories.jpg"
          alt="Students collaborating"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>
    </section>
  )
}

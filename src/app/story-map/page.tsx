import { IndiaMap } from "@/components/india-map";

export default function StoryMapPage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">
            The Story Map
          </h1>
          <p className="mt-2 text-ink-light">
            Explore India's crafts by geography — from the whole country down to a single district
          </p>
        </div>
        <IndiaMap />
      </div>
    </div>
  );
}

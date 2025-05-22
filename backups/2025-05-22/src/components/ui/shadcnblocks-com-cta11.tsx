import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Cta11Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url?: string;
    };
    secondary?: {
      text: string;
      url?: string;
    };
  };
}

const Cta11 = ({
  heading = "Ready to Get Started?",
  description = "Join thousands of satisfied customers using our platform to build amazing websites.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/register",
    },
    secondary: {
      text: "Learn More",
      url: "/contact",
    },
  },
}: Cta11Props) => {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-r from-[#2ac37a] via-[#47b49e] to-[#87c44d]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center py-4 md:py-6">
          <h3 className="mb-4 text-2xl font-bold md:text-3xl text-white">
            {heading}
          </h3>
          <p className="mb-8 text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex w-full flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            {buttons?.secondary?.text && buttons?.secondary?.url && (
              <Link href={buttons.secondary.url} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-[#2ac37a] transition-all duration-300 text-base py-6">
                  {buttons.secondary.text}
                </Button>
              </Link>
            )}
            {buttons?.primary?.text && buttons?.primary?.url && (
              <Link href={buttons.primary.url} className="w-full sm:w-auto">
                <Button className="w-full bg-white text-[#2ac37a] hover:bg-white/90 border-none text-base py-6 shadow-lg group">
                  {buttons.primary.text} <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            )}
          </div>
          <div className="mt-6 text-white text-sm opacity-90">
            <p>No credit card required. Start for free and upgrade anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta11 };

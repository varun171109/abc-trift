"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Wire this up to your email provider (Mailchimp, Klaviyo, etc.)
    setSubmitted(true);
  };

  return (
    <section className="bg-ink dark:bg-moss-soft text-bone">
      <div className="container-px py-14 lg:py-20 text-center max-w-xl mx-auto">
        <p className="eyebrow-tag text-xs text-clay-light">Stay In The Loop</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-3">{siteConfig.newsletterHeadline}</h2>
        <p className="mt-3 text-bone/60 text-sm sm:text-base">{siteConfig.newsletterSubtext}</p>

        {submitted ? (
          <p className="mt-8 font-tag text-sm text-clay-light">You're on the list — welcome in.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-bone/30 rounded-tag px-4 py-3 text-sm placeholder:text-bone/40 focus:border-clay-light transition-colors"
            />
            <button type="submit" className="bg-bone text-ink px-6 py-3 text-sm font-medium rounded-tag hover:bg-clay-light hover:text-ink transition-colors">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

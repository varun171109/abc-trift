"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire this up to your form backend (Formspree, an API route, etc.)
    setSubmitted(true);
  };

  return (
    <div className="container-px py-10 lg:py-16">
      <div className="mb-10">
        <p className="eyebrow-tag text-xs text-clay mb-2">Say Hello</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Get in touch</h1>
        <p className="mt-3 text-ink/60 dark:text-bone/60 max-w-md">
          Questions about an order, a lot you missed, or want to sell us your closet? Reach out.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
          {submitted && (
            <div className="bg-sage/15 border border-sage/40 text-sage-dark dark:text-sage-light rounded-tag px-4 py-3 text-sm">
              Thanks — we'll get back to you within 1–2 business days.
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-2">Name</label>
              <input id="name" required className="input-field" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-2">Email</label>
              <input id="email" type="email" required className="input-field" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium block mb-2">Subject</label>
            <input id="subject" className="input-field" placeholder="What's this about?" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium block mb-2">Message</label>
            <textarea id="message" required rows={5} className="input-field resize-none" placeholder="Tell us more…" />
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>

        <div className="space-y-6">
          <div className="bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-6">
            <h2 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50 mb-4">Reach Us Directly</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-ink/45 dark:text-bone/45 text-xs">Email</span>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-clay">{siteConfig.email}</a>
              </li>
              <li>
                <span className="block text-ink/45 dark:text-bone/45 text-xs">Phone</span>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-clay">{siteConfig.phone}</a>
              </li>
              <li>
                <span className="block text-ink/45 dark:text-bone/45 text-xs">Follow</span>
                <div className="flex gap-3 mt-1">
                  {Object.entries(siteConfig.socials).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-clay">
                      {key}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-6">
            <h2 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50 mb-3">Store Location</h2>
            <p className="text-sm text-ink/70 dark:text-bone/70">{siteConfig.address}</p>
            <div className="mt-4 aspect-video rounded-tag bg-sand dark:bg-moss flex items-center justify-center text-xs eyebrow-tag text-ink/40 dark:text-bone/40 border border-dashed border-ink/20 dark:border-bone/20">
              Map Embed Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

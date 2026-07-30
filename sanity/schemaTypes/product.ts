import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Auto-generated from the name — this becomes the product's page link. Click 'Generate' after typing the name.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lot",
      title: "Lot Number",
      type: "string",
      description: "e.g. LOT 014 — shown as the hangtag label on the product card and photo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Outerwear", "Tops", "Bottoms", "Dresses", "Denim", "Accessories"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: { list: ["XS", "S", "M", "L", "XL"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "condition",
      title: "Condition",
      type: "string",
      options: { list: ["Like New", "Excellent", "Good", "Fair"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Retail Price (₹)",
      type: "number",
      description: "Optional — shown crossed out next to the price.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "isNew",
      title: "Mark as New Arrival",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Show in Featured Finds",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Turn off once this piece sells — it will be hidden from the shop.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "lot", media: "images.0" },
  },
});

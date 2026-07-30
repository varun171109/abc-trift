import { siteConfig } from "@/config/site";
import { Product } from "@/data/products";
import { CartItem } from "@/context/CartContext";

/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled message.
 * Works on both mobile (opens the app) and desktop (opens WhatsApp Web).
 */
export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function whatsAppMessageForProduct(product: Product) {
  return [
    `Hi ${siteConfig.brandName}! I'd like to order:`,
    ``,
    `${product.lot} — ${product.name}`,
    `Brand: ${product.brand}`,
    `Size: ${product.size} | Condition: ${product.condition}`,
    `Price: ${siteConfig.currency}${product.price.toLocaleString("en-IN")}`,
    ``,
    `Please let me know the next steps to confirm this order.`,
  ].join("\n");
}

export function whatsAppMessageForCart(items: CartItem[], subtotal: number) {
  const lines = items.map(
    ({ product, quantity }) =>
      `• ${product.lot} — ${product.name} (Size ${product.size}) x${quantity} — ${siteConfig.currency}${(
        product.price * quantity
      ).toLocaleString("en-IN")}`
  );
  return [
    `Hi ${siteConfig.brandName}! I'd like to order:`,
    ``,
    ...lines,
    ``,
    `Subtotal: ${siteConfig.currency}${subtotal.toLocaleString("en-IN")}`,
    ``,
    `Please share the delivery details and payment steps.`,
  ].join("\n");
}

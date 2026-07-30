"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Product, sizes as ALL_SIZES, categories as ALL_CATEGORIES } from "@/data/products";

type SortOption = "relevance" | "new" | "price-asc" | "price-desc";

export default function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialSort = (searchParams.get("sort") as SortOption) || "relevance";

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);
  const colors = useMemo(() => Array.from(new Set(products.map((p) => p.color))), [products]);
  const categories = useMemo(
    () => ALL_CATEGORIES.filter((c) => products.some((p) => p.category === c)),
    [products]
  );
  const sizes = useMemo(() => ALL_SIZES.filter((s) => products.some((p) => p.size === s)), [products]);
  const highestPrice = useMemo(
    () => Math.max(2000, ...products.map((p) => p.price)),
    [products]
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(highestPrice);

  const toggle = (list: string[], setList: (l: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filtered = useMemo(() => {
    let result: Product[] = products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategories.length || selectedCategories.includes(p.category);
      const matchesSize = !selectedSizes.length || selectedSizes.includes(p.size);
      const matchesBrand = !selectedBrands.length || selectedBrands.includes(p.brand);
      const matchesColor = !selectedColors.length || selectedColors.includes(p.color);
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesSize && matchesBrand && matchesColor && matchesPrice;
    });

    if (sort === "new") result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [search, sort, selectedCategories, selectedSizes, selectedBrands, selectedColors, maxPrice]);

  const activeFilterCount =
    selectedCategories.length + selectedSizes.length + selectedBrands.length + selectedColors.length;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setMaxPrice(highestPrice);
  };

  const FilterGroup = ({
    title,
    options,
    selected,
    setSelected,
  }: {
    title: string;
    options: readonly string[];
    selected: string[];
    setSelected: (l: string[]) => void;
  }) => (
    <div className="py-5 border-b border-ink/10 dark:border-bone/10">
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(selected, setSelected, opt)}
            className={`text-xs px-3 py-1.5 rounded-tag border transition-colors ${
              selected.includes(opt)
                ? "bg-ink text-bone dark:bg-bone dark:text-ink border-ink dark:border-bone"
                : "border-ink/20 dark:border-bone/25 hover:border-clay"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container-px py-10 lg:py-14">
      <div className="mb-8">
        <p className="eyebrow-tag text-xs text-clay mb-2">The Rack</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Shop All</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or brand…"
            className="input-field pl-10"
            aria-label="Search products"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40 dark:text-bone/40"
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="input-field sm:w-52"
          aria-label="Sort products"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="new">Sort: Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="sm:hidden btn-secondary"
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className={`${filtersOpen ? "block" : "hidden"} sm:block`}>          <div className="flex items-center justify-between mb-2">
            <h2 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50">Filters</h2>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-clay hover:underline">
                Clear all
              </button>
            )}
          </div>
          <FilterGroup title="Category" options={categories} selected={selectedCategories} setSelected={setSelectedCategories} />
          <FilterGroup title="Size" options={sizes} selected={selectedSizes} setSelected={setSelectedSizes} />
          <FilterGroup title="Brand" options={brands} selected={selectedBrands} setSelected={setSelectedBrands} />
          <FilterGroup title="Color" options={colors} selected={selectedColors} setSelected={setSelectedColors} />
          <div className="py-5">
            <h3 className="text-sm font-medium mb-3">Max Price: ₹{maxPrice.toLocaleString("en-IN")}</h3>
            <input
              type="range"
              min={0}
              max={highestPrice}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-clay"
            />
          </div>
        </aside>

        <div>
          <p className="text-sm text-ink/50 dark:text-bone/50 mb-5">{filtered.length} items</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink/50 dark:text-bone/50">No pieces match those filters yet.</p>
              <button onClick={clearFilters} className="btn-secondary mt-4">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

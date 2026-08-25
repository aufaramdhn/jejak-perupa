"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { categoriesData, type CategoryData } from "@/lib/data/categories";

const CATEGORY_STORAGE_KEY = "jejak_perupa_categories_v1";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  colorHex: string;
  articleCount: number;
  isCustom?: boolean;
  isApproved?: boolean;
}

interface CategoryContextType {
  categories: CategoryItem[];
  approvedCategories: CategoryItem[];
  addCategory: (data: {
    name: string;
    description?: string;
    colorHex?: string;
    iconName?: string;
    isApproved?: boolean;
  }) => CategoryItem;
  updateCategory: (id: string, data: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => CategoryItem | undefined;
  getCategoryBySlug: (slug: string) => CategoryItem | undefined;
  resetToDefault: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    return categoriesData.map((c) => ({
      ...c,
      isCustom: false,
      isApproved: true,
    }));
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CATEGORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load categories from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((items: CategoryItem[]) => {
    try {
      localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to persist categories to localStorage", e);
    }
  }, []);

  // Helper to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const addCategory = useCallback(
    (data: {
      name: string;
      description?: string;
      colorHex?: string;
      iconName?: string;
      isApproved?: boolean;
    }): CategoryItem => {
      const slug = generateSlug(data.name);
      const newCategory: CategoryItem = {
        id: `cat-${slug || Date.now()}`,
        name: data.name.trim(),
        slug: slug || `kategori-${Date.now()}`,
        description:
          data.description?.trim() ||
          `Kategori materi dan wacana seni rupa ${data.name.trim()}.`,
        iconName: data.iconName || "folder",
        colorHex: data.colorHex || "#182C4A",
        articleCount: 0,
        isCustom: true,
        isApproved: data.isApproved !== undefined ? data.isApproved : true,
      };

      setCategories((prev) => {
        // Prevent duplicate by slug
        const exists = prev.find((c) => c.slug === newCategory.slug);
        if (exists) return prev;
        const updated = [...prev, newCategory];
        saveToStorage(updated);
        return updated;
      });

      return newCategory;
    },
    [saveToStorage]
  );

  const updateCategory = useCallback(
    (id: string, data: Partial<CategoryItem>) => {
      setCategories((prev) => {
        const updated = prev.map((cat) => {
          if (cat.id === id) {
            const newName = data.name !== undefined ? data.name.trim() : cat.name;
            const newSlug = data.name !== undefined ? generateSlug(data.name) : cat.slug;
            return {
              ...cat,
              ...data,
              name: newName,
              slug: newSlug,
            };
          }
          return cat;
        });
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((prev) => {
        const updated = prev.filter((cat) => cat.id !== id);
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const getCategoryById = useCallback(
    (id: string) => {
      return categories.find((c) => c.id === id);
    },
    [categories]
  );

  const getCategoryBySlug = useCallback(
    (slug: string) => {
      return categories.find((c) => c.slug === slug);
    },
    [categories]
  );

  const resetToDefault = useCallback(() => {
    const defaultList: CategoryItem[] = categoriesData.map((c) => ({
      ...c,
      isCustom: false,
      isApproved: true,
    }));
    setCategories(defaultList);
    saveToStorage(defaultList);
  }, [saveToStorage]);

  const approvedCategories = categories.filter((c) => c.isApproved !== false);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        approvedCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        getCategoryBySlug,
        resetToDefault,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}

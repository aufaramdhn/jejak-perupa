import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RichTextEditor } from "@/components/molecules/editor/RichTextEditor";

describe("RichTextEditor In-Situ View Modes", () => {
  it("renders with default write mode and view mode toggles", () => {
    const handleChange = vi.fn();
    render(<RichTextEditor value="Isi draf naskah awal" onChange={handleChange} />);

    expect(screen.getByText("Tulis")).toBeDefined();
    expect(screen.getByText("Visual")).toBeDefined();
    expect(screen.getByText("Split")).toBeDefined();
    expect(screen.getByDisplayValue("Isi draf naskah awal")).toBeDefined();
  });

  it("switches to in-situ visual rendered mode when Visual button is clicked", () => {
    const handleChange = vi.fn();
    const sampleTable = "| Unsur Rupa | Analisis Estetika |\n|:---|:---|\n| Garis | Dinamis & Ekspresif |";

    const { container } = render(
      <RichTextEditor value={sampleTable} onChange={handleChange} />
    );

    const visualBtn = screen.getByRole("button", { name: /Visual/i });
    fireEvent.click(visualBtn);

    // Should render actual HTML table inside editor
    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    expect(screen.getByText("Unsur Rupa")).toBeDefined();
    expect(screen.getByText("Dinamis & Ekspresif")).toBeDefined();
  });

  it("switches to split view mode showing both textarea and live rendered pane", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <RichTextEditor value="**Teks Analisis**" onChange={handleChange} />
    );

    const splitBtn = screen.getByRole("button", { name: /Split/i });
    fireEvent.click(splitBtn);

    // Textarea is present
    expect(screen.getByDisplayValue("**Teks Analisis**")).toBeDefined();

    // Live rendered strong tag is present
    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong?.textContent).toBe("Teks Analisis");
  });
});

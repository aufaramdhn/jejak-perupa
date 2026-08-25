import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageDualInput } from "@/components/molecules/ImageDualInput";

describe("ImageDualInput Component", () => {
  it("renders with label and switches between File and URL modes", () => {
    const handleChange = vi.fn();
    render(
      <ImageDualInput
        label="Foto Latar Belakang Header"
        value=""
        onChange={handleChange}
        helperGuideline="Format PNG atau JPG maksimal 2 MB"
      />
    );

    // Verify label and helper text
    expect(screen.getByText("Foto Latar Belakang Header")).toBeInTheDocument();
    expect(screen.getByText("Format PNG atau JPG maksimal 2 MB")).toBeInTheDocument();

    // Verify mode buttons exist
    const fileButton = screen.getByText("Unggah Berkas");
    const urlButton = screen.getByText("Tautan URL");
    expect(fileButton).toBeInTheDocument();
    expect(urlButton).toBeInTheDocument();

    // Switch to URL mode
    fireEvent.click(urlButton);
    const inputUrl = screen.getByPlaceholderText("https://domain.com/gambar.jpg");
    expect(inputUrl).toBeInTheDocument();

    // Type a URL and click Terapkan URL button
    fireEvent.change(inputUrl, { target: { value: "https://example.com/art.jpg" } });
    const applyButton = screen.getByText("Terapkan URL");
    fireEvent.click(applyButton);
    expect(handleChange).toHaveBeenCalledWith("https://example.com/art.jpg");
  });

  it("displays preview image and clear button when a value is provided", () => {
    const handleChange = vi.fn();
    render(
      <ImageDualInput
        label="Logo Situs"
        value="https://example.com/logo.png"
        onChange={handleChange}
      />
    );

    // Check if clear button is present with title "Hapus gambar"
    const clearButton = screen.getByTitle("Hapus gambar");
    expect(clearButton).toBeInTheDocument();

    // Click clear button
    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith("");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

// Mock next/image since it uses next server internals which aren't fully configured in JSDOM jest environment
jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});

describe("Header Component", () => {
  it("renders logo brand text MittiMiles", () => {
    render(<Header />);
    const brandElement = screen.getByText("MittiMiles");
    expect(brandElement).toBeInTheDocument();
  });

  it("renders main desktop navigation anchors", () => {
    render(<Header />);
    const storyLink = screen.getByText("Our Story");
    const solutionLink = screen.getByText("Our Solution");
    expect(storyLink).toBeInTheDocument();
    expect(storyLink).toHaveAttribute("href", "#story");
    expect(solutionLink).toBeInTheDocument();
    expect(solutionLink).toHaveAttribute("href", "#solution");
  });

  it("renders a link to the discovery page", () => {
    render(<Header />);
    const launchButtons = screen.getAllByText("Launch Discovery");
    expect(launchButtons.length).toBeGreaterThan(0);
    expect(launchButtons[0].closest("a")).toHaveAttribute("href", "/discovery");
  });
});

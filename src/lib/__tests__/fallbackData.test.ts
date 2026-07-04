import { getFallbackDestination, fallbackDestinations } from "../fallbackData";

describe("getFallbackDestination", () => {
  it("should resolve Bishnupur mock data for queries containing bishnupur", () => {
    const result = getFallbackDestination("I want to visit Bishnupur");
    expect(result.destinationName).toBe("Bishnupur");
    expect(result.stateOrRegion).toBe("West Bengal");
    expect(result.locationValidation?.isValid).toBe(true);
  });

  it("should resolve Chettinad mock data for queries containing chettinad", () => {
    const result = getFallbackDestination("Chettinad palaces and cuisine");
    expect(result.destinationName).toBe("Chettinad");
    expect(result.stateOrRegion).toBe("Tamil Nadu");
    expect(result.locationValidation?.isValid).toBe(true);
  });

  it("should resolve Hampi mock data by default for unmatched queries", () => {
    const result = getFallbackDestination("Varanasi");
    expect(result.destinationName).toBe("Hampi");
    expect(result.stateOrRegion).toBe("Karnataka");
    expect(result.locationValidation?.isValid).toBe(true);
  });

  it("should handle edge case capitalization and spaces", () => {
    const result = getFallbackDestination("  CHETTINAD  ");
    expect(result.destinationName).toBe("Chettinad");
  });
});

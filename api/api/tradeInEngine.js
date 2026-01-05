/**
 * Trade-In Valuation Engine
 * This file is intentionally isolated so logic can evolve
 * without touching API routes.
 */

export function calculateTradeInValue(vehicle) {
  const {
    year,
    mileage,
    condition = "average"
  } = vehicle;

  const currentYear = new Date().getFullYear();

  // Base value (placeholder)
  let value = 20000;

  // Age depreciation
  const age = currentYear - year;
  value -= age * 1200;

  // Mileage depreciation
  value -= Math.floor(mileage / 10000) * 800;

  // Condition adjustment
  switch (condition) {
    case "excellent":
      value += 1500;
      break;
    case "good":
      value += 500;
      break;
    case "fair":
      value -= 1000;
      break;
    case "poor":
      value -= 2500;
      break;
    default:
      break;
  }

  //

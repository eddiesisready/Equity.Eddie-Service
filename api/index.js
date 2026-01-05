import express from "express";
import { calculateTradeInValue } from "./tradeInEngine.js";

const app = express();
app.use(express.json());

/**
 * Health check
 * Confirms API is running
 */
app.get("/", (req, res) => {
  res.json({ status: "Trade-In SaaS API running" });
});

/**
 * Service Drive Check-In
 * Customer is physically present in the dealership
 */
app.post("/check-in", (req, res) => {
  const {
    vin,
    year,
    make,
    model,
    mileage,
    condition
  } = req.body;

  // Basic validation
  if (!vin || !year || !make || !model || !mileage) {
    return res.status(400).json({
      error: "vin, year, make, model, and mileage are required"
    });
  }

  // Generate trade-in estimate
  const estimatedTradeInValue = calculateTradeInValue({
    year,
    mileage,
    condition
  });

  // Return response
  res.json({
    vin,
    vehicle: `${year} ${make} ${model}`,
    estimatedTradeInValue,
    inStore: true,
    disclaimer: "Estimate only. Final value determined after inspection."
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Trade-In API listening on port ${PORT}`);
});

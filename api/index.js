import express from "express";

const app = express();
app.use(express.json());

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.json({ status: "InStore Trade-In API running" });
});

/**
 * Service Drive Check-In
 * Customer is physically present
 */
app.post("/check-in", async (req, res) => {
  const {
    vin,
    year,
    make,
    model,
    mileage
  } = req.body;

  if (!vin || !year || !make || !model || !mileage) {
    return res.status(400).json({
      error: "Missing required vehicle data"
    });
  }

  // 🚧 Temporary trade-in logic (placeholder)
  // This WILL be replaced later with real valuation logic or API
  const baseValue = 20000;
  const agePenalty = (new Date().getFullYear() - year) * 1200;
  const mileagePenalty = Math.floor(mileage / 10000) * 800;

  const tradeInValue = Math.max(
    baseValue - agePenalty - mileagePenalty,
    2000
  );

  res.json({
    vin,
    vehicle: `${year} ${make} ${model}`,
    estimatedTradeInValue: tradeInValue,
    disclaimer: "Estimate only. Final value determined after inspection."
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Trade-In API listening on port ${PORT}`);
});

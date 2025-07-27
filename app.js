// Monhegan Island Water Conservation Calculator JavaScript

// Water usage data
const waterUsageData = {
  toilet_flushing: {
    standard_per_person_daily: 18.5,
    conservation_savings_percent: 40,
    conservation_method: "If it's yellow let it mellow"
  },
  showering: {
    standard_per_person_daily: 17.2,
    conservation_savings_percent: 30,
    conservation_method: "5-minute showers + turn off while soaping"
  },
  dishwashing: {
    standard_gallons_per_load: 22,
    conservation_gallons_per_load: 6,
    loads_per_day_base: 3,
    loads_per_additional_person: 0.3,
    conservation_savings_percent: 73,
    conservation_method: "Fill sink basin instead of running tap continuously"
  },
  bathroom_sinks: {
    standard_per_person_daily: 4,
    conservation_per_person_daily: 0.5,
    conservation_savings_percent: 87,
    conservation_method: "Turn off tap while brushing teeth/soaping"
  }
};

function init() {
  // DOM elements
  const guestSlider = document.getElementById('guestSlider');
  const guestCount = document.getElementById('guestCount');
  const staySlider = document.getElementById('staySlider');
  const stayCount = document.getElementById('stayCount');

  const standardToilet = document.getElementById('standardToilet');
  const standardShower = document.getElementById('standardShower');
  const standardDish = document.getElementById('standardDish');
  const standardSink = document.getElementById('standardSink');
  const standardTotal = document.getElementById('standardTotal');

  const conservationToilet = document.getElementById('conservationToilet');
  const conservationShower = document.getElementById('conservationShower');
  const conservationDish = document.getElementById('conservationDish');
  const conservationSink = document.getElementById('conservationSink');
  const conservationTotal = document.getElementById('conservationTotal');

  const toiletSavings = document.getElementById('toiletSavings');
  const showerSavings = document.getElementById('showerSavings');
  const dishSavings = document.getElementById('dishSavings');
  const sinkSavings = document.getElementById('sinkSavings');
  const totalSavings = document.getElementById('totalSavings');

  const standardProjection = document.getElementById('standardProjection');
  const conservationProjection = document.getElementById('conservationProjection');
  const totalStaySavings = document.getElementById('totalStaySavings');

  function updateCalculations() {
    const guests = parseInt(guestSlider.value);
    const days = parseInt(staySlider.value);

    // Display current values
    guestCount.textContent = guests;
    stayCount.textContent = days;

    // Standard daily
    const stdToilet = guests * waterUsageData.toilet_flushing.standard_per_person_daily;
    const stdShower = guests * waterUsageData.showering.standard_per_person_daily;
    const stdSink = guests * waterUsageData.bathroom_sinks.standard_per_person_daily;

    const stdDishLoads = waterUsageData.dishwashing.loads_per_day_base +
       (guests > 1 ? (guests - 1) * waterUsageData.dishwashing.loads_per_additional_person : 0);
    const stdDish = stdDishLoads * waterUsageData.dishwashing.standard_gallons_per_load;
    const stdTotal = stdToilet + stdShower + stdDish + stdSink;

    // Conservation daily
    const consToilet = guests * waterUsageData.toilet_flushing.standard_per_person_daily *
      (1 - waterUsageData.toilet_flushing.conservation_savings_percent / 100);
    const consShower = guests * waterUsageData.showering.standard_per_person_daily *
      (1 - waterUsageData.showering.conservation_savings_percent / 100);
    const consSink = guests * waterUsageData.bathroom_sinks.conservation_per_person_daily;

    const consDishLoads = stdDishLoads;
    const consDish = consDishLoads * waterUsageData.dishwashing.conservation_gallons_per_load;
    const consTotal = consToilet + consShower + consDish + consSink;

    // Daily savings
    const savingsToilet = stdToilet - consToilet;
    const savingsShower = stdShower - consShower;
    const savingsDish = stdDish - consDish;
    const savingsSink = stdSink - consSink;
    const savingsTotal = stdTotal - consTotal;

    // Totals for stay
    const stdStay = stdTotal * days;
    const consStay = consTotal * days;
    const savingsStay = savingsTotal * days;

    // Update table cells (show daily)
    standardToilet.textContent = `${stdToilet.toFixed(1)} gal/day`;
    standardShower.textContent = `${stdShower.toFixed(1)} gal/day`;
    standardDish.textContent = `${stdDish.toFixed(1)} gal/day`;
    standardSink.textContent = `${stdSink.toFixed(1)} gal/day`;
    standardTotal.textContent = `${stdTotal.toFixed(1)} gal/day`;

    conservationToilet.textContent = `${consToilet.toFixed(1)} gal/day`;
    conservationShower.textContent = `${consShower.toFixed(1)} gal/day`;
    conservationDish.textContent = `${consDish.toFixed(1)} gal/day`;
    conservationSink.textContent = `${consSink.toFixed(1)} gal/day`;
    conservationTotal.textContent = `${consTotal.toFixed(1)} gal/day`;

    toiletSavings.textContent = `${savingsToilet.toFixed(1)} gal saved`;
    showerSavings.textContent = `${savingsShower.toFixed(1)} gal saved`;
    dishSavings.textContent = `${savingsDish.toFixed(1)} gal saved`;
    sinkSavings.textContent = `${savingsSink.toFixed(1)} gal saved`;
    totalSavings.textContent = `${savingsTotal.toFixed(1)} gal`;

    // Update projection/overview (stay totals)
    standardProjection.textContent = `${stdStay.toFixed(0)} gal`;
    conservationProjection.textContent = `${consStay.toFixed(0)} gal`;
    totalStaySavings.textContent = `${savingsStay.toFixed(0)} gal`;
  }

  // Event listeners for sliders
  guestSlider.addEventListener('input', updateCalculations);
  staySlider.addEventListener('input', updateCalculations);

  // Initial call
  updateCalculations();
}

// Initiate on DOM load
document.addEventListener('DOMContentLoaded', init);

const is1to5 = (n) => Number.isInteger(n) && n >= 1 && n <= 5;

const isMetricArray = (arr) =>
  Array.isArray(arr) &&
  arr.length === 2 &&
  arr.every(is1to5);

const isPerformanceRecordValid = (record) => {
  const {
    year,
    leadership_competence,
    openness_employees,
    attitude_clients,
    communication,
    integrity_company,
  } = record;

  if (!Number.isInteger(year)) return false;

  // each metric must be [supervisorValue, peerValue] with 1..5
  const metricsOk = [
    leadership_competence,
    openness_employees,
    attitude_clients,
    communication,
    integrity_company,
  ].every(isMetricArray);

  if (!metricsOk) return false;

  return true;
};

function assertPerformanceRecordArray(records) {
  if (!Array.isArray(records))
    throw new Error("performanceRecords must be an array.");

  const years = new Set();
  for (const rec of records) {
    if (!isPerformanceRecordValid(rec)) {
      throw new Error(
        "One or more performance records are invalid (must include year and 2 values 1..5 per metric)."
      );
    }
    if (years.has(rec.year)) {
      throw new Error(`Duplicate year ${rec.year} in performanceRecords.`);
    }
    years.add(rec.year);
  }
}

function cryptoRandomId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map(b => b.toString(16).padStart(2, "0")).join("");
}


module.exports = {
  assertPerformanceRecordArray,
  isPerformanceRecordValid,
  cryptoRandomId,
};


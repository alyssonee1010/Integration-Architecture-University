const is1to5 = (n) => n >= 1 && n <= 5;
const isPerformanceRecordValid = (record) => {
    const { year, leadership_competence, openness_employees, attitude_clients, communication, integrity_company } = record;
    if (!Number.isInteger(year)) return false;
    // ensure each metric is 1..5
    const metricsOk = [leadership_competence, openness_employees, attitude_clients, communication, integrity_company]
        .every(is1to5);
    if (!metricsOk) return false;
    return true
}

function cryptoRandomId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map(b => b.toString(16).padStart(2, "0")).join("");
}

function assertPerformanceRecordArray(records) {
  if (!Array.isArray(records)) throw new Error("performanceRecords must be an array.");
  const years = new Set();
  for (const rec of records) {
    if (!isPerformanceRecordValid(rec)) {
      throw new Error("One or more performance records are invalid (must include year and metrics 1..5).");
    }
    if (years.has(rec.year)) {
      throw new Error(`Duplicate year ${rec.year} in performanceRecords.`);
    }
    years.add(rec.year);
  }
}

module.exports = {
    assertPerformanceRecordArray,
    isPerformanceRecordValid,
    cryptoRandomId
}
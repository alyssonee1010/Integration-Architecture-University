// services/salesmanService.js
const Salesman = require("../models/salesmen");
const {
  isPerformanceRecordValid,
  cryptoRandomId,
  assertPerformanceRecordArray,
} = require("../utils/salesman");

/**
 * Get all salesmen.
 * Returns plain JS objects (not Mongoose documents).
 */
async function getAllSalesmen() {
  return Salesman.find().lean();
}

/**
 * Get a single salesman by id.
 * Returns plain JS object or null if not found.
 */
async function getSalesmanById(id) {
  if (!id) return null;
  return Salesman.findById(id).lean();
}

/**
 * Internal helper when we actually need a Mongoose document
 * to modify and save.
 */
async function getSalesmanDocById(id) {
  if (!id) return null;
  return Salesman.findById(id);
}

/**
 * Create a new salesman.
 */
async function createSalesMan({ firstname, lastname }) {
  if (!firstname || !lastname) {
    throw new Error("firstname, lastname are required.");
  }

  const id = cryptoRandomId();

  const doc = new Salesman({
    _id: id,
    firstname,
    lastname,
    performanceRecords: [],
  });

  await doc.save();
  return doc.toObject();
}

/**
 * Get all performance records for a salesman.
 */
async function getSocialPerformanceRecordBySalesmen(id) {
  const s = await Salesman.findById(id, { performanceRecords: 1 }).lean();
  if (!s) return null;
  return s.performanceRecords;
}

/**
 * Get one performance record by salesman id and year.
 */
async function getSocialPerformanceRecordBySalesmenByYear(id, year) {
  const y =
    typeof year === "number" ? year : Number.parseInt(String(year), 10);
  if (!Number.isFinite(y)) return null;

  // more efficient: let Mongo filter the array
  const s = await Salesman.findOne(
    { _id: id, "performanceRecords.year": y },
    { "performanceRecords.$": 1 } // project only the matched element
  ).lean();

  if (!s || !Array.isArray(s.performanceRecords) || s.performanceRecords.length === 0) {
    return null;
  }

  return s.performanceRecords[0];
}

/**
 * Create a new performance record for a salesman.
 */
async function createSocialPerformanceRecord(id, record) {
  const isValid = isPerformanceRecordValid(record);
  if (!isValid) throw new Error(`Invalid performance record ${id}.`);

  const s = await getSalesmanDocById(id);
  if (!s) throw new Error(`No salesman with id ${id}.`);

  const {
    year,
    leadership_competence,
    openness_employees,
    attitude_clients,
    communication,
    integrity_company,
  } = record;

  if (s.performanceRecords.some((r) => r.year === year)) {
    throw new Error(
      `Performance record for year ${year} already exists for id ${id}.`
    );
  }

  const newRec = {
    year,
    leadership_competence,
    openness_employees,
    attitude_clients,
    communication,
    integrity_company,
  };

  s.performanceRecords.push(newRec);
  await s.save();

  return newRec;
}

/**
 * Update a salesman (firstname, lastname, and/or performanceRecords).
 * Replaces performanceRecords entirely if provided.
 */
async function updateSalesMan(id, record) {
  if (!record) {
    throw new Error("record is required.");
  }

  const existing = await getSalesmanDocById(id);
  if (!existing) {
    throw new Error(`No salesman with id ${id}.`);
  }

  if (record.firstname !== undefined) existing.firstname = record.firstname;
  if (record.lastname !== undefined) existing.lastname = record.lastname;

  if (record.performanceRecords !== undefined) {
    assertPerformanceRecordArray(record.performanceRecords);

    const newRecords = [];
    for (const rec of record.performanceRecords) {
      const {
        year,
        leadership_competence,
        openness_employees,
        attitude_clients,
        communication,
        integrity_company,
      } = rec;

      newRecords.push({
        year,
        leadership_competence,
        openness_employees,
        attitude_clients,
        communication,
        integrity_company,
      });
    }

    existing.performanceRecords = newRecords;
  }

  await existing.save();
  return existing.toObject();
}

/**
 * Delete a salesman by id.
 * Returns true if deleted, false if not found.
 */
async function deleteSalesMan(id) {
  const res = await Salesman.findByIdAndDelete(id);
  return !!res;
}

/**
 * Delete all performance records for a given salesman.
 * Returns the number of removed records.
 */
async function deleteSocialPerformanceRecords(id) {
  const s = await getSalesmanDocById(id);
  if (!s) throw new Error(`No salesman with id ${id}.`);

  const removedCount = s.performanceRecords.length;
  s.performanceRecords = [];
  await s.save();

  return removedCount;
}

module.exports = {
  getAllSalesmen,
  getSalesmanById,
  getSocialPerformanceRecordBySalesmen,
  getSocialPerformanceRecordBySalesmenByYear,
  createSocialPerformanceRecord,
  createSalesMan,
  deleteSalesMan,
  deleteSocialPerformanceRecords,
  updateSalesMan,
};

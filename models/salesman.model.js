const { isPerformanceRecordValid, cryptoRandomId, assertPerformanceRecordArray } = require("../utils/salesman");

const staticSalesmen = [
    {
        _id: "68efd009111f8005f688d5fb",
        firstname: "Martin",
        lastname: "Braun",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 2, attitude_clients: 3, communication: 2, integrity_company: 4 },
            { year: 2024, leadership_competence: 1, openness_employees: 3, attitude_clients: 1, communication: 5, integrity_company: 3 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5fc",
        firstname: "Anna",
        lastname: "Schmidt",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 4, attitude_clients: 3, communication: 1, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5fd",
        firstname: "Tobias",
        lastname: "Müller",
        performanceRecords: [
            { year: 2025, leadership_competence: 2, openness_employees: 3, attitude_clients: 2, communication: 2, integrity_company: 4 },
            { year: 2024, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 2, integrity_company: 1 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5fe",
        firstname: "Lena",
        lastname: "Fischer",
        performanceRecords: [
            { year: 2025, leadership_competence: 4, openness_employees: 3, attitude_clients: 5, communication: 1, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5ff",
        firstname: "Max",
        lastname: "Weber",
        performanceRecords: [
            { year: 2025, leadership_competence: 4, openness_employees: 4, attitude_clients: 3, communication: 3, integrity_company: 4 },
            { year: 2024, leadership_competence: 1, openness_employees: 5, attitude_clients: 5, communication: 4, integrity_company: 5 },
            { year: 2023, leadership_competence: 1, openness_employees: 4, attitude_clients: 3, communication: 4, integrity_company: 4 }
        ]
    },
    {
        _id: "68efd009111f8005f688d600",
        firstname: "Sophie",
        lastname: "Koch",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 3, attitude_clients: 3, communication: 3, integrity_company: 3 }
        ]
    },
    {
        _id: "68efd009111f8005f688d601",
        firstname: "David",
        lastname: "Wagner",
        performanceRecords: [
            { year: 2025, leadership_competence: 4, openness_employees: 5, attitude_clients: 1, communication: 2, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d602",
        firstname: "Julia",
        lastname: "Schulz",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 3, attitude_clients: 3, communication: 3, integrity_company: 4 },
            { year: 2024, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 2, integrity_company: 4 }
        ]
    },
    {
        _id: "68efd009111f8005f688d603",
        firstname: "Felix",
        lastname: "Hofmann",
        performanceRecords: []
    },
    {
        _id: "68efd009111f8005f688d604",
        firstname: "Maria",
        lastname: "Becker",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 4, integrity_company: 4 }
        ]
    },
    {
        _id: "68efd009111f8005f688d605",
        firstname: "Lukas",
        lastname: "Lehmann",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 3, integrity_company: 4 },
            { year: 2024, leadership_competence: 1, openness_employees: 3, attitude_clients: 3, communication: 4, integrity_company: 4 }
        ]
    },
    {
        _id: "68efd009111f8005f688d606",
        firstname: "Emilia",
        lastname: "Maier",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 2, integrity_company: 4 }
        ]
    },
    {
        _id: "68efd009111f8005f688d607",
        firstname: "Jonas",
        lastname: "Schneider",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 2, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d608",
        firstname: "Laura",
        lastname: "Richter",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 2, attitude_clients: 3, communication: 3, integrity_company: 5 },
            { year: 2024, leadership_competence: 1, openness_employees: 4, attitude_clients: 3, communication: 3, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d609",
        firstname: "Simon",
        lastname: "Bauer",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 3, attitude_clients: 3, communication: 3, integrity_company: 4 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60a",
        firstname: "Nora",
        lastname: "Frank",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 2, attitude_clients: 4, communication: 3, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60b",
        firstname: "Paul",
        lastname: "Huber",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 3, attitude_clients: 3, communication: 3, integrity_company: 1 },
            { year: 2024, leadership_competence: 1, openness_employees: 2, attitude_clients: 3, communication: 2, integrity_company: 2 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60c",
        firstname: "Mia",
        lastname: "Peters",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 5, attitude_clients: 3, communication: 2, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60d",
        firstname: "Chris",
        lastname: "Wolf",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 4, attitude_clients: 3, communication: 3, integrity_company: 5 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60e",
        firstname: "Eva",
        lastname: "Neumann",
        performanceRecords: [
            { year: 2025, leadership_competence: 1, openness_employees: 3, attitude_clients: 3, communication: 3, integrity_company: 3 },
            { year: 2024, leadership_competence: 1, openness_employees: 4, attitude_clients: 4, communication: 4, integrity_company: 2 }
        ]
    }
];


function getAllSalesmen() {

    return staticSalesmen;
}


function getSalesmanById(id) {

    return staticSalesmen.find(s => s._id === id);
}

function createSalesMan({ firstname, lastname }) {
  if (!firstname || !lastname) {
    throw new Error("firstname, lastname are required.");
  }
  const id = cryptoRandomId();
  const doc = { _id: id, firstname, lastname, performanceRecords: [] };
  staticSalesmen.push(doc);
  return doc;
}

function getSocialPerformanceRecordBySalesmen(id) {
  const s = getSalesmanById(id);
  if (!s) return null;
  return s.performanceRecords;
}

function createSocialPerformanceRecord(id, record) {
  const s = getSalesmanById(id);
  if (!s) throw new Error(`No salesman with id ${id}.`);
  const isValid = isPerformanceRecordValid(record);
  if (!isValid) throw new Error(`Invalid performance record ${id}.`);
  const { year, leadership_competence, openness_employees, attitude_clients, communication, integrity_company } = record;

  if (s.performanceRecords.some(r => r.year === year)) {
    throw new Error(`Performance record for year ${year} already exists for id ${id}.`);
  }
  const newRec = { year, leadership_competence, openness_employees, attitude_clients, communication, integrity_company };
  s.performanceRecords.push(newRec);
  return newRec;
}

function updateSalesMan(id, record) {
  if (!record) {
    throw new Error("record is required.");
  }
  const existing = getSalesmanById(id);
  if (!existing) {
    throw new Error(`No salesman with id ${id}.`);
  }

  if (record.firstname !== undefined) existing.firstname = record.firstname;
  if (record.lastname !== undefined) existing.lastname = record.lastname;

   if (record.performanceRecords !== undefined) {
    assertPerformanceRecordArray(record.performanceRecords);

    const newRecords = [];
    for (const rec of record.performanceRecords) {
      const { year, leadership_competence, openness_employees, attitude_clients, communication, integrity_company } = rec;
      newRecords.push({ year, leadership_competence, openness_employees, attitude_clients, communication, integrity_company });
    }
    existing.performanceRecords = newRecords;
  }

  return existing;
}

function deleteSalesMan(id) {
  const idx = staticSalesmen.findIndex(s => s._id === id);
  if (idx === -1) return false;
  staticSalesmen.splice(idx, 1);
  return true;
}

function deleteSocialPerformanceRecords(id) {
  const s = getSalesmanById(id);
  if (!s) throw new Error(`No salesman with id ${id}.`);

  const removedCount = s.performanceRecords.length;
  s.performanceRecords = [];
  return removedCount;
}

module.exports = {
    getAllSalesmen,
    getSalesmanById,
    getSocialPerformanceRecordBySalesmen,
    createSocialPerformanceRecord,
    createSalesMan,
    deleteSalesMan,
    deleteSocialPerformanceRecords,
    updateSalesMan
};

//AI-generated staticSalesmen
const staticSalesmen = [
    {
        _id: "68efd009111f8005f688d5fb",
        firstname: "Martin",
        lastname: "Braun",
        sid: 4,
        performanceRecords: [
            { id: 50, salesman: 4, year: 2025, socialScore: 50 },
            { id: 51, salesman: 4, year: 2024, socialScore: 45 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5fc",
        firstname: "Anna",
        lastname: "Schmidt",
        sid: 5,
        performanceRecords: [
            { id: 60, salesman: 5, year: 2025, socialScore: 92 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5fd",
        firstname: "Tobias",
        lastname: "Müller",
        sid: 6,
        performanceRecords: [
            { id: 70, salesman: 6, year: 2025, socialScore: 78 },
            { id: 71, salesman: 6, year: 2024, socialScore: 80 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5fe",
        firstname: "Lena",
        lastname: "Fischer",
        sid: 7,
        performanceRecords: [
            { id: 80, salesman: 7, year: 2025, socialScore: 63 }
        ]
    },
    {
        _id: "68efd009111f8005f688d5ff",
        firstname: "Max",
        lastname: "Weber",
        sid: 8,
        performanceRecords: [
            { id: 90, salesman: 8, year: 2025, socialScore: 88 },
            { id: 91, salesman: 8, year: 2024, socialScore: 75 },
            { id: 92, salesman: 8, year: 2023, socialScore: 82 }
        ]
    },
    {
        _id: "68efd009111f8005f688d600",
        firstname: "Sophie",
        lastname: "Koch",
        sid: 9,
        performanceRecords: [
            { id: 100, salesman: 9, year: 2025, socialScore: 95 }
        ]
    },
    {
        _id: "68efd009111f8005f688d601",
        firstname: "David",
        lastname: "Wagner",
        sid: 10,
        performanceRecords: [
            { id: 110, salesman: 10, year: 2025, socialScore: 40 }
        ]
    },
    {
        _id: "68efd009111f8005f688d602",
        firstname: "Julia",
        lastname: "Schulz",
        sid: 11,
        performanceRecords: [
            { id: 120, salesman: 11, year: 2025, socialScore: 70 },
            { id: 121, salesman: 11, year: 2024, socialScore: 65 }
        ]
    },
    {
        _id: "68efd009111f8005f688d603",
        firstname: "Felix",
        lastname: "Hofmann",
        sid: 12,
        performanceRecords: []
    },
    {
        _id: "68efd009111f8005f688d604",
        firstname: "Maria",
        lastname: "Becker",
        sid: 13,
        performanceRecords: [
            { id: 130, salesman: 13, year: 2025, socialScore: 99 }
        ]
    },
    {
        _id: "68efd009111f8005f688d605",
        firstname: "Lukas",
        lastname: "Lehmann",
        sid: 14,
        performanceRecords: [
            { id: 140, salesman: 14, year: 2025, socialScore: 55 },
            { id: 141, salesman: 14, year: 2024, socialScore: 60 }
        ]
    },
    {
        _id: "68efd009111f8005f688d606",
        firstname: "Emilia",
        lastname: "Maier",
        sid: 15,
        performanceRecords: [
            { id: 150, salesman: 15, year: 2025, socialScore: 85 }
        ]
    },
    {
        _id: "68efd009111f8005f688d607",
        firstname: "Jonas",
        lastname: "Schneider",
        sid: 16,
        performanceRecords: [
            { id: 160, salesman: 16, year: 2025, socialScore: 72 }
        ]
    },
    {
        _id: "68efd009111f8005f688d608",
        firstname: "Laura",
        lastname: "Richter",
        sid: 17,
        performanceRecords: [
            { id: 170, salesman: 17, year: 2025, socialScore: 68 },
            { id: 171, salesman: 17, year: 2024, socialScore: 70 }
        ]
    },
    {
        _id: "68efd009111f8005f688d609",
        firstname: "Simon",
        lastname: "Bauer",
        sid: 18,
        performanceRecords: [
            { id: 180, salesman: 18, year: 2025, socialScore: 90 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60a",
        firstname: "Nora",
        lastname: "Frank",
        sid: 19,
        performanceRecords: [
            { id: 190, salesman: 19, year: 2025, socialScore: 35 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60b",
        firstname: "Paul",
        lastname: "Huber",
        sid: 20,
        performanceRecords: [
            { id: 200, salesman: 20, year: 2025, socialScore: 81 },
            { id: 201, salesman: 20, year: 2024, socialScore: 85 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60c",
        firstname: "Mia",
        lastname: "Peters",
        sid: 21,
        performanceRecords: [
            { id: 210, salesman: 21, year: 2025, socialScore: 66 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60d",
        firstname: "Chris",
        lastname: "Wolf",
        sid: 22,
        performanceRecords: [
            { id: 220, salesman: 22, year: 2025, socialScore: 74 }
        ]
    },
    {
        _id: "68efd009111f8005f688d60e",
        firstname: "Eva",
        lastname: "Neumann",
        sid: 23,
        performanceRecords: [
            { id: 230, salesman: 23, year: 2025, socialScore: 93 },
            { id: 231, salesman: 23, year: 2024, socialScore: 95 }
        ]
    }
];


function getAllSalesmen() {

    return staticSalesmen;
}


function getSalesmanBySid(sid) {

    return staticSalesmen.find(s => s.sid === sid);
}

module.exports = {
    getAllSalesmen,
    getSalesmanBySid,
    // ...
};
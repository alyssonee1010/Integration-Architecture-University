const axios = require("axios");
const qs = require("querystring");
require('dotenv').config();
const baseURL = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php";

// Obtain access token for further API requests
let cachedToken = null;
let tokenExpiry = 0;
async function getAuthConfig() {
    const currentTime = Math.floor(Date.now() / 1000);

    if (cachedToken && currentTime < tokenExpiry) {
        return {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${cachedToken}`
            }
        };
    }
    const body = qs.stringify({
        client_id: "api_oauth_id",
        client_secret: "oauth_secret",
        grant_type: "password",
        username: process.env.ORANGEHRM_USERNAME,
        password: process.env.ORANGEHRM_PASSWORD
    });
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        }
    };
    const res = await axios.post(`${baseURL}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    console.log("Obtained new OrangeHRM access token: ", res.data.access_token);
    cachedToken = res.data.access_token;
    tokenExpiry = currentTime + res.data.expires_in - 60; // Refresh 1 minute before expiry

    return {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${cachedToken}`
        }
    };
}

// -----------------------------------------------------------
// -------------------- Helper Functions ----------------------
// -----------------------------------------------------------
async function getInternalIDByEmployeeID(id) {
    try {
        const authConfig = await getAuthConfig();
        const res = await axios.get(`${baseURL}/api/v1/employee/search`, authConfig);
        const employeeList = res.data.data;

        const idStr = String(id);

        const employee = employeeList.find(emp =>
            emp.code === idStr || String(emp.employeeId) === idStr
        );

        if (!employee) {
            throw new Error(`Employee with ID ${id} not found.`);
        }

        return employee.employeeId;
    } catch (error) {
        console.error(`Error fetching internal ID for employee with ID ${id}:`, error);
        throw error;
    }
}


// -----------------------------------------------------------
// --------------------- TRANSFORMATION ----------------------
// -----------------------------------------------------------
async function transformEmployee(employee) {
    return {
        id: employee.code,
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
    };
}

// -----------------------------------------------------------
// -------------------- CRUD OPERATIONS ----------------------
// -----------------------------------------------------------
async function getAllEmployees() {
    try {
        const authConfig = await getAuthConfig();
        const res = await axios.get(`${baseURL}/api/v1/employee/search`, authConfig);
        return res.data.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

async function getAllEmployeeById(id) {
    try {
        const authConfig = await getAuthConfig();
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.get(`${baseURL}/api/v1/employee/${id}`, authConfig);
        return res.data.data;
    } catch (error) {
        console.error(`Error fetching employee with ID ${id}:`, error);
        throw error;
    }
}

async function getBonusSalaryOfEmployee(id) {
    try {
        const authConfig = await getAuthConfig();
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.get(`${baseURL}/api/v1/employee/${id}/bonussalary`, authConfig);
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { message: `No bonus salary records found for employee with ID ${id}.` };
        }
        console.error(`Error fetching bonus salary for employee with ID ${id}:`, error);
        throw error;
    }
}


async function createBonusSalaryOfEmployee(id, body) {
    try {
        if (!body?.year || !body?.value) throw new Error("Both 'year' and 'value' are required in the request body.");
        const payload = {year: body.year, value: body.value};
        const authConfig = await getAuthConfig();
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.post(`${baseURL}/api/v1/employee/${id}/bonussalary`, payload, authConfig);
        return res.data;
    } catch (error) {
        console.error(`Error creating bonus salary for employee with ID ${id}:`, error);
        throw error;
    }
}

async function deleteBonusSalaryOfEmployee(id, body) {
    try {
        const authConfig = await getAuthConfig();
        if (!body?.year) throw new Error("Required parameter 'year' is missing in the request body.");
        const payload = {year: body.year};
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.delete(`${baseURL}/api/v1/employee/${id}/bonussalary`, { data: payload, ...authConfig });
        return res.data;
    } catch (error) {
        console.error(`Error deleting bonus salary for employee with ID ${id} for year ${body?.year}:`, error);
        throw error;
    }
}


// -----------------------------------------------------------
// -------------------- Work Experience ----------------------
// -----------------------------------------------------------
async function getWorkExperienceById(id) {
    try {
        const authConfig = await getAuthConfig();
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.get(`${baseURL}/api/v1/employee/${id}/work-experience`, authConfig);
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { message: `No work experience records found for employee with ID ${id}.` };
        }
        console.error(`Error fetching work experience for employee with ID ${id}:`, error);
        throw error;
    }
}

async function createWorkExperience(id, body) {
    try {
        if (!body?.company || !body?.title || !body?.fromDate || !body?.toDate) {
            throw new Error("Parameters 'company', 'title', 'fromDate', and 'toDate' are required in the request body.");
        }
        const authConfig = await getAuthConfig();
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.post(`${baseURL}/api/v1/employee/${id}/work-experience`, body, authConfig);
        return res.data;
    } catch (error) {
        console.error(`Error creating work experience for employee with ID ${id}:`, error);
        throw error;
    }
}

async function deleteWorkExperience(id, body) {
    try {
        const authConfig = await getAuthConfig();
        id = await getInternalIDByEmployeeID(id);
        const res = await axios.delete(`${baseURL}/api/v1/employee/${id}/work-experience`, { data: body, ...authConfig });
        return res.data;
    } catch (error) {
        console.error(`Error deleting work experience for employee with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getAllEmployees,
    getAllEmployeeById,
    getBonusSalaryOfEmployee,
    createBonusSalaryOfEmployee,
    deleteBonusSalaryOfEmployee,
    getWorkExperienceById,
    createWorkExperience,
    deleteWorkExperience
};


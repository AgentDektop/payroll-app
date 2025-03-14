import axios from "axios";
const PAYRUN_API_URL = "http://localhost:5050/pay-run";

const fetchPayRun = async () => {
  const response = await fetch(`${PAYRUN_API_URL}/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return await response.json();
};

const fetchPayRunById = async (id) => {
  const response = await fetch(`${PAYRUN_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch employee details");
  }
  return await response.json();
}

const approvePayrun = async (payRunId, approved, rejected) => {
  try {
    const response = await axios.put(`${PAYRUN_API_URL}/approve`, {
      payRunId,
      approved,
      rejected,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating pay run approval:", error);
    throw error;
  }
};

export { fetchPayRun, fetchPayRunById, approvePayrun}
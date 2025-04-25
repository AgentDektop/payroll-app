import axios from "axios";
import { formatDateForAPI } from "../../employee/utils/employeeUtils";
const PAYRUN_API_URL = "http://localhost:5050/pay-run";

const downloadPayslip = async (payRunId) => {
  try {
    const response = await fetch(`${PAYRUN_API_URL}/download-payslip/${payRunId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to download payslip");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `Payslips_${payRunId}.zip`;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    downloadLink.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};

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

const processPayRun = async (startDate, endDate) => {
  try {
    const formattedStartDate = formatDateForAPI(startDate);
    const formattedEndDate = formatDateForAPI(endDate);

    const response = await axios.post(`${PAYRUN_API_URL}/process?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);

    return response.data;
  }
  catch (error) {
    console.error("Error processing pay run:", error);
    throw error;
  }
};

export { fetchPayRun, fetchPayRunById, approvePayrun, processPayRun, downloadPayslip }
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

export { fetchPayRun, fetchPayRunById}
import axios from "axios";

const TIME_AND_ATTENDANCE_API_URL = "http://localhost:5050/time-and-attendance";

const fetchAttendanceByPeriod = async (startDate, endDate) => {
  const url = `${TIME_AND_ATTENDANCE_API_URL}/by-period?startDate=${startDate}&endDate=${endDate}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch attendance data");
  }
  
  return await response.json();
};

const  uploadTimeRecord  = async ({ startDate, endDate, file }) => {
  const formData = new FormData();
  formData.append("file", file);
  
  const url = `${TIME_AND_ATTENDANCE_API_URL}/upload?startDate=${startDate}&endDate=${endDate}`;
  
  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  return response.data;
};

export { fetchAttendanceByPeriod, uploadTimeRecord }
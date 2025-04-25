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

const addEmployeeOvertime = async (data) => {
  try {
    const response = await axios.post(`${TIME_AND_ATTENDANCE_API_URL}/overtime`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const addEmployeeTimeOff = async (data) => {
  try {
    const response = await axios.post(`${TIME_AND_ATTENDANCE_API_URL}/timeoff`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const addEmployeeEarnings = async (data) => {
  try {
    const response = await axios.post(`${TIME_AND_ATTENDANCE_API_URL}/additional-earnings`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const addEmployeeDeduction = async (data) => {
  try {
    const response = await axios.post(`${TIME_AND_ATTENDANCE_API_URL}/deduction`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const updateEmployeeAttendance = async (data) => {
  try {
    const response = await axios.put(`${TIME_AND_ATTENDANCE_API_URL}/attendance`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const deleteEmployeeAttendance = async (data) => {
  try {
    const response = await axios.delete(`${TIME_AND_ATTENDANCE_API_URL}/attendance`, {
      headers: { "Content-Type": "application/json" },
      params: {
        id: data.documentId,
        attendanceId: data._id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEmployeeOvertime = async (data) => {
  try {
    const response = await axios.put(`${TIME_AND_ATTENDANCE_API_URL}/overtime`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const deleteEmployeeOvertime = async (data) => {
  try {
    const response = await axios.delete(`${TIME_AND_ATTENDANCE_API_URL}/overtime`, {
      headers: { "Content-Type": "application/json" },
      params: {
        id: data.documentId,
        overtimeId: data._id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEmployeeTimeOff = async (data) => {
  try {
    const response = await axios.put(`${TIME_AND_ATTENDANCE_API_URL}/timeoff`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const deleteEmployeeTimeOff = async (data) => {
  try {
    const response = await axios.delete(`${TIME_AND_ATTENDANCE_API_URL}/timeoff`, {
      headers: { "Content-Type": "application/json" },
      params: {
        id: data.documentId,
        timeOffId: data._id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEmployeeEarnings = async (data) => {
  try {
    const response = await axios.put(`${TIME_AND_ATTENDANCE_API_URL}/additional-earnings`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const deleteEmployeeEarnings = async (data) => {
  try {
    const response = await axios.delete(`${TIME_AND_ATTENDANCE_API_URL}/additional-earnings`, {
      headers: { "Content-Type": "application/json" },
      params: {
        id: data.documentId,
        additionalEarningsId: data._id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEmployeeDeduction = async (data) => {
  try {
    const response = await axios.put(`${TIME_AND_ATTENDANCE_API_URL}/deduction`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error) {
    throw (error);
  }
};

const deleteEmployeeDeduction = async (data) => {
  try {
    const response = await axios.delete(`${TIME_AND_ATTENDANCE_API_URL}/deduction`, {
      headers: { "Content-Type": "application/json" },
      params: {
        id: data.documentId,
        deductionId: data._id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchAttendanceByPeriod, uploadTimeRecord, addEmployeeOvertime, addEmployeeTimeOff, addEmployeeEarnings, addEmployeeDeduction, updateEmployeeAttendance, deleteEmployeeAttendance, updateEmployeeOvertime, deleteEmployeeOvertime, updateEmployeeTimeOff, deleteEmployeeTimeOff, updateEmployeeEarnings, deleteEmployeeEarnings, updateEmployeeDeduction, deleteEmployeeDeduction };
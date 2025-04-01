import { useState } from "react";
import { uploadTimeRecord } from "../services/TimeAndAttendanceAPI";

const useUploadTimeRecord = () => {
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const upload = async ({ startDate, endDate, file }) => {
    setUploadStatus({ loading: true, error: null, success: false });
    try {
      await uploadTimeRecord({ startDate, endDate, file });
      setUploadStatus({ loading: false, error: null, success: true });
    } catch (error) {
      setUploadStatus({
        loading: false,
        error: error.response?.data?.message || error.message,
        success: false,
      });
    }
  };

  return { upload, uploadStatus };
};

export default useUploadTimeRecord;

import { useParams } from "react-router-dom";
import useGetPayRunById from "../hooks/useGetPayRunById";
import PayRunComponent from "../components/PayRunComponent";

const PayRun = () => {
    const { id  } = useParams();
  const { payrun, error } = useGetPayRunById(id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!payrun) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <PayRunComponent payrun={payrun} />
    </div>
  );
}

export default PayRun;
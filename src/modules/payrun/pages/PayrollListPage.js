import PayrollTable from "../components/PayrollTable";
import useGetAllPayRun from "../hooks/useGetAllPayRun";

const PayrollListPage = () => {
    const { payRun, uniquePayPeriod, error, fetchPayRun} = useGetAllPayRun

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <PayrollTable payRun={payRun} uniquePayPeriod={uniquePayPeriod} error={error} fetchPayRun={fetchPayRun}/>
        </>
    )
}

export default PayrollListPage;
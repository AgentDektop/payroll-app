import EmployeeList from "../components/EmployeeListComponent";
import useAllEmployeeData from "../hooks/useAllEmployeeData";

const EmployeeListPage = () => {

    const { employees, uniqueStatus, uniqueRole, uniqueBranch, error, fetchData } = useAllEmployeeData();

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <EmployeeList employees={employees} uniqueStatus={uniqueStatus} uniqueBranch={uniqueBranch} uniqueRole={uniqueRole} fetchData={fetchData}/>
        </>

    )
}

export default EmployeeListPage;
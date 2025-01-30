import EmployeeList from "../components/EmployeeListComponent";
import useAllEmployeeData from "../hooks/useAllEmployeeData";

const EmployeeListPage = () => {

    const { employees, uniqueStatus, uniqueRole, uniqueBranch, error } = useAllEmployeeData();

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <EmployeeList employees={employees} uniqueStatus={uniqueStatus} uniqueBranch={uniqueBranch} uniqueRole={uniqueRole} />
        </>

    )
}

export default EmployeeListPage;
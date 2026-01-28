    import AdminNavbar from "./AdminNavbar";

    export default function Dashboard() {
    const handlclick = () => {
        const userId = localStorage.getItem("userId");
        console.log("User ID:", userId);
    };

    return (
        <div>
            <AdminNavbar/>
        <button onClick={handlclick}>dashboard</button>
        </div>
    );
    }

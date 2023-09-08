import DashboardCard from "@/module/DashboardCard";
import styles from "@/template/MyProfilePage.module.css";

function MyProfilesPage({ profiles }) {
  return (
    <div>
      {profiles.length ? (
        profiles.map((i) => <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />)
      ) : (
        <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
      )}
    </div>
  );
}

export default MyProfilesPage;

import styles from '../styles/Home.module.css';
import components from '../components';
import Link from 'next/link';

const Home = () => {
  return (
    <div className={styles.container}>
      <components.CompanyList />
      <Link href="/company/new">
        <button>Create a new company</button>
      </Link>
    </div>
  );
};

export default Home;

// src/components/dashboard/CompleteProfileBanner/index.jsx
import PropTypes from 'prop-types';
import styles from './CompleteProfileBanner.module.css';
import { BiErrorCircle } from 'react-icons/bi';

const CompleteProfileBanner = ({ onOpenModal }) => {
  return (
    <div className={styles.banner}>
      <BiErrorCircle />
      <div className={styles.bannerText}>
        <strong>Seu cadastro está incompleto.</strong>
        <span>Para liberar todas as funcionalidades da plataforma, por favor, complete seu perfil.</span>
      </div>
      <button onClick={onOpenModal} className={styles.bannerButton}>
        Completar Cadastro
      </button>
    </div>
  );
};

CompleteProfileBanner.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default CompleteProfileBanner;
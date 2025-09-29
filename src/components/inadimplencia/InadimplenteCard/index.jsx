// src/components/inadimplencia/InadimplenteCard/index.jsx
import PropTypes from 'prop-types';
import styles from './InadimplenteCard.module.css';
import { BiErrorCircle } from 'react-icons/bi';

const InadimplenteCard = ({ inadimplente }) => {
  const { nome, fotoUrl, valorDevido, diasAtraso, contratoId } = inadimplente;

  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={fotoUrl} alt={`Foto de ${nome}`} className={styles.foto} />
        <div className={styles.info}>
          <h3 className={styles.nome}>{nome}</h3>
          <span className={styles.contrato}>Contrato #{contratoId}</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.valor}>
          <span>Valor Devido</span>
          <strong>{formatCurrency(valorDevido)}</strong>
        </div>
        <div className={styles.atraso}>
          <BiErrorCircle />
          <span>{diasAtraso} dias em atraso</span>
        </div>
      </div>
    </div>
  );
};

InadimplenteCard.propTypes = {
  inadimplente: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    fotoUrl: PropTypes.string.isRequired,
    valorDevido: PropTypes.number.isRequired,
    diasAtraso: PropTypes.number.isRequired,
    contratoId: PropTypes.number.isRequired,
  }).isRequired,
};

export default InadimplenteCard;